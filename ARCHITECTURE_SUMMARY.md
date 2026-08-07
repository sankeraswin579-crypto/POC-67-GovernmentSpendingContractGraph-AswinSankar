# Architecture Summary

## Project Information

- **PoC ID:** 67
- **Project Title:** Government Spending Contract Graph
- **Developer:** Aswin Sankar P.S.
- **GitHub Username:** sankeraswin579-crypto
- **Batch:** Real Rails Batch 7

---

# Overview

The Government Spending Contract Graph is a full-stack intelligence application that visualizes relationships between government agencies, contracts, and vendors. The system provides interactive graph exploration, analytics dashboards, filtering capabilities, and AI-assisted insights.

---

# System Architecture

```
                +----------------------+
                |     Next.js Frontend |
                +----------+-----------+
                           |
                    REST API Requests
                           |
                +----------v-----------+
                |    FastAPI Backend   |
                +----------+-----------+
                           |
                Data Processing Layer
                           |
                +----------v-----------+
                | Government Dataset   |
                | CSV / JSON / API     |
                +----------------------+
```

---

# Frontend Responsibilities

- Dashboard
- Graph Visualization
- Search
- Filters
- Statistics Cards
- Intelligence Panel
- Responsive UI

---

# Backend Responsibilities

- Load datasets
- Process contract records
- Build graph relationships
- Generate API responses
- Handle filtering
- Perform analytics

---

# Data Flow

Dataset

↓

FastAPI

↓

REST API

↓

Next.js Dashboard

↓

Graph Visualization

↓

User Interaction

---

# Technologies

- Python
- FastAPI
- Next.js
- React
- TypeScript
- Tailwind CSS
- Network Graph Library