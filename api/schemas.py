from datetime import datetime
from pydantic import BaseModel, ConfigDict


class CustomerRecordResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    owner_user_id: int
    customer_name: str
    customer_email: str
    department: str
    country: str
    account_type: str
    balance: float
    risk_score: float
    last_access_hour: int
    created_at: datetime


class HealthResponse(BaseModel):
    status: str
    message: str