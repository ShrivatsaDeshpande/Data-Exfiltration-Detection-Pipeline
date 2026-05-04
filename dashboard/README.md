# Security Analytics Dashboard

## Purpose

This dashboard is the analytics and visualization layer for the **Data Exfiltration Detection Pipeline** project.

Its purpose is to turn raw security events, logs, and alerts into a clear visual story. The dashboard helps explain how API activity changes between vulnerable mode and secure mode, which rules generate alerts, and what suspicious access patterns look like in practice.

This makes the project stronger as a collaborative cybersecurity and data analytics case study.

## What the Dashboard Shows

The dashboard is intended to answer questions such as:

- How many record reads were successful versus denied?
- How many export events occurred?
- Which detection rules triggered the most alerts?
- Which users generated suspicious activity?
- How does vulnerable mode compare to secure mode?
- What does exfiltration-style behavior look like across a run?

## Planned Metrics

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

### Comparison Metrics
- Vulnerable mode successful reads vs secure mode successful reads
- Vulnerable mode denied reads vs secure mode denied reads
- Bulk export alerts vs repeated export alerts
- Export activity over time
- Denied access events over time

### Optional Metrics
- Suspicious events per run
- High-volume export frequency
- Repeated export frequency
- Ratio of successful to denied object requests
- Top users by alert count

## Suggested Views

### 1. Summary Cards
A row of key indicators showing:
- total reads,
- total denied reads,
- total exports,
- total alerts.

This gives a quick security overview.

### 2. Vulnerable vs Secure Comparison
A comparison chart showing how the same attack behaves in:
- vulnerable mode,
- secure mode.

This is one of the most important views because it shows the impact of the mitigation clearly.

### 3. Alerts Breakdown
A bar chart or table showing:
- alert count by rule,
- alert count by user,
- alert count by event type.

This helps explain what the detection engine is finding.

### 4. Export Activity Trends
A trend visual showing:
- export volume over time,
- repeated export attempts,
- unusually large exports.

This supports the data exfiltration angle of the project.

### 5. Event Table
A detailed table showing:
- timestamp,
- user,
- event type,
- record/export ID,
- alert status,
- rule triggered.

This is useful for review and evidence.

## Data Sources

The dashboard should be built from the project’s structured outputs:

- `logs/access_logs.csv`
- `logs/exports.csv`
- `logs/alerts.csv`

It can also use:
- detection summaries,
- secure-mode and vulnerable-mode outputs,
- findings from `docs/findings.md`,
- screenshots from `docs/screenshots/`.

## Collaboration Scope

This dashboard is intentionally part of the collaborative side of the project.

### Security / Backend Side
- attack simulations,
- authorization logic,
- logging structure,
- detection rules,
- secure vs vulnerable behavior.

### Analytics / Dashboard Side
- metric selection,
- chart selection,
- visual storytelling,
- comparison of modes,
- interpretation of suspicious patterns.

This allows the project to reflect both cybersecurity engineering and data-oriented analysis.

## Recommended Tools

The dashboard could be built with:

- Streamlit
- Plotly Dash
- Tableau Public
- Power BI
- a static HTML dashboard
- a notebook-based report

For a lightweight version, Streamlit or a simple Plotly dashboard would be a strong first step.

## Minimum Viable Dashboard

A first version of the dashboard should include:

1. Summary cards
2. Vulnerable vs secure comparison
3. Alerts by rule
4. A small event table

That would already make the analytics layer useful and presentable.

## Why This Matters

This dashboard improves the project in three ways:

- It makes the detection output easier to understand.
- It adds a clear data analytics layer to the cybersecurity work.
- It makes the repository more impressive for recruiters, lecturers, and collaborators.

## Future Enhancements

Possible future improvements include:

- filtering by user or event type,
- incident timeline views,
- anomaly scoring,
- richer alert metadata,
- side-by-side comparisons across runs,
- and automatic report generation.

## Status

**Current status:** planned / in progress

The backend pipeline, attack simulations, detections, screenshots, and documentation are already present. The dashboard layer is the next step for turning those outputs into a more polished visual security analytics experience.