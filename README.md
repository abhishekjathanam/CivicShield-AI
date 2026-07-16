🚨 ThreatLens
AI-Powered SOC Alert Triage & Incident Intelligence Platform

A production-grade Security Operations Center (SOC) application that automatically ingests security alerts, correlates them into incidents, and provides AI-driven investigation intelligence to SOC analysts.

🔗 Live Demo:
👉 https://threat-lens-automated-soc-alert-triage-assistant.vercel.app/

🎯 Purpose

ThreatLens is designed to reduce alert fatigue and accelerate incident response by automating alert analysis and guiding SOC analysts with actionable AI insights.

This project simulates a real-world SOC workflow, combining SIEM-like alert ingestion with SOAR-like automated intelligence — without the complexity of traditional platforms.

👥 User Roles
🔹 Alert Source

Represents security tools (Firewall, IAM, Email Gateway, EDR, etc.)

Generates and injects security alerts into the system

Can only add alerts

Cannot view incidents or dashboards

🔹 SOC Analyst

Views alerts and incidents

Investigates incidents using AI intelligence

Takes containment actions

Resolves incidents

🚫 No Admin role
🚫 No manual correlation button (correlation is backend-driven)

❗ Problem Statement

SOC analysts face:

Thousands of alerts per day

High false positives

Manual triage and correlation

Delayed response times

Over-complex SIEM/SOAR tools

⚠️ Impact:
Critical threats may go unnoticed or be resolved too late.

💡 Solution

ThreatLens provides:

Automated alert ingestion

AI-based alert explanation and risk scoring

Automatic alert correlation into incidents

AI-generated incident investigation intelligence

Clear dashboards for SOC analysts

🏗️ Architecture
┌─────────────────────────────┐
│        Alert Source         │
│ (Simulated Security Tools)  │
└──────────────┬──────────────┘
               │ Alerts
               ▼
┌──────────────────────────────────────────┐
│           Supabase Backend                │
│  • PostgreSQL Database                   │
│  • Authentication (Role-based)           │
│  • Edge Functions                        │
│  • Realtime Updates                     │
└──────────────┬───────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────┐
│        AI Intelligence Layer              │
│  • OpenAI Alert Analysis                 │
│  • Incident Intelligence Generation      │
│  • Risk & Priority Scoring               │
└──────────────┬───────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────┐
│        SOC Analyst Dashboard              │
│  • Alerts                                │
│  • Incidents                             │
│  • Investigation View                   │
│  • Resolution Tracking                  │
└──────────────────────────────────────────┘

🔄 Application Workflow

Alert Source generates security alerts

Alerts are stored in the database

AI analyzes each alert:

Type

Severity

Risk score

Backend automatically correlates related alerts

An Incident is created automatically

SOC Analyst opens the incident

On Start Investigation, AI generates:

Attack pattern

Business impact

Priority level

Containment steps

Analyst recommendations

Analyst takes action (demo actions)

Incident is resolved

Dashboard metrics update in real time

✨ Key Features

Automated alert ingestion (demo simulation)

AI-powered alert explanation

Risk scoring (0–100)

Automatic alert-to-incident correlation

AI Incident Intelligence:

Attack pattern

Business impact

Priority level

Containment steps

Analyst recommendations

Real-time SOC dashboard metrics

Incident lifecycle tracking:

Open

In Progress

Resolved

Role-based authentication

Backend automation using cron jobs

📊 SOC Dashboard Metrics

Total Alerts

Active Incidents

In-Progress Incidents

Resolved Today

Severity distribution

Incident status trends

All metrics update automatically based on backend state changes.

🛠️ Tech Stack
Frontend

React

TypeScript

Vite

Tailwind CSS

shadcn/ui

Backend

Supabase

PostgreSQL

Authentication

Edge Functions

Realtime

Cron Jobs

AI

OpenAI API (Incident Intelligence & Alert Analysis)

Deployment

Vercel

🔐 Authentication & Security

Role-based authentication:

Alert Source

SOC Analyst

Secure API access via environment variables

Backend-only incident correlation logic

No sensitive data stored

🧪 Demo Capabilities

Generate realistic alerts:

Phishing email

Brute force login

Malware detection

Suspicious login

AI explains alerts instantly

Incidents created automatically

One-click investigation with AI insights

Manual resolution for demo purposes

📈 Results & Outcome

Reduced alert noise

Faster incident investigation

Clear analyst guidance

Realistic SOC workflow simulation

Demonstrates AI + automation value in cybersecurity

🔮 Future Scope

Integration with real SIEM tools

Automated SOAR response execution

Threat intelligence enrichment

Analyst collaboration features

Compliance and reporting modules