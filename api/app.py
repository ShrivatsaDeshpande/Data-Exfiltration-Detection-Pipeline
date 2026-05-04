from fastapi import FastAPI

from api.db import Base, engine
from api.routes import exports, health, records

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Data Exfiltration Detection API",
    version="0.1.0",
    description="A local lab for simulating, detecting, and mitigating suspicious data movement."
)

app.include_router(health.router)
app.include_router(records.router)
app.include_router(exports.router)


@app.get("/")
def root():
    return {
        "project": "Data Exfiltration Detection in a Simple Data Pipeline",
        "status": "running"
    }