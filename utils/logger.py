import csv
from pathlib import Path

from api.config import LOGS_DIR
from utils.time_utils import utc_now_iso

ACCESS_LOG = LOGS_DIR / "access_logs.csv"
EXPORT_LOG = LOGS_DIR / "exports.csv"
ALERT_LOG = LOGS_DIR / "alerts.csv"


def _ensure_file(path: Path, headers: list[str]):
    if not path.exists() or path.stat().st_size == 0:
        with open(path, "w", newline="") as f:
            writer = csv.writer(f)
            writer.writerow(headers)


def reset_log_files():
    for path, headers in [
        (ACCESS_LOG, ["timestamp", "event_type", "actor_user_id", "target_record_id", "rows_returned", "status", "reason", "ip_address", "user_agent"]),
        (EXPORT_LOG, ["timestamp", "actor_user_id", "rows_exported", "export_target"]),
        (ALERT_LOG, ["timestamp", "rule_name", "severity", "actor_user_id", "details"]),
    ]:
        with open(path, "w", newline="") as f:
            writer = csv.writer(f)
            writer.writerow(headers)


def log_access_event(event_type: str, actor_user_id: int, target_record_id: int | None,
                     rows_returned: int, status: str, reason: str, ip_address: str, user_agent: str):
    _ensure_file(
        ACCESS_LOG,
        ["timestamp", "event_type", "actor_user_id", "target_record_id", "rows_returned", "status", "reason", "ip_address", "user_agent"]
    )
    with open(ACCESS_LOG, "a", newline="") as f:
        writer = csv.writer(f)
        writer.writerow([
            utc_now_iso(),
            event_type,
            actor_user_id,
            target_record_id,
            rows_returned,
            status,
            reason,
            ip_address,
            user_agent
        ])


def log_export_event(actor_user_id: int, rows_exported: int, export_target: str):
    _ensure_file(
        EXPORT_LOG,
        ["timestamp", "actor_user_id", "rows_exported", "export_target"]
    )
    with open(EXPORT_LOG, "a", newline="") as f:
        writer = csv.writer(f)
        writer.writerow([
            utc_now_iso(),
            actor_user_id,
            rows_exported,
            export_target
        ])


def log_alert(rule_name: str, severity: str, actor_user_id: int, details: str):
    _ensure_file(
        ALERT_LOG,
        ["timestamp", "rule_name", "severity", "actor_user_id", "details"]
    )
    with open(ALERT_LOG, "a", newline="") as f:
        writer = csv.writer(f)
        writer.writerow([
            utc_now_iso(),
            rule_name,
            severity,
            actor_user_id,
            details
        ])