from fastapi import FastAPI

from api.db import Base, engine
from api.routes import exports, health, records

try:
    Base.metadata.create_all(bind=engine)
except Exception:
    pass

app = FastAPI(
    title="Data Exfiltration Detection API",
    version="0.1.0",
    description="A local lab for simulating, detecting, and mitigating suspicious data movement."
)

from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from api.config import LOGS_DIR, BASE_DIR

app.include_router(health.router)
app.include_router(records.router)
app.include_router(exports.router)

dashboard_dir = BASE_DIR / "dashboard" / "public"
repo_logs_dir = BASE_DIR / "logs"

# Serve the static web dashboard
if dashboard_dir.exists():
    app.mount("/dashboard", StaticFiles(directory=dashboard_dir, html=True), name="dashboard")


@app.get("/logs/{filename}")
def get_log_file(filename: str):
    # Try dynamic runtime logs dir first
    if (LOGS_DIR / filename).exists():
        return FileResponse(LOGS_DIR / filename, media_type="text/csv")
    # Fallback to repo static logs dir
    if (repo_logs_dir / filename).exists():
        return FileResponse(repo_logs_dir / filename, media_type="text/csv")
    return HTMLResponse(status_code=404)


from fastapi import Request

@app.get("/")
def root(request: Request):
    accept = request.headers.get("accept", "")
    if "text/html" in accept:
        index_path = dashboard_dir / "index.html"
        if index_path.exists():
            return FileResponse(index_path, media_type="text/html")
    return {
        "project": "Data Exfiltration Detection in a Simple Data Pipeline",
        "status": "running"
    }


@app.get("/style.css")
def get_style():
    style_path = dashboard_dir / "style.css"
    if style_path.exists():
        return FileResponse(style_path, media_type="text/css")
    return HTMLResponse(status_code=404)


@app.get("/app.js")
def get_app_js():
    js_path = dashboard_dir / "app.js"
    if js_path.exists():
        return FileResponse(js_path, media_type="application/javascript")
    return HTMLResponse(status_code=404)


@app.get("/logo.png")
def get_logo():
    logo_path = dashboard_dir / "logo.png"
    if logo_path.exists():
        return FileResponse(logo_path, media_type="image/png")
    return HTMLResponse(status_code=404)