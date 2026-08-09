from pathlib import Path
from threading import Lock
import joblib
import pandas as pd
from ..schemas.prediction_schema import PredictionInput


class ModelService:
    def __init__(self):
        self._artifact = None
        self._model_path = None
        self._lock = Lock()

    def _load(self, model_path: Path):
        if self._artifact is not None and self._model_path == model_path:
            return self._artifact
        with self._lock:
            if self._artifact is None or self._model_path != model_path:
                if not model_path.is_file():
                    raise FileNotFoundError(model_path)
                self._artifact = joblib.load(model_path)
                self._model_path = model_path
        return self._artifact

    def predict(self, prediction_input: PredictionInput, model_path: Path) -> dict:
        artifact = self._load(model_path)
        model = artifact['model']
        print("MODEL METADATA:", artifact['metadata'])
        features = pd.DataFrame([{
            'POSTED_BY': 'Owner',
            'UNDER_CONSTRUCTION': 0,
            'RERA': 0,
            'BHK_OR_RK': 'BHK',
            'READY_TO_MOVE': 1,
            'RESALE': 1,
            'ADDRESS': prediction_input.location,
            'BHK_NO.': prediction_input.bhk,
            'SQUARE_FT': prediction_input.total_sqft,
            'LONGITUDE': float('nan'),
            'LATITUDE': float('nan'),
        }])
        price_lakh = max(float(model.predict(features)[0]), 0.0)
        price_rupees = round(price_lakh * 100_000)
        return {
            'price_lakh': round(price_lakh, 2),
            'price_rupees': price_rupees,
            'formatted_price': format_indian_currency(price_rupees),
            'currency': 'INR',
            'model_version': artifact['metadata']['model_version'],
        }


def format_indian_currency(amount: int) -> str:
    amount_string = str(abs(amount))
    if len(amount_string) <= 3:
        grouped = amount_string
    else:
        grouped = amount_string[-3:]
        remaining = amount_string[:-3]
        pairs = []
        while remaining:
            pairs.append(remaining[-2:])
            remaining = remaining[:-2]
        grouped = ','.join(reversed(pairs)) + ',' + grouped
    return f'₹{"-" if amount < 0 else ""}{grouped}'


model_service = ModelService()
