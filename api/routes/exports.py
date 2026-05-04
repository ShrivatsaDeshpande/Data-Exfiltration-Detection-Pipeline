from fastapi import APIRouter, Depends, Query, Request
from sqlalchemy.orm import Session

from api.db import get_db
from api.models import CustomerRecord
from api.security import get_current_user_id
from utils.logger import log_access_event, log_export_event

router = APIRouter(prefix="/exports", tags=["exports"])


@router.get("/csv")
def export_records(
    request: Request,
    limit: int = Query(default=20, ge=1, le=1000),
    current_user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    records = db.query(CustomerRecord).limit(limit).all()
    payload = [
        {
            "id": r.id,
            "owner_user_id": r.owner_user_id,
            "customer_name": r.customer_name,
            "customer_email": r.customer_email,
            "department": r.department,
            "country": r.country,
            "account_type": r.account_type,
            "balance": r.balance,
            "risk_score": r.risk_score,
            "last_access_hour": r.last_access_hour,
        }
        for r in records
    ]

    log_access_event(
        event_type="export_records",
        actor_user_id=current_user_id,
        target_record_id=None,
        rows_returned=len(payload),
        status="success",
        reason="",
        ip_address=request.client.host if request.client else "127.0.0.1",
        user_agent=request.headers.get("user-agent", "unknown"),
    )
    log_export_event(
        actor_user_id=current_user_id,
        rows_exported=len(payload),
        export_target="csv_endpoint",
    )

    return {"exported_rows": len(payload), "data": payload}