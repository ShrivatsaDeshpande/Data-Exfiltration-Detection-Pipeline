import pandas as pd

from api.db import Base, SessionLocal, engine
from api.models import CustomerRecord
from pipeline.generate_data import save_generated_data
from utils.logger import reset_log_files


def seed_database(rows: int = 250):
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    reset_log_files()

    csv_path = save_generated_data(rows=rows)
    df = pd.read_csv(csv_path)

    db = SessionLocal()
    try:
        for _, row in df.iterrows():
            db.add(
                CustomerRecord(
                    owner_user_id=int(row["owner_user_id"]),
                    customer_name=str(row["customer_name"]),
                    customer_email=str(row["customer_email"]),
                    department=str(row["department"]),
                    country=str(row["country"]),
                    account_type=str(row["account_type"]),
                    balance=float(row["balance"]),
                    risk_score=float(row["risk_score"]),
                    last_access_hour=int(row["last_access_hour"]),
                )
            )

        db.commit()
    finally:
        db.close()