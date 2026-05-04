from fastapi.testclient import TestClient
from api.app import app

client = TestClient(app)


def test_export_endpoint_exists():
    response = client.get("/exports/csv?limit=5", headers={"X-User-Id": "1"})
    assert response.status_code == 200
    body = response.json()
    assert "exported_rows" in body
    assert "data" in body