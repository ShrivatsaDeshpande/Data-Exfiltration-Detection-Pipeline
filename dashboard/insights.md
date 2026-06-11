###### Draft

## What the Dashboard Shows

- How many record reads were successful versus denied?

| Mode       | Successful Reads | Denied Reads |
| ---------- | ---------------- | ------------ |
| Vulnerable | 15               | 0            |
| Secure     | 0                | 15           |


- How many export events occurred?
A total of 5 export events were recorded during the simulation. （According to exports.csv）


- Which detection rules triggered the most alerts?

| Rule                     | Alert Count |
| ------------------------ | ----------- |
| Repeated Export Activity | 3           |
| High Volume Export       | 1           |
Repeated Export Activity was the most frequently triggered detection rule, generating 3 alerts.


- Which users generated suspicious activity?
User 66 was responsible for all detected suspicious expor activity. (Based on alerts.csv and export.csv)


- How does vulnerable mode compare to secure mode?
In vulnerable mode, all unauthorized record access attempts were successful. In secure mode, the same requests were denied, demonstrating the effectiveness of the authorization controls.

- What does exfiltration-style behavior look like across a run?

Repeated Exports
↓
Large Data Exports
↓
Detection Rules Triggered
↓
Alerts Generated

Exfiltration-style behaviour was characterised by repeated export activity and large-volume data transfers, which triggered multiple detection alerts during the simulation.


### Core Metrics
- Total record reads
- Successful reads
- Denied reads

Total Record Reads = 20
Successful Reads = 20
Denied Reads = 0
（access_logs.csv）

- Total export events
Total Export Events = 5

- Total alerts generated
Total alerts generated=4


- Alerts by rule
| Detection Rule           | Alerts |
| ------------------------ | ------ |
| Repeated Export Activity | 3      |
| High Volume Export       | 1      |

- Alerts by user
All alerts by user 66
User 66=4

- Exports by user
User 66=5

- Reads by mode: vulnerable vs secure
| Mode       | Successful Reads | Denied Reads |
| ---------- | ---------------- | ------------ |
| Vulnerable | 15               | 0            |
| Secure     | 0                | 15           |
The comparison demonstrates the effectiveness of the authorisation controls implemented in secure mode.


### Comparison Metrics
- Vulnerable mode successful reads vs secure mode successful reads
- Vulnerable mode denied reads vs secure mode denied reads
- Bulk export alerts vs repeated export alerts
- Export activity over time
- Denied access events over time

| Mode       | Successful | Denied |
| ---------- | ---------- | ------ |
| Vulnerable | 15         | 0      |
| Secure     | 0          | 15     |


# Dashboard Findings and Interpretation



### Alerts by Rule

| Detection Rule           | Alert Count |
| ------------------------ | ----------- |
| Repeated Export Activity | 3           |
| High Volume Export       | 1           |

Repeated Export Activity generated the highest number of alerts, indicating that repeated data extraction attempts were the dominant suspicious behaviour observed during the simulation.

### Alerts by User

| User    | Alert Count |
| ------- | ----------- |
| User 66 | 4           |

User 66 generated all recorded alerts, making this account the primary source of suspicious activity during the test scenario.

### Exports by User

| User    | Export Events |
| ------- | ------------- |
| User 66 | 5             |

All export operations were performed by User 66, demonstrating a concentrated pattern of data extraction behaviour.


## Vulnerable vs Secure Mode Comparison

| Mode       | Successful Reads | Denied Reads |
| ---------- | ---------------- | ------------ |
| Vulnerable | 15               | 0            |
| Secure     | 0                | 15           |

The comparison demonstrates the effectiveness of the authorisation controls implemented in secure mode. In vulnerable mode, all unauthorised access attempts succeeded. After mitigation was applied, the same requests were denied, preventing unauthorised access to customer records.


## Detection Behaviour

The detection engine successfully identified suspicious export activity through rule-based monitoring.

Repeated export behaviour triggered multiple alerts, while large-volume exports generated additional warnings. Together, these detections demonstrate how monitoring and alerting mechanisms can identify potential data exfiltration attempts.

## Exfiltration Pattern Analysis

The simulated attack exhibited a typical data exfiltration pattern:

1. Repeated access to customer records.
2. Multiple export operations performed by the same user.
3. High-volume data extraction.
4. Detection rule activation.
5. Alert generation.

This sequence reflects a realistic example of how unauthorised data collection and extraction may occur within a vulnerable system.


## Overall Conclusion

The dashboard demonstrates that vulnerable configurations allow unrestricted access to sensitive records, while secure-mode controls effectively prevent unauthorised access attempts. Detection rules successfully identified suspicious export behaviour and generated alerts that support incident investigation and security monitoring.

The combination of attack simulation, logging, detection, and visual analytics provides a complete view of the data exfiltration lifecycle and highlights the value of both preventative and detective security controls.