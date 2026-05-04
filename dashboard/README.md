# Security Analytics Dashboard

## Purpose

This dashboard is the analytics and visualization layer for the **Data Exfiltration Detection Pipeline** project.

Its goal is to transform raw security events, alerts, and export logs into a more understandable visual format so that suspicious activity can be interpreted quickly. The dashboard complements the backend cybersecurity lab by showing patterns in API access, export behavior, denied reads, and alert generation.

This makes the project stronger as a collaborative case study by combining:
- cybersecurity engineering,
- structured detection logic,
- and data-driven interpretation of security events.

## Dashboard Goals

The dashboard is intended to answer questions such as:

- How many exports were triggered during a run?
- How many reads were successful versus denied?
- Which rules generated the most alerts?
- Which user activity patterns appear suspicious?
- How does vulnerable mode compare to secure mode?
- Which attack scripts generate the highest detection volume?

## Planned Metrics

The dashboard should focus on a small set of clear and useful metrics.

### Core Metrics
- Total record reads
- Successful reads
- Denied reads
- Total export events
- Total alerts generated
- Alerts by rule
- Alerts by user
- Exports by user
- Reads by mode: vulnerable vs secure

### Comparative Metrics
- Vulnerable mode successful reads vs secure mode successful reads
- Vulnerable mode denied reads vs secure mode denied reads
- Bulk export alerts vs off-hours alerts
- Export activity over time
- Denied access events over time

### Optional Extended Metrics
- Suspicious events per run
- High-volume export frequency
- Repeated export frequency
- Ratio of successful to denied object requests
- Top users by alert count

## Suggested Dashboard Views

A simple multi-section dashboard could include:

### 1. Summary Cards
Show:
- total reads,
- total denied reads,
- total exports,
- total alerts.

This gives a fast overview of the current dataset or run.

### 2. Mode Comparison Panel
A visual comparison of:
- vulnerable mode outcomes,
- secure mode outcomes.

This section is useful because it tells the security story immediately: what the vulnerability allowed, and what the mitigation changed.

### 3. Alerts Breakdown
Use a bar chart or table to show:
- alert count by detection rule,
- alert count by user,
- alert count by event type.

This helps communicate which behaviors were most suspicious.

### 4. Export Activity Trends
Use a line chart or grouped bar chart to show:
- export volume over time,
- repeated export attempts,
- unusual export timing.

This would support the exfiltration-analysis angle of the project.

### 5. Event Table
A filtered table could show:
- timestamp,
- user,
- event type,
- record or export identifier,
- alert status,
- rule triggered.

This would make the dashboard useful not only for presentation, but also for investigation-style review.

## Data Sources

The dashboard can be driven by the project’s structured outputs, including:

- `logs/access_logs.csv`
- `logs/exports.csv`
- `logs/alerts.csv`

Additional derived data can also be generated from:
- detection summaries,
- secure-mode and vulnerable-mode run outputs,
- screenshot evidence and findings from the docs folder.

## Collaboration Scope

This dashboard is a valuable collaborative area within the project because it connects the technical security pipeline with data interpretation and presentation.

Suggested collaboration split:

### Security / Backend Focus
- attack simulation outputs,
- logging structure,
- detection rule generation,
- secure vs vulnerable comparison logic.

### Analytics / Dashboard Focus
- metric selection,
- chart design,
- dashboard layout,
- story-driven presentation of findings,
- interpretation of suspicious behavior trends.

This structure allows the project to reflect both cybersecurity implementation and data-oriented analysis.

## Possible Tools

The dashboard could be implemented using any of the following:

- Streamlit
- Plotly Dash
- Tableau Public
- Power BI
- a static HTML dashboard with charts
- Jupyter-based visual reporting

For a lightweight first version, a simple Streamlit or static Plotly dashboard would be enough.

## Initial Dashboard MVP

A first minimal version of the dashboard could include only:

1. Summary cards for reads, exports, and alerts  
2. A vulnerable vs secure comparison chart  
3. A bar chart of alerts by rule  
4. A table of suspicious events  

That would already be enough to make the analytics layer visible and useful.

## Why the Dashboard Matters

The dashboard improves this project in three ways:

1. It makes the detection outputs easier to interpret.
2. It provides a stronger collaborative angle by including analytics and visualization work.
3. It makes the repository more compelling for recruiters, lecturers, and reviewers who want to see not only the code, but also the security story and results.

## Future Enhancements

Potential future improvements include:

- filtering by user or event type,
- timeline-based incident views,
- severity scoring,
- richer export analytics,
- anomaly scoring,
- side-by-side comparisons between multiple test runs,
- and integration with report generation.

## Status

Current status: **planned / in progress**

The backend pipeline, attack simulations, detections, screenshots, and documentation are already available. The dashboard layer is the next step for turning those outputs into a more polished security analytics view.