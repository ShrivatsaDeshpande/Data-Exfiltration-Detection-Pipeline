# Findings

## Summary

This project shows that weak API authorization can create a practical path to unauthorized data access and that even simple rule-based monitoring can improve visibility into exfiltration-style behavior.

The lab also demonstrates that mitigation is more persuasive when supported by before-and-after evidence rather than code changes alone.

## Key Findings

### 1. Vulnerable Mode Allowed Unauthorized Access

When the application ran in vulnerable mode, record access by identifier succeeded without verifying object ownership. This made it possible to enumerate records and retrieve data outside the requester’s intended scope.

### 2. Secure Mode Prevented the Same Behavior

When secure mode was enabled, the same record access attempts were checked against ownership rules. Unauthorized reads were denied, which showed that the mitigation directly addressed the demonstrated weakness.

### 3. Detection Rules Identified Suspicious Activity

The detection engine was able to convert raw access and export events into more meaningful alerts. High-volume exports, repeated export behavior, and denied-access activity provided useful security signals that could be used in analytics or dashboard views.

### 4. Logging Improved Explainability

The structured logging layer made the project much easier to interpret. Instead of relying only on code inspection, the project produced tangible evidence of what happened in vulnerable mode, what changed in secure mode, and which behaviors were classified as suspicious.

## Security Interpretation

The project reinforces an important cybersecurity lesson: authorization failures are often simple in code but severe in impact. It also shows that defensive value increases when vulnerability demonstrations are paired with logging, analytics, and mitigation evidence.

## Portfolio Value

From a portfolio perspective, the project demonstrates:
- API security awareness,
- practical understanding of BOLA risk,
- secure-by-design mitigation thinking,
- detection engineering fundamentals,
- testing and CI validation,
- and evidence-driven reporting.

## Suggested Dashboard Metrics

If the dashboard layer is expanded, the following metrics would be strong to visualize:
- total exports per run,
- denied versus successful reads,
- alert count by rule,
- suspicious events over time,
- secure-mode versus vulnerable-mode comparison.

## Future Improvements

The next improvements that would strengthen the project further are:
- stronger authentication and identity binding,
- richer alert metadata,
- better visualization of event trends,
- dashboard-based filtering and summaries,
- and containerized deployment for reproducibility.