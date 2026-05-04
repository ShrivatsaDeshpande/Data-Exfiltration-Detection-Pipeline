import pandas as pd

from detections.rules import denied_access_rule, high_volume_export_rule, repeated_export_rule


def test_high_volume_export_rule():
    df = pd.DataFrame(
        [
            {"actor_user_id": 1, "rows_exported": 10, "export_target": "csv_endpoint"},
            {"actor_user_id": 2, "rows_exported": 160, "export_target": "csv_endpoint"},
        ]
    )
    result = high_volume_export_rule(df, threshold=100)
    assert len(result) == 1
    assert int(result.iloc[0]["actor_user_id"]) == 2


def test_repeated_export_rule():
    df = pd.DataFrame(
        [
            {"actor_user_id": 1, "rows_exported": 10, "export_target": "csv_endpoint"},
            {"actor_user_id": 1, "rows_exported": 20, "export_target": "csv_endpoint"},
            {"actor_user_id": 1, "rows_exported": 30, "export_target": "csv_endpoint"},
            {"actor_user_id": 2, "rows_exported": 40, "export_target": "csv_endpoint"},
        ]
    )
    result = repeated_export_rule(df, repeat_threshold=3)
    assert not result.empty
    assert set(result["actor_user_id"].tolist()) == {1}


def test_denied_access_rule():
    df = pd.DataFrame(
        [
            {"actor_user_id": 77, "status": "denied"},
            {"actor_user_id": 2, "status": "success"},
        ]
    )
    result = denied_access_rule(df)
    assert len(result) == 1
    assert int(result.iloc[0]["actor_user_id"]) == 77