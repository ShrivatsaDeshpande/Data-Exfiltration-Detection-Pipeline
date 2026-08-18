from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent
IS_SERVERLESS = bool(os.getenv("VERCEL") or os.getenv("AWS_LAMBDA_FUNCTION_NAME"))

if IS_SERVERLESS:
    DATA_DIR = Path("/tmp/data")
    LOGS_DIR = Path("/tmp/logs")
else:
    DATA_DIR = BASE_DIR / "data"
    LOGS_DIR = BASE_DIR / "logs"

RAW_DIR = DATA_DIR / "raw"
PROCESSED_DIR = DATA_DIR / "processed"
GENERATED_DIR = DATA_DIR / "generated"
DB_PATH = PROCESSED_DIR / "exfiltration_lab.db"

try:
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)
    GENERATED_DIR.mkdir(parents=True, exist_ok=True)
    LOGS_DIR.mkdir(parents=True, exist_ok=True)
except Exception:
    pass

SECURE_MODE = os.getenv("SECURE_MODE", "false").lower() == "true"