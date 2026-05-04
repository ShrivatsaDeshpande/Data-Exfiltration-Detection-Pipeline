from datetime import datetime

from sqlalchemy import Column, DateTime, Float, Integer, String

from api.db import Base


class CustomerRecord(Base):
    __tablename__ = "customer_records"

    id = Column(Integer, primary_key=True, index=True)
    owner_user_id = Column(Integer, index=True, nullable=False)
    customer_name = Column(String, nullable=False)
    customer_email = Column(String, nullable=False)
    department = Column(String, nullable=False)
    country = Column(String, nullable=False)
    account_type = Column(String, nullable=False)
    balance = Column(Float, nullable=False)
    risk_score = Column(Float, nullable=False)
    last_access_hour = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class AccessEvent(Base):
    __tablename__ = "access_events"

    id = Column(Integer, primary_key=True, index=True)
    event_type = Column(String, index=True, nullable=False)
    actor_user_id = Column(Integer, index=True, nullable=False)
    target_record_id = Column(Integer, nullable=True)
    rows_returned = Column(Integer, default=0)
    status = Column(String, default="success")
    reason = Column(String, default="")
    ip_address = Column(String, default="127.0.0.1")
    user_agent = Column(String, default="local-script")
    event_time = Column(DateTime, default=datetime.utcnow)