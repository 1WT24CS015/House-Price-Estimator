from pathlib import Path
from urllib.request import Request, urlopen

DATASET_URL = 'https://raw.githubusercontent.com/satishgunjal/House-Price-Prediction-Project/master/Bengaluru_House_Data.csv'
OUTPUT_PATH = Path(__file__).resolve().parents[2] / 'data' / 'Bengaluru_House_Data.csv'


def main():
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    request = Request(DATASET_URL, headers={'User-Agent': 'EstateIQAI/1.0'})
    with urlopen(request, timeout=30) as response:
        payload = response.read()
    if len(payload) < 100_000 or not payload.startswith(b'area_type,'):
        raise RuntimeError('Downloaded file did not match the expected Bengaluru House Price Dataset format.')
    OUTPUT_PATH.write_bytes(payload)
    print(f'Dataset saved to {OUTPUT_PATH} ({len(payload):,} bytes).')


if __name__ == '__main__':
    main()
