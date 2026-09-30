from flask import Blueprint, jsonify

health_blueprint = Blueprint('health', __name__)


@health_blueprint.get('/health')
def health_check():
    return jsonify({'success': True, 'data': {'status': 'healthy'}}), 200
