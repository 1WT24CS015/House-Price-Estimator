from dataclasses import dataclass
from typing import Any
from werkzeug.exceptions import BadRequest

ALLOWED_FIELDS = frozenset({'location', 'total_sqft', 'bath', 'bhk'})


@dataclass(frozen=True)
class PredictionInput:
    location: str
    total_sqft: float
    bath: int
    bhk: int


class PredictionInputSchema:
    @staticmethod
    def validate(payload: Any) -> PredictionInput:
        if not isinstance(payload, dict):
            raise BadRequest('Request body must be a JSON object.')

        extra_fields = set(payload) - ALLOWED_FIELDS
        missing_fields = ALLOWED_FIELDS - set(payload)
        if extra_fields:
            raise BadRequest(f'Unsupported fields: {", ".join(sorted(extra_fields))}.')
        if missing_fields:
            raise BadRequest(f'Missing required fields: {", ".join(sorted(missing_fields))}.')

        location = payload['location']
        if not isinstance(location, str):
            raise BadRequest('location must be a string.')
        location = ' '.join(location.split())
        if not 2 <= len(location) <= 100:
            raise BadRequest('location must contain between 2 and 100 characters.')

        total_sqft = PredictionInputSchema._number(payload['total_sqft'], 'total_sqft', 300, 50_000)
        bath = PredictionInputSchema._integer(payload['bath'], 'bath', 1, 20)
        bhk = PredictionInputSchema._integer(payload['bhk'], 'bhk', 1, 20)
        if total_sqft / bhk < 250:
            raise BadRequest('total_sqft must be at least 250 square feet per BHK.')
        if bath > bhk + 2:
            raise BadRequest('bath cannot exceed BHK by more than 2.')
        return PredictionInput(location=location, total_sqft=total_sqft, bath=bath, bhk=bhk)

    @staticmethod
    def _number(value: Any, field: str, minimum: float, maximum: float) -> float:
        if isinstance(value, bool):
            raise BadRequest(f'{field} must be a number.')
        try:
            numeric_value = float(value)
        except (TypeError, ValueError) as error:
            raise BadRequest(f'{field} must be a number.') from error
        if not minimum <= numeric_value <= maximum:
            raise BadRequest(f'{field} must be between {minimum:g} and {maximum:g}.')
        return numeric_value

    @staticmethod
    def _integer(value: Any, field: str, minimum: int, maximum: int) -> int:
        numeric_value = PredictionInputSchema._number(value, field, minimum, maximum)
        if not numeric_value.is_integer():
            raise BadRequest(f'{field} must be a whole number.')
        return int(numeric_value)
