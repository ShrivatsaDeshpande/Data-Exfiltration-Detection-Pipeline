import pandas as pd

from api.config import LOGS_DIR


def generate_summary():
    alerts_file = LOGS_DIR / "alerts.csv"
    access_file = LOGS_DIR / "access_logs.csv"
    export_file = LOGS_DIR / "exports.csv"

    alerts_df = pd.read_csv(alerts_file) if alerts_file.exists() and alerts_file.stat().st_size > 0 else pd.DataFrame()
    access_df = pd.read_csv(access_file) if access_file.exists() and access_file.stat().st_size > 0 else pd.DataFrame()
    export_df = pd.read_csv(export_file) if export_file.exists() and export_file.stat().st_size > 0 else pd.DataFrame()

    return {
        "total_alerts": int(len(alerts_df)),
        "alert_breakdown": alerts_df["rule_name"].value_counts().to_dict() if not alerts_df.empty else {},
        "total_access_events": int(len(access_df)),
        "total_exports": int(len(export_df)),
    }


if __name__ == "__main__":
    print(generate_summary())