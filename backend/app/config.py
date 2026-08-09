import os
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parents[1]
load_dotenv(BASE_DIR / '.env')


def get_origins():
    return [origin.strip() for origin in os.getenv('FRONTEND_ORIGIN', 'http://localhost:5173').split(',') if origin.strip()]


class Config:
    DEBUG = os.getenv('FLASK_DEBUG', 'false').lower() == 'true'
    HOST = os.getenv('HOST', '127.0.0.1')
    PORT = int(os.getenv('PORT', '5000'))
    CORS_ORIGINS = get_origins()
    MAX_CONTENT_LENGTH = 16 * 1024
    JSON_SORT_KEYS = False
    MODEL_PATH = BASE_DIR / os.getenv('MODEL_PATH', 'artifacts/house_price_model.joblib')
