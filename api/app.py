from fastapi import FastAPI

from api.db import Base, engine
from api.routes import exports, health, records

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Data Exfiltration Detection API",
    version="0.1.0",
    description="A local lab for simulating, detecting, and mitigating suspicious data movement."
)

from fastapi.staticfiles import StaticFiles
from api.config import LOGS_DIR, BASE_DIR

app.include_router(health.router)
app.include_router(records.router)
app.include_router(exports.router)

# Serve the static web dashboard
app.mount("/dashboard", StaticFiles(directory=BASE_DIR / "dashboard" / "public", html=True), name="dashboard")

# Serve the logs for the dashboard to fetch
app.mount("/logs", StaticFiles(directory=LOGS_DIR), name="logs")


@app.get("/")
def root():
    return {
        "project": "Data Exfiltration Detection in a Simple Data Pipeline",
        "status": "running"
    }