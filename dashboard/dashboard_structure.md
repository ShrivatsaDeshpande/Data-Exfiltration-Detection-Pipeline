# Dashboard Structure

## Overview
The dashboard should present model quality, alert activity, and suspicious transfer behavior in one view.

## Suggested sections

### KPI row
- Total events processed.
- Total alerts triggered.
- Confirmed exfiltration cases.
- Precision.
- Recall.
- F1-score.

### Detection quality
- Confusion matrix.
- Precision/Recall/F1 chart.
- Vulnerable vs secure comparison.

### Alert trends
- Open alerts over time.
- Alerts by rule.
- Average alert age.
- Reopened alerts.

### Exfiltration behavior
- Exports by user.
- Transfers by destination.
- Destination port distribution.
- Volume spikes by time window.

### Investigation panel
- Top suspicious users.
- Top suspicious sessions.
- Triggered rules with severity.
- Short incident timeline.