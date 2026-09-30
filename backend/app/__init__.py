from flask import Flask, jsonify
from flask_cors import CORS
from werkzeug.exceptions import HTTPException
from .config import Config
from .controllers.health_controller import health_blueprint
from .controllers.prediction_controller import prediction_blueprint


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    CORS(
        app,
        resources={r'/api/*': {'origins': app.config['CORS_ORIGINS']}},
        methods=['GET', 'POST', 'OPTIONS'],
        allow_headers=['Content-Type'],
        max_age=600,
    )

    app.register_blueprint(health_blueprint, url_prefix='/api/v1')
    app.register_blueprint(prediction_blueprint, url_prefix='/api/v1')

    @app.errorhandler(HTTPException)
    def handle_http_exception(error):
        return jsonify({'success': False, 'message': error.description}), error.code

    @app.errorhandler(Exception)
    def handle_unexpected_exception(error):
        app.logger.exception('Unhandled application error: %s', error)
        return jsonify({'success': False, 'message': 'An unexpected server error occurred.'}), 500

    return app
