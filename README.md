# Data Exfiltration Detection Pipeline

A cybersecurity lab project that simulates data exfiltration and API authorization weaknesses in a controlled local environment, then detects suspicious behavior and demonstrates mitigations using FastAPI, SQLite, synthetic data, and rule-based monitoring. This repository is designed as a portfolio project to showcase vulnerability analysis, detection engineering, secure API design, and practical mitigation of OWASP-style API risks. 

## Project Overview

This project models a simple data pipeline that stores synthetic customer records and exposes them through a FastAPI application. It includes:
- a vulnerable mode that allows unauthorized object access,
- a secure mode that enforces record ownership,
- attack simulation scripts for suspicious data access and export behavior,
- CSV-based logging,
- and a lightweight detection engine for identifying exfiltration-related activity.

The project is inspired by:
- **OWASP API Security Top 10**, especially Broken Object Level Authorization (BOLA),
- **MITRE ATT&CK Exfiltration** tactics and detection ideas.

## Objectives

- Simulate realistic API-driven data exfiltration behavior in a safe local lab.
- Demonstrate a **Broken Object Level Authorization (BOLA)** issue.
- Show how ownership checks mitigate unauthorized access.
- Detect suspicious export and access patterns using simple rule-based analytics.
- Create a strong GitHub portfolio project for cybersecurity and backend security roles.

## Tech Stack

- **Backend:** FastAPI, Uvicorn
- **Database:** SQLite, SQLAlchemy
- **Data Generation:** Faker, pandas
- **Testing:** pytest
- **Attack Simulation:** Python scripts using `requests`
- **Detection Logic:** CSV log analysis with pandas

## Repository Structure

```text
data-exfiltration-detection-pipeline/
├── api/
│   ├── app.py
│   ├── config.py
│   ├── db.py
│   ├── models.py
│   ├── schemas.py
│   ├── security.py
│   └── routes/
│       ├── exports.py
│       ├── health.py
│       └── records.py
├── attacks/
│   ├── bola_exfiltration.py
│   ├── bulk_exfiltration.py
│   └── off_hours_exfiltration.py
├── detections/
│   ├── engine.py
│   ├── report.py
│   └── rules.py
├── pipeline/
│   ├── generate_data.py
│   ├── seed_db.py
│   └── simulate_activity.py
├── utils/
│   ├── logger.py
│   └── time_utils.py
├── tests/
├── logs/
├── data/
├── run_api.py
├── run_seed.py
└── run_detection.py
```

## Dataset

This project does **not** use real personal data. It generates a synthetic dataset using Faker and saves it as CSV before loading it into SQLite.

Generated fields include:
- `owner_user_id`
- `customer_name`
- `customer_email`
- `department`
- `country`
- `account_type`
- `balance`
- `risk_score`
- `last_access_hour`

This allows realistic testing without exposing sensitive real-world data.

## Threat Model

The project focuses on two main security problems:

### 1. Broken Object Level Authorization (BOLA)
The vulnerable API allows users to request records by ID without verifying ownership. In insecure mode, an attacker can enumerate record IDs and retrieve data that belongs to other users.

### 2. Suspicious Data Exfiltration
The project simulates suspicious high-volume data export and repeated export activity through dedicated attack scripts. These behaviors are then logged and flagged by detection rules.

## Features

- Synthetic dataset generation
- SQLite-backed API
- Record listing and export endpoints
- Local attack simulation scripts
- Access and export logging
- Detection rules for:
  - high-volume exports,
  - repeated export activity,
  - denied record access attempts
- Secure mode toggle for mitigation testing
- Unit tests for core behavior

## Vulnerable vs Secure Mode

The project supports two modes:

### Vulnerable mode
```bash
export SECURE_MODE=false
```

Behavior:
- Record ID enumeration succeeds
- BOLA attack works
- Unauthorized reads are not blocked

### Secure mode
```bash
export SECURE_MODE=true
```

Behavior:
- Ownership checks are enforced
- Unauthorized object access is denied with HTTP 403
- Denied access events are logged and detectable

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/ShrivatsaDeshpande/Data-Exfiltration-Detection-Pipeline.git
cd data-exfiltration-detection-pipeline
```

### 2. Create and activate a virtual environment
```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 3. Install dependencies
```bash
python -m pip install --upgrade pip
python -m pip install fastapi uvicorn sqlalchemy pydantic pandas faker python-dotenv requests pytest httpx
```

### 4. Optional: save dependencies
```bash
python -m pip freeze > requirements.txt
```

## Running the Project

### Seed the database
```bash
python run_seed.py
```

### Start the API
```bash
python run_api.py
```

### Open in browser
- `http://127.0.0.1:8000/`
- `http://127.0.0.1:8000/health`
- `http://127.0.0.1:8000/docs`

## Running Tests

```bash
pytest -q
```

## Attack Simulations

### BOLA attack
```bash
python attacks/bola_exfiltration.py
```

### Bulk export simulation
```bash
python attacks/bulk_exfiltration.py
```

### Repeated export simulation
```bash
python attacks/off_hours_exfiltration.py
```

## Detection

Run the detection engine:
```bash
python run_detection.py
```

Generate a summary report:
```bash
python -m detections.report
```

## Example Results

### Vulnerable mode
- `successful_reads: 15`
- `denied_reads: 0`

### Secure mode
- `successful_reads: 0`
- `denied_reads: 15`

These results demonstrate the difference between missing authorization checks and enforced ownership-based access control.

## Detection Rules

The current version includes three simple rules:

1. **High-volume export rule**  
   Flags exports above a row threshold.

2. **Repeated export rule**  
   Flags repeated export activity from the same user.

3. **Denied access rule**  
   Flags unauthorized object access attempts in secure mode.

## Security Concepts Demonstrated

- Broken Object Level Authorization (BOLA)
- Object ownership enforcement
- Data exfiltration behavior
- Rule-based anomaly detection
- Secure-by-design API improvements
- Synthetic data generation for safe security testing

## Screenshots

Add screenshots here after running the project, for example:
- FastAPI `/docs` page
- Vulnerable mode terminal output
- Secure mode terminal output
- Detection summary output
- Sample alerts log

Example Markdown:
```md




```

## Resume Value

This project demonstrates:
- secure API development,
- vulnerability identification and mitigation,
- data exfiltration simulation,
- attack detection logic,
- backend engineering,
- reproducible testing,
- and security-focused documentation.

Suggested resume bullet:

- Built a FastAPI-based cybersecurity lab that simulated data exfiltration and Broken Object Level Authorization attacks, implemented ownership-based access controls, and developed rule-based detections aligned with OWASP API Security Top 10 and MITRE ATT&CK exfiltration behaviors.

## Limitations

This is a local educational lab and not a production-grade detection platform. Current limitations include:
- simple CSV-based logging,
- no authentication beyond a header-based user ID simulation,
- no SIEM integration,
- no alert deduplication,
- and no real-time streaming analytics.

## Future Improvements

- JWT-based authentication
- Role-based access control
- Better alert deduplication
- Dashboard for alerts and logs
- Dockerized setup
- Sigma-like detection rule format
- Integration with Elasticsearch, Splunk, or a lightweight SIEM workflow

## Ethical Use

This repository is intended for **educational and defensive security research** in a controlled local environment only. Do not use these techniques against systems, APIs, or datasets you do not own or have explicit permission to test.

## License

Choose a license before publishing, for example:
- MIT License
- Apache 2.0

## Author

Your Name  
GitHub: https://github.com/ShrivatsaDeshpande