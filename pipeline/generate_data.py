import random
from pathlib import Path

import pandas as pd
from faker import Faker

from api.config import GENERATED_DIR

fake = Faker()

DEPARTMENTS = ["Finance", "HR", "Operations", "Research", "Sales"]
COUNTRIES = ["UK", "USA", "Germany", "India", "China"]
ACCOUNT_TYPES = ["Retail", "Business", "Premium", "Internal"]


def generate_customer_data(rows: int = 250) -> pd.DataFrame:
    records = []
    for _ in range(rows):
        records.append(
            {
                "owner_user_id": random.randint(1, 8),
                "customer_name": fake.name(),
                "customer_email": fake.email(),
                "department": random.choice(DEPARTMENTS),
                "country": random.choice(COUNTRIES),
                "account_type": random.choice(ACCOUNT_TYPES),
                "balance": round(random.uniform(500, 50000), 2),
                "risk_score": round(random.uniform(0.1, 0.95), 2),
                "last_access_hour": random.randint(8, 18),
            }
        )
    return pd.DataFrame(records)


def save_generated_data(rows: int = 250) -> Path:
    GENERATED_DIR.mkdir(parents=True, exist_ok=True)
    file_path = GENERATED_DIR / "customer_records.csv"
    generate_customer_data(rows=rows).to_csv(file_path, index=False)
    return file_path