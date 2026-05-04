# Architecture

## System Overview

This project is a collaborative cybersecurity lab that demonstrates how API-level data exfiltration can occur when authorization controls are weak, and how simple detection engineering can help identify suspicious behavior.

The system is designed as a local, reproducible pipeline that combines synthetic data generation, a FastAPI application, attack simulations, structured logging, and rule-based detections.

The architecture has two linked perspectives:
- a security engineering layer that models vulnerable and secure API behavior,
- and an analytics/dashboard layer that supports interpretation of logs, alerts, and export patterns.

This makes the project suitable not only as an application security demonstration, but also as a collaborative data-driven security monitoring case study.

## High-Level Flow

```text
Synthetic Data Generation
        |
        v
SQLite Database Seeded with Customer Records
        |
        v
FastAPI Application Exposes Record and Export Endpoints
        |
        +-------------------------------+
        |                               |
        v                               v
Attack Simulation Scripts         Normal / Test API Activity
        |                               |
        +---------------+---------------+
                        |
                        v
                 Structured CSV Logs
                        |
                        v
              Detection Rules and Reports
                        |
                        v
        Screenshots, Dashboard Inputs, and Findings
```

## Core Components

### 1. Data Pipeline

The `pipeline/` module generates synthetic customer records and seeds the SQLite database used by the API. This allows the project to simulate realistic record access and export behavior without using real personal data.

Main responsibilities:
- generate synthetic records,
- seed the database,
- support repeatable local lab setup.

### 2. API Layer

The `api/` module contains the FastAPI application, route definitions, schemas, models, and security logic. It provides the main interface through which records are viewed and export actions are triggered.

Main responsibilities:
- expose record retrieval endpoints,
- expose export-related endpoints,
- apply vulnerable or secure authorization behavior,
- log activity for later analysis.

### 3. Attack Simulation Layer

The `attacks/` module contains scripts that simulate adversarial behavior in a controlled environment. These scripts model how an attacker might enumerate records, export large amounts of data, or trigger suspicious access patterns.

Main responsibilities:
- simulate BOLA-style object access,
- simulate bulk export behavior,
- simulate unusual or repeated export activity.

### 4. Detection Layer

The `detections/` module parses logged events and applies rule-based logic to identify suspicious behavior. It transforms raw activity into security signals such as export alerts or denied-access detections.

Main responsibilities:
- load logs,
- apply detection rules,
- generate alerts and summary outputs,
- support reporting for the project write-up and dashboard views.

### 5. Documentation and Dashboard Layer

The `docs/` folder and dashboard-related outputs support project communication, evidence presentation, and analytics interpretation. In the collaborative context of this project, this layer is important because it connects technical security events to patterns that can be explained visually and analytically.

Main responsibilities:
- capture screenshots and findings,
- explain architecture and mitigations,
- support dashboard-oriented interpretation of alerts and trends,
- make the project easier to understand for recruiters, lecturers, and collaborators.

## Security Modes

The project supports two operating modes.

### Vulnerable Mode

In vulnerable mode, the API allows access to records by identifier without verifying ownership. This reproduces Broken Object Level Authorization behavior and demonstrates how unauthorized data access can occur.

### Secure Mode

In secure mode, the API enforces ownership-based access control before returning records. Unauthorized access is denied and logged, making the mitigation observable through both security behavior and analytics outputs.

## Logging and Evidence Flow

The project uses CSV-based logs to record:
- record access activity,
- export events,
- detection alerts.

These logs serve three purposes:
1. they provide evidence that the attacks were executed,
2. they support the detection rules,
3. they provide structured inputs for screenshots, findings, and dashboard-style summaries.

## Dashboard Relevance

The dashboard concept remains useful in this project because it reflects the collaborative angle between cybersecurity and data/analytics. A dashboard layer can visualize:
- number of exports over time,
- denied versus successful record access,
- alert counts by rule,
- suspicious user activity patterns,
- secure-mode versus vulnerable-mode outcomes.

This makes the project more than a vulnerability demo; it becomes a small security analytics case study with room for interdisciplinary collaboration.

## Why This Architecture Works for a Portfolio

This architecture is strong for a cybersecurity portfolio because it shows the full lifecycle of a security problem:
- data generation,
- vulnerable implementation,
- attack simulation,
- detection,
- mitigation,
- and evidence presentation.

It also demonstrates that security work is not only about finding vulnerabilities, but also about structuring data, collecting evidence, and communicating findings clearly.