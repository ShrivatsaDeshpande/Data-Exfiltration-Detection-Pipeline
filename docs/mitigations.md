# Mitigations

## Objective

This document explains how the project moves from a vulnerable API design to a more secure model by introducing authorization checks, logging, and simple detection controls.

The goal is not only to block unauthorized access, but also to improve visibility into suspicious behavior that may indicate data exfiltration attempts.

## Vulnerability Addressed

The main vulnerability demonstrated in this project is Broken Object Level Authorization (BOLA).

In vulnerable mode, the API accepts a user-controlled object identifier and returns the requested record without verifying whether the requester actually owns or is allowed to access that object.

This creates a direct path to unauthorized data access through record enumeration.

## Security Improvement in Secure Mode

The core mitigation introduced in this project is an ownership-based authorization check.

Instead of returning a record solely because it exists, the secure implementation verifies that:
- the requester is identified,
- the requested object belongs to that requester,
- and access should be allowed before the response is returned.

If the ownership check fails, access is denied and the event is logged.

## Mitigation Strategies Demonstrated

### 1. Object-Level Authorization Checks

The most important mitigation is to enforce authorization checks for every request that accesses a record by identifier.

This means:
- access decisions are made per object,
- client-supplied IDs are not trusted on their own,
- and record existence does not imply record accessibility.

This directly addresses the root cause of BOLA.

### 2. Deny by Default

The secure mode follows a deny-by-default mindset.

If ownership or permission cannot be confirmed, the application does not return the record. This reduces the chance of accidental overexposure and aligns with least-privilege design.

### 3. Logging of Suspicious and Denied Activity

The project logs access activity, export actions, and denied reads.

This provides two benefits:
- it creates evidence that the mitigation is working,
- and it gives the detection layer data that can be analyzed later.

Without logging, blocked attacks may disappear silently and provide little operational insight.

### 4. Detection Rules for Exfiltration-Like Behavior

The project adds simple rule-based detections to identify:
- repeated export activity,
- high-volume exports,
- denied-access events,
- and suspicious usage patterns.

These detections do not replace authorization, but they strengthen visibility and support incident analysis.

### 5. Separation Between Vulnerable and Secure Behavior

By supporting both vulnerable mode and secure mode, the project makes mitigation measurable.

This is useful because it allows before-and-after comparison:
- vulnerable mode shows the weakness,
- secure mode shows the control,
- and logs show the operational difference.

## Why These Mitigations Matter

Authorization failures are dangerous because they often look small in code but can expose large amounts of sensitive data.

The mitigations in this project matter because they:
- reduce unauthorized access,
- create stronger object ownership boundaries,
- generate evidence for detections,
- and support a more defensible API design.

## Additional Mitigations Recommended

The current project demonstrates the foundation, but a production-grade system should also include stronger controls such as:

### Stronger Authentication
- Use real authentication instead of lab-style simulated identity.
- Prefer token-based authentication such as JWT or a session-backed identity layer.
- Consider MFA for sensitive environments.

### Role-Based or Attribute-Based Access Control
- Add RBAC or ABAC policies where appropriate.
- Separate user, analyst, and admin permissions clearly.
- Limit high-risk functions to only the roles that need them.

### Non-Predictable Object Identifiers
- Avoid exposing predictable sequential identifiers when possible.
- Prefer GUIDs or other hard-to-guess identifiers to reduce easy enumeration.

### Rate Limiting and Abuse Controls
- Add throttling for repeated requests and export-heavy endpoints.
- Restrict export volume and frequency.
- Use cooldowns or approval workflows for large exports.

### Data Minimization
- Return only fields that are necessary for the request.
- Avoid overexposing sensitive attributes in API responses.
- Apply response filtering based on role or ownership.

### Alerting and Monitoring
- Send alerts for repeated denied access events.
- Monitor unusual export timing, frequency, and volume.
- Review logs regularly instead of treating logging as passive storage.

### Secure Transport and Deployment Controls
- Use HTTPS in real environments.
- Protect secrets properly.
- Remove debug behavior and development shortcuts before deployment.

## Evidence of Mitigation

The effectiveness of the mitigation can be shown through:
- successful unauthorized reads in vulnerable mode,
- denied unauthorized reads in secure mode,
- logged denied-access events,
- and alert outputs generated by the detection engine.

This evidence-based approach makes the security improvement easier to explain to recruiters, lecturers, and collaborators.

## Residual Limitations

The project remains a local educational lab, so some limitations still exist:
- identity handling is simplified,
- logging is CSV-based rather than SIEM-integrated,
- export governance is basic,
- and no production-grade authentication stack is implemented.

These limitations are intentional for scope, but they also indicate natural future improvements.

## Conclusion

The project demonstrates that effective API security is not only about preventing exploitation at the endpoint level. It also requires visibility, clear authorization logic, and the ability to compare vulnerable and secure behavior through evidence.

The combination of ownership checks, deny-by-default logic, logging, and rule-based detections makes the mitigation story much stronger than a code-only fix.