from fastapi import APIRouter, Depends, HTTPException, Query, Request
from sqlalchemy.orm import Session

from api.config import SECURE_MODE
from api.db import get_db
from api.models import CustomerRecord
from api.schemas import CustomerRecordResponse
from api.security import get_current_user_id
from utils.logger import log_access_event

router = APIRouter(prefix="/records", tags=["records"])


@router.get("/", response_model=list[CustomerRecordResponse])
def list_records(
    request: Request,
    limit: int = Query(default=10, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user_id: int = Depends(get_current_user_id),
):
    records = db.query(CustomerRecord).limit(limit).all()

    log_access_event(
        event_type="list_records",
        actor_user_id=current_user_id,
        target_record_id=None,
        rows_returned=len(records),
        status="success",
        reason="",
        ip_address=request.client.host if request.client else "127.0.0.1",
        user_agent=request.headers.get("user-agent", "unknown"),
    )
    return records


@router.get("/{record_id}", response_model=CustomerRecordResponse)
def get_record(
    record_id: int,
    request: Request,
    db: Session = Depends(get_db),
    current_user_id: int = Depends(get_current_user_id),
):
    record = db.query(CustomerRecord).filter(CustomerRecord.id == record_id).first()

    if not record:
        log_access_event(
            event_type="get_record",
            actor_user_id=current_user_id,
            target_record_id=record_id,
            rows_returned=0,
            status="not_found",
            reason="record_missing",
            ip_address=request.client.host if request.client else "127.0.0.1",
            user_agent=request.headers.get("user-agent", "unknown"),
        )
        raise HTTPException(status_code=404, detail="Record not found")

    if SECURE_MODE and record.owner_user_id != current_user_id:
        log_access_event(
            event_type="get_record",
            actor_user_id=current_user_id,
            target_record_id=record_id,
            rows_returned=0,
            status="denied",
            reason="owner_mismatch",
            ip_address=request.client.host if request.client else "127.0.0.1",
            user_agent=request.headers.get("user-agent", "unknown"),
        )
        raise HTTPException(status_code=403, detail="Access denied")

    log_access_event(
        event_type="get_record",
        actor_user_id=current_user_id,
        target_record_id=record_id,
        rows_returned=1,
        status="success",
        reason="",
        ip_address=request.client.host if request.client else "127.0.0.1",
        user_agent=request.headers.get("user-agent", "unknown"),
    )
    return record