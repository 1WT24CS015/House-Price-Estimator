import pytest
from werkzeug.exceptions import BadRequest
from app.schemas.prediction_schema import PredictionInputSchema


def test_valid_prediction_input_is_normalized():
    result = PredictionInputSchema.validate({'location': '  Whitefield ', 'total_sqft': 1200, 'bath': 2, 'bhk': 2})
    assert result.location == 'Whitefield'
    assert result.total_sqft == 1200


@pytest.mark.parametrize('payload', [
    {'location': 'Whitefield', 'total_sqft': 300, 'bath': 6, 'bhk': 2},
    {'location': 'Whitefield', 'total_sqft': 200, 'bath': 1, 'bhk': 1},
    {'location': 'Whitefield', 'total_sqft': 1000, 'bath': 2.5, 'bhk': 2},
])
def test_invalid_prediction_input_is_rejected(payload):
    with pytest.raises(BadRequest):
        PredictionInputSchema.validate(payload)
