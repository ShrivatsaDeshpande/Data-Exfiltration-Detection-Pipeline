import pandas as pd


def high_volume_export_rule(exports_df: pd.DataFrame, threshold: int = 100) -> pd.DataFrame:
    if exports_df.empty:
        return pd.DataFrame()
    return exports_df[exports_df["rows_exported"] > threshold].copy()


def repeated_export_rule(exports_df: pd.DataFrame, repeat_threshold: int = 3) -> pd.DataFrame:
    if exports_df.empty:
        return pd.DataFrame()

    counts = exports_df.groupby("actor_user_id").size().reset_index(name="export_count")
    suspicious_users = counts[counts["export_count"] >= repeat_threshold]["actor_user_id"].tolist()
    return exports_df[exports_df["actor_user_id"].isin(suspicious_users)].copy()


def denied_access_rule(access_df: pd.DataFrame) -> pd.DataFrame:
    if access_df.empty:
        return pd.DataFrame()
    return access_df[access_df["status"] == "denied"].copy()