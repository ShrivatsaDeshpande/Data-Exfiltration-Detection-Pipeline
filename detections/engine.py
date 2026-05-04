import pandas as pd

from api.config import LOGS_DIR
from detections.rules import denied_access_rule, high_volume_export_rule, repeated_export_rule
from utils.logger import log_alert


def run_detection():
    export_log = LOGS_DIR / "exports.csv"
    access_log = LOGS_DIR / "access_logs.csv"

    exports_df = pd.read_csv(export_log) if export_log.exists() and export_log.stat().st_size > 0 else pd.DataFrame()
    access_df = pd.read_csv(access_log) if access_log.exists() and access_log.stat().st_size > 0 else pd.DataFrame()

    high_volume = high_volume_export_rule(exports_df, threshold=100) if not exports_df.empty else pd.DataFrame()
    repeated = repeated_export_rule(exports_df, repeat_threshold=3) if not exports_df.empty else pd.DataFrame()
    denied = denied_access_rule(access_df) if not access_df.empty else pd.DataFrame()

    for _, row in high_volume.iterrows():
        log_alert(
            rule_name="high_volume_export",
            severity="high",
            actor_user_id=int(row["actor_user_id"]),
            details=f"Exported {row['rows_exported']} rows to {row['export_target']}",
        )

    repeated_users = repeated["actor_user_id"].unique().tolist() if not repeated.empty else []
    for user_id in repeated_users:
        log_alert(
            rule_name="repeated_export_activity",
            severity="medium",
            actor_user_id=int(user_id),
            details="Repeated export activity detected",
        )

    if not denied.empty:
        denied_users = denied["actor_user_id"].astype(int).unique().tolist()
        for user_id in denied_users:
            log_alert(
                rule_name="denied_record_access",
                severity="medium",
                actor_user_id=int(user_id),
                details="Unauthorized object access attempts detected",
            )

    print("Detection run complete.")
    print(f"High volume alerts: {len(high_volume)}")
    print(f"Repeated export users: {len(repeated_users)}")
    print(f"Denied access events: {len(denied)}")