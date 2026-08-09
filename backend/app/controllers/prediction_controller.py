from flask import Blueprint, current_app, jsonify, request
from werkzeug.exceptions import BadRequest, ServiceUnavailable
from ..schemas.prediction_schema import PredictionInputSchema
from ..services.model_service import model_service

prediction_blueprint = Blueprint('predictions', __name__)


@prediction_blueprint.post('/predict')
def predict_price():
    if not request.is_json:
        raise BadRequest('Content-Type must be application/json.')

    payload = request.get_json(silent=True)
    if payload is None:
        raise BadRequest('Request body must contain valid JSON.')

    prediction_input = PredictionInputSchema.validate(payload)
    try:
        prediction = model_service.predict(prediction_input, current_app.config['MODEL_PATH'])
    except FileNotFoundError as error:
        current_app.logger.error('Model artifact is unavailable: %s', error)
        raise ServiceUnavailable('Prediction service is not ready. Train the model before requesting predictions.') from error

    return jsonify({'success': True, 'data': prediction}), 200
