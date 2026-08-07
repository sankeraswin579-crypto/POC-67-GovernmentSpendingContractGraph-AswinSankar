# Government Spending Contract Graph

> **PoC ID:** 67  
> **Batch:** Real Rails Intelligence Library – Batch 7  
> **Developer:** Aswin Sankar P.S.  
> **GitHub Username:** sankeraswin579-crypto

---

# Overview

Government Spending Contract Graph is a full-stack intelligence platform designed to visualize government procurement and contract spending through interactive graph analytics.

The application enables users to explore relationships between government agencies, vendors, and contracts while providing spending analytics, filtering capabilities, and decision-support insights.

The project was developed as **PoC #67** for the **Real Rails Intelligence Library Batch 7**.

---

# Problem Statement

Government procurement data is often distributed across large datasets, making it difficult to understand spending patterns, agency relationships, and vendor participation.

This project transforms raw contract records into an interactive intelligence dashboard that improves transparency and supports data-driven decision-making.

---

# Business Objective

Develop an intelligence platform that:

- Visualizes government spending relationships
- Helps identify major spending agencies
- Highlights top vendors
- Enables interactive exploration of procurement data
- Supports policy analysis and public transparency

---

# Intended Users

- Government Analysts
- Procurement Officers
- Policy Researchers
- Journalists
- Data Scientists
- Citizens interested in public spending

---

# Features

## Dashboard

- KPI Cards
- Total Contracts
- Total Spending
- Total Agencies
- Total Vendors

---

## Interactive Contract Graph

Displays relationships between:

Government Agency

↓

Contract

↓

Vendor

Features include:

- Interactive graph visualization
- Relationship exploration
- Zoom & Pan
- Graph legend

---

## Analytics

- Spending by Agency
- Spending Overview
- Interactive Charts

---

## Intelligence Center

Provides:

- Highest Spending Agency
- Largest Contract
- Most Active Vendor
- Total Spending
- Decision Support Summary

---

## Filters

Users can filter by:

- Agency
- State
- Year
- Search Contracts

---

## Contract Table

Displays:

- Agency
- Vendor
- Contract
- Amount
- Year
- State

---

## State Distribution

Shows contract distribution and spending across participating states.

---

# Technology Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Recharts
- React Flow

## Backend

- FastAPI
- Python

## Data Processing

- Pandas
- NumPy

---

# Project Structure

```
government-spending-contract-graph/

├── backend/
│
├── frontend/
│
├── docs/
│   ├── ARCHITECTURE_SUMMARY.md
│   ├── SOURCE_DATA_SUMMARY.md
│   ├── AI_USAGE_SUMMARY.md
│   ├── DEPLOYMENT_NOTES.md
│   ├── KNOWN_LIMITATIONS.md
│   ├── VAR_REPORT.md
│   ├── UAT_CHECKLIST.md
│   └── COMPLETION_REPORT.md
│
├── screenshots/
│
├── README.md
│
└── requirements.txt
```

---

# API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/summary` | Dashboard Summary |
| `/api/contracts` | Contract Dataset |
| `/api/analytics` | Spending Analytics |
| `/api/graph` | Relationship Graph |

---

# Setup Instructions

## Clone Repository

```bash
git clone https://github.com/sankeraswin579-crypto/POC-67-GovernmentSpendingContractGraph-AswinSankar.git
```

---

## Backend

```bash
cd backend

python -m venv .venv

source .venv/bin/activate
```

Windows

```bash
.venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run FastAPI

```bash
uvicorn app.main:app --reload
```

Backend URL

```
http://127.0.0.1:8000
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend URL

```
http://localhost:3000
```

---

# Environment Variables

Backend

```
DATABASE_URL=

API_BASE_URL=http://127.0.0.1:8000
```

Frontend

```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

---

# Validation

## Visualization Audit Review

**Status:** PASS

Completed:

- Dashboard Review
- Graph Visualization
- Layout
- Responsiveness
- Visual Identity

---

## User Acceptance Testing

**Status:** PASS

Validated:

- Backend Startup
- Frontend Startup
- API Connectivity
- Dashboard Rendering
- Graph Rendering
- Analytics
- Filters
- Responsive Design

---

# Screenshots

Include:

- Dashboard
- Contract Graph
- Spending Analytics
- Intelligence Panel
- Responsive View

---

# Demo Video

20–30 second application walkthrough.

---

# AI Usage

Artificial Intelligence tools were used for:

- UI Design
- Architecture Planning
- Documentation
- Debugging
- Code Suggestions

All generated code was manually reviewed, modified, and validated before integration.

---

# Known Limitations

- Public datasets may contain incomplete records.
- Large datasets may reduce graph rendering performance.
- AI insights depend on available metadata.
- Real-time synchronization is not currently implemented.

---

# Future Enhancements

- Live Government API integration
- Predictive contract analytics
- AI anomaly detection
- Export graph as PDF
- User authentication
- Advanced graph clustering

---

# Developer

**Aswin Sankar P.S.**

GitHub

https://github.com/sankeraswin579-crypto

---

# License

This project was developed as part of the **Real Rails Intelligence Library – Batch 7** for educational and portfolio purposes.