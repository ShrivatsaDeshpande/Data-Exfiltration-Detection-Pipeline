import requests


def simulate_normal_activity(base_url: str = "http://127.0.0.1:8000"):
    for user_id in [1, 2, 3]:
        requests.get(
            f"{base_url}/records?limit=5",
            headers={"X-User-Id": str(user_id)},
            timeout=10,
        )