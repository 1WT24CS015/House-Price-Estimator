import argparse
import json
import sys
from datetime import datetime, timezone
from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestRegressor
from sklearn.impute import SimpleImputer
from sklearn.metrics import mean_absolute_error, r2_score
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder

BACKEND_DIR = Path(__file__).resolve().parents[1]
PROJECT_DIR = BACKEND_DIR.parent
DEFAULT_DATASET = PROJECT_DIR / 'data' / 'train.csv'
DEFAULT_ARTIFACT = BACKEND_DIR / 'artifacts' / 'house_price_model.joblib'
TARGET_COLUMN = 'TARGET(PRICE_IN_LACS)'
CATEGORICAL_COLUMNS = [
    'POSTED_BY',
    'UNDER_CONSTRUCTION',
    'RERA',
    'BHK_OR_RK',
    'READY_TO_MOVE',
    'RESALE',
    'ADDRESS',
]
NUMERIC_COLUMNS = [
    'BHK_NO.',
    'SQUARE_FT',
    'LONGITUDE',
    'LATITUDE',
]
FEATURE_COLUMNS = CATEGORICAL_COLUMNS + NUMERIC_COLUMNS


def prepare_dataset(dataset_path: Path) -> pd.DataFrame:
    dataframe = pd.read_csv(dataset_path)
    required_columns = set(FEATURE_COLUMNS + [TARGET_COLUMN])
    missing_columns = required_columns - set(dataframe.columns)
    if missing_columns:
        raise ValueError(f'Dataset is missing columns: {", ".join(sorted(missing_columns))}')

    dataframe = dataframe[FEATURE_COLUMNS + [TARGET_COLUMN]].copy()
    dataframe[TARGET_COLUMN] = pd.to_numeric(dataframe[TARGET_COLUMN], errors='coerce')
    for column in NUMERIC_COLUMNS:
        dataframe[column] = pd.to_numeric(dataframe[column], errors='coerce')

    dataframe = dataframe.replace([np.inf, -np.inf], np.nan)
    dataframe = dataframe.dropna(subset=[TARGET_COLUMN])
    dataframe = dataframe[dataframe[TARGET_COLUMN] > 0]
    if dataframe.empty:
        raise ValueError('No valid training rows remain after cleaning the target column.')
    return dataframe


def build_model() -> Pipeline:
    categorical_pipeline = Pipeline([
        ('imputer', SimpleImputer(strategy='most_frequent')),
        ('encoder', OneHotEncoder(handle_unknown='ignore')),
    ])
    numeric_pipeline = Pipeline([
        ('imputer', SimpleImputer(strategy='median')),
    ])
    preprocessor = ColumnTransformer([
        ('categorical', categorical_pipeline, CATEGORICAL_COLUMNS),
        ('numeric', numeric_pipeline, NUMERIC_COLUMNS),
    ])
    return Pipeline([
        ('preprocessor', preprocessor),
        ('regressor', RandomForestRegressor(
            n_estimators=400,
            min_samples_leaf=2,
            random_state=42,
            n_jobs=-1,
        )),
    ])


def train(dataset_path: Path, artifact_path: Path) -> None:
    dataframe = prepare_dataset(dataset_path)
    features = dataframe[FEATURE_COLUMNS]
    target = dataframe[TARGET_COLUMN]
    x_train, x_test, y_train, y_test = train_test_split(
        features,
        target,
        test_size=0.2,
        random_state=42,
    )
    model = build_model()
    model.fit(x_train, y_train)
    predictions = model.predict(x_test)
    metadata = {
        'model_version': datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ'),
        'dataset_rows': int(len(dataframe)),
        'feature_columns': FEATURE_COLUMNS,
        'target_column': TARGET_COLUMN,
        'metrics': {
            'mae_lakh': round(float(mean_absolute_error(y_test, predictions)), 3),
            'r2_score': round(float(r2_score(y_test, predictions)), 3),
        },
        'trained_at': datetime.now(timezone.utc).isoformat(),
    }
    artifact_path.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump({'model': model, 'metadata': metadata}, artifact_path)
    print(json.dumps(metadata, indent=2))


def main() -> int:
    parser = argparse.ArgumentParser(description='Train the house price prediction model using train.csv.')
    parser.add_argument('--dataset', type=Path, default=DEFAULT_DATASET)
    parser.add_argument('--output', type=Path, default=DEFAULT_ARTIFACT)
    args = parser.parse_args()
    if not args.dataset.is_file():
        print(f'Dataset not found: {args.dataset}', file=sys.stderr)
        return 1
    train(args.dataset, args.output)
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
