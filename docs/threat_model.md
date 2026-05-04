# Threat Model

## Objective

This project models how a poorly protected API can be abused to access or export data that should be restricted, and how simple monitoring and secure authorization logic can reduce that risk.

## Protected Assets

The primary assets in this project are:
- customer records stored in the SQLite database,
- export functionality that can expose multiple records at once,
- application logs that record evidence of suspicious behavior.

Although the data is synthetic, it represents the type of structured customer information that would be sensitive in a real-world environment.

## Threat Actor

The threat actor is a low-privileged user or attacker who can interact with the API and attempts to retrieve records or export data beyond their authorized scope. The actor does not need advanced exploitation techniques; they mainly rely on weak access control and repeated requests.

## Entry Points

The key entry points are:
- record retrieval endpoints,
- export endpoints,
- any route that accepts user-controlled object identifiers.

These entry points are especially relevant in API security because they often expose individual records directly by ID.

## Main Threats

### 1. Broken Object Level Authorization (BOLA)

The main vulnerability demonstrated in this project is Broken Object Level Authorization. In this scenario, a user can modify an object identifier and retrieve records they do not own because the server checks whether the object exists, but not whether access is permitted.

### 2. Data Exfiltration Through Export Misuse

An attacker can abuse export functionality to retrieve large volumes of records. Even if the export endpoint is legitimate, weak monitoring or poor authorization can allow it to become an exfiltration path.

### 3. Repeated Suspicious Access Patterns

Repeated export attempts, off-hours access, or object enumeration patterns may indicate malicious reconnaissance or staged exfiltration behavior.

## Threat Assumptions

This threat model assumes:
- the attacker can send requests to the API,
- the attacker has at least basic user-level access or can spoof simple request context used in the lab,
- the attacker cannot directly access the database,
- the environment is local and educational rather than internet-exposed.

## Potential Impact

If the vulnerability were present in a real system, the impact could include:
- unauthorized disclosure of customer data,
- privacy violations,
- reputational damage,
- compliance risk,
- and loss of trust in the application.

The project uses synthetic data, but the modeled impact reflects realistic API security failures.

## Mitigations Modeled

The project demonstrates several mitigation concepts:
- ownership-based authorization checks,
- logging of denied access attempts,
- detection rules for suspicious exports,
- detection rules for repeated or unusual access patterns,
- clearer separation between normal and suspicious API behavior.

## Detection Opportunities

The following behaviors can be monitored and turned into analytics or alerts:
- multiple record requests across sequential identifiers,
- repeated exports from the same user,
- unusually large export volumes,
- denied access events in secure mode,
- unusual access timing patterns.

## Residual Risk

Even with secure mode enabled, residual risk remains if:
- identity handling is weak,
- export controls are too permissive,
- logs are not reviewed,
- or alerts are not acted on.

This is why the project includes both mitigation and detection, rather than treating authorization checks alone as a complete solution.