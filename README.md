# EstateIQ AI — House Price Estimator Using Machine Learning

Phases 1–3 contain the React 19 frontend, a production-ready responsive home experience, a Flask prediction API, and a reproducible scikit-learn training pipeline using the Bengaluru House Price Dataset. The model accepts Bengaluru locality, built-up area, bathrooms, and BHK, then returns a price estimate in INR.

## Frontend development

1. Copy `.env.example` to `.env`.
2. Install dependencies with `npm install`.
3. Run `npm run dev`.
4. Validate with `npm run lint` and `npm run build`.

## Flask API and model training

1. In a second terminal, change to `backend`, create a virtual environment, and install `requirements.txt`.
2. Download the Bengaluru House Price Dataset with `python scripts/download_dataset.py`.
3. Train the model with `python ml/train_model.py`.
4. Start the API with `python run.py`.

The API is available at `POST http://127.0.0.1:5000/api/v1/predict`. It only accepts JSON with `location`, `total_sqft`, `bath`, and `bhk`. The backend validates both request format and meaningful property limits before running inference.

### VS Code terminal commands (PowerShell)

```powershell
# Terminal 1 — from the project root
Copy-Item .env.example .env
npm install
npm run dev

# Terminal 2 — from the project root
Copy-Item backend/.env.example backend/.env
py -m venv backend/.venv
backend/.venv/Scripts/Activate.ps1
Set-Location backend
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
python scripts/download_dataset.py
python ml/train_model.py
python -m pytest tests
python run.py
```

Once the API starts, open `http://localhost:5173` and use the estimator in the home page. The included `.vscode/launch.json` also provides a **Run Flask API** debug configuration after the virtual environment and model artifact have been created.

## Architecture reserved for later phases

```text
backend/
  app/
    controllers/ models/ services/ repositories/ schemas/ middleware/ utils/
  config/ tests/ migrations/
data/
docs/
infrastructure/
src/
  api/ components/{common,layout}/ config/ context/ routes/ styles/
```
