import requests
import time


def run(base_url: str = "http://127.0.0.1:8000", attacker_user_id: int = 66):
    for i in range(5):
        response = requests.get(
            f"{base_url}/exports/csv?limit=80",
            headers={"X-User-Id": str(attacker_user_id), "User-Agent": "off-hours-script"},
            timeout=10,
        )
        print(f"Request {i+1}: status={response.status_code}, rows={response.json().get('exported_rows')}")
        time.sleep(0.2)


if __name__ == "__main__":
    run()