import requests


def run(base_url: str = "http://127.0.0.1:8000", attacker_user_id: int = 77):
    success = 0
    denied = 0

    for record_id in range(1, 16):
        response = requests.get(
            f"{base_url}/records/{record_id}",
            headers={"X-User-Id": str(attacker_user_id), "User-Agent": "bola-script"},
            timeout=10,
        )
        if response.status_code == 200:
            success += 1
        elif response.status_code == 403:
            denied += 1

    print({"successful_reads": success, "denied_reads": denied})
    print("If secure mode is OFF, successful_reads should be high.")
    print("If secure mode is ON, denied_reads should increase.")
    

if __name__ == "__main__":
    run()