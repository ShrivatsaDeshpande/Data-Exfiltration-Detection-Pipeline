# Security Policy

## Supported Versions

This repository is an educational lab project and is not intended for production deployment. Security fixes, improvements, and updates will be applied to the latest version in the default branch only.

## Reporting a Vulnerability

If you discover a security issue in this repository, please report it responsibly.

Please include:
- A clear description of the issue
- Steps to reproduce
- The affected file(s) or component(s)
- The potential impact
- Suggested remediation, if available

## How to Report

Please do **not** open a public GitHub issue for undisclosed vulnerabilities.

Instead, report privately by:
- GitHub private vulnerability reporting, if enabled
- or contacting the repository owner directly

Example contact:
- Email: your-email@example.com

## Responsible Disclosure

Please allow reasonable time for review and remediation before public disclosure. Responsible reporting helps improve the project safely and protects users from unnecessary exposure.

## Scope

This project is a local educational cybersecurity lab. The intentionally vulnerable features exist only to demonstrate:
- Broken Object Level Authorization
- insecure object access patterns
- suspicious data export behavior
- basic detection and mitigation strategies

These intentional weaknesses are part of the learning design and should not be treated as production vulnerabilities unless they exist outside the documented lab context.

## Safe Use Expectations

Users and contributors should:
- run this project only in local or isolated lab environments
- avoid using real personal or confidential data
- avoid pointing scripts at external systems
- avoid reusing demonstration attack code outside authorized environments

## Hardening Suggestions

Before adapting this project for broader use, consider:
- strong authentication
- authorization middleware
- secret management
- structured logging
- alert deduplication
- secure deployment configuration
- dependency scanning
- automated security testing