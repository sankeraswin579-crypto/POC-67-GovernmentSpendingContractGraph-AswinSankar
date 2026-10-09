# POC-67 — Government Spending Contract Graph

## Phase 2: Cloud Deployment, Selenium Automation & Docker Containerization

**Project:** Government Spending Contract Graph — POC-67  
**Developer:** Aswin Sankar P.S.  
**Program:** Real Rails Internship — Batch 7  
**Phase:** Phase 2 — Cloud Deployment & Selenium Automation  
**Repository:** [GitHub Repository](https://github.com/sankeraswin579-crypto/POC-67-GovernmentSpendingContractGraph-AswinSankar)

---

## 1. Project Overview

The Government Spending Contract Graph is a proof-of-concept application designed to present government contract and spending information through an interactive data interface.

The project brings together a frontend dashboard, backend APIs, contract and supplier data, automated browser testing, cloud deployment workflows, and Docker containerization.

Phase 2 focuses on deployment readiness, application testing, container configuration, and reproducible development environments.

## 2. Objectives

- Present government contract and spending information through a dashboard.
- Provide backend API endpoints for application data.
- Visualize relationships among departments, suppliers, and contracts.
- Validate core user workflows through Selenium automation.
- Support frontend and backend containerization with Docker.
- Prepare the application for consistent local execution and deployment testing.
- Document setup instructions, testing results, and operational limitations.

## 3. Technology Stack

| Component | Technology |
|---|---|
| Frontend | Next.js, React, TypeScript |
| Backend | Python, FastAPI |
| API server | Uvicorn |
| Data visualization | Dashboard and graph-based visualizations |
| Browser automation | Selenium |
| Containerization | Docker, Docker Compose |
| Frontend hosting | Vercel |
| Backend hosting | Render |
| Version control | Git and GitHub |

*The table describes the project's documented technology stack; individual versions and deployment configurations should be checked against the repository files.*

## 4. Application Architecture

```text
User
 |
 v
Next.js / React Frontend
 |
 | HTTP API requests
 v
FastAPI Backend
 |
 v
Contract and Spending Data
 |
 v
JSON API Responses
 |
 v
Dashboard Visualizations
```

Docker deployment architecture:

```text
Docker Compose
 |
 +-- Frontend Container
 |     +-- Next.js application
 |     +-- Port 3000
 |
 +-- Backend Container
       +-- FastAPI application
       +-- Uvicorn
       +-- Port 8000
```

The frontend communicates with the backend through the configured API base URL.

## 5. Key Features

### Government Contract Data

- Display contract and spending information.
- Organize records by department and supplier.
- Present contract relationships in a graph-oriented interface.
- Support dashboard-based exploration of available records.

### Backend API

- FastAPI-based backend application.
- JSON responses for frontend consumption.
- API documentation through Swagger UI when enabled.
- Health-check endpoint for basic service verification.

### Automated Testing

- Selenium-based browser testing.
- Validation of key frontend workflows.
- Test results and supporting evidence documented for review.

### Docker Containerization

- Separate Docker configuration for the frontend and backend.
- Docker Compose orchestration.
- Environment-based API configuration.
- Reproducible container image builds.
- Service logs and container status available through Docker commands.

## 6. Selenium UAT Results

**Recorded result: PASS — 3 of 3 tests.**

The project's documented User Acceptance Testing result records three successful tests out of three.

Test evidence and reports should be maintained alongside the project’s existing test artifacts. The result refers to the recorded Selenium UAT; it does not automatically establish that every deployment or Docker runtime scenario has passed.

## 7. Docker Configuration

The Docker configuration consists of the following files:

```text
POC-67-GovernmentSpendingContractGraph-AswinSankar/
|
+-- .dockerignore
+-- compose.yaml
|
+-- backend/
|   +-- Dockerfile
|   +-- requirements.txt
|   +-- main.py
|
+-- frontend/
    +-- Dockerfile
    +-- .dockerignore
```

The actual repository may contain additional application files and directories.

### Build the Docker Images

From the project root:

```powershell
docker compose build
```

### Start the Application

```powershell
docker compose up -d
```

### Check Container Status

```powershell
docker compose ps
```

### View Logs

```powershell
docker compose logs -f
```

View an individual service:

```powershell
docker compose logs -f backend
docker compose logs -f frontend
```

### Stop the Application

```powershell
docker compose down
```

### Rebuild After Configuration Changes

```powershell
docker compose up -d --build
```

**Important:** If the Compose configuration uses fixed container names that conflict with another project, make the names unique or remove the conflicting containers after confirming they are safe to stop. If the frontend API URL changes, rebuild the frontend image so its build-time configuration is updated.

## 8. Local Access and Verification

With the default port mappings configured in `compose.yaml`, the expected local addresses are:

| Service | Address |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API documentation | http://localhost:8000/docs |
| Backend health check | http://localhost:8000/health |
| Backend summary API | http://localhost:8000/api/summary |

These addresses assume the corresponding routes and port mappings are present in the current application configuration.

### Verification Checklist

- [ ] Docker images build successfully.
- [ ] Both containers start without errors.
- [ ] Backend health endpoint responds successfully.
- [ ] Frontend loads in the browser.
- [ ] Frontend can communicate with the backend.
- [ ] Contract and spending data load correctly.
- [ ] Selenium UAT is reproducible.
- [ ] Deployment environment variables are configured correctly.

## 9. Cloud Deployment

The documented project workflow uses Vercel for the frontend and Render for the backend.

Deployment verification should include:

1. Confirming the frontend deployment is accessible.
2. Confirming the backend deployment is healthy.
3. Configuring the frontend API URL to point to the intended backend.
4. Checking API requests and browser console errors.
5. Verifying cross-origin resource sharing (CORS) settings.
6. Running key user workflows against the deployed application.

Live deployment URLs should be recorded here only after checking that they correspond to the current project and are accessible.

## 10. Environment Configuration

Configure environment variables according to the existing application settings.

For example, the frontend may use:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

The backend's production CORS configuration should allow the actual frontend origin.

Do not commit secret keys, credentials, private environment files, or production tokens to GitHub. Use deployment-platform environment settings for production values.

## 11. Troubleshooting

### Container Name Conflict

If Docker reports that a container name is already in use:

- Check existing containers using `docker ps -a`.
- Identify which project owns the conflicting container.
- Configure unique names in `compose.yaml`, or stop and remove the conflicting container only when appropriate.

### Port Already in Use

If port 3000 or 8000 is occupied, identify the process or container using the port. Either free the port or update the Compose port mapping and related frontend API configuration.

### Frontend Cannot Reach Backend

Check that:

- The backend container is running.
- The API URL matches the environment in which the browser is running.
- The backend exposes the expected port.
- CORS permits the frontend origin.
- The frontend image has been rebuilt after a build-time API URL change.

### Backend Fails to Start

Inspect the logs:

```powershell
docker compose logs backend
```

Check dependency installation, the configured application entry point, and the Uvicorn startup command.

## 12. Project Status

| Area | Status |
|---|---|
| Existing application | Documented project |
| Selenium UAT | Recorded PASS — 3/3 |
| Docker configuration | Added |
| Docker image build | Previously reported successful |
| Docker runtime validation | Requires separate verification |
| Cloud deployment | Verify current live deployment |
| Final release readiness | Depends on completing the verification checklist |

## 13. Scope and Limitations

This phase focuses on cloud deployment, Selenium automation, Docker containerization, and operational readiness.

It does not claim that all production deployment scenarios, security controls, or container runtime scenarios have been validated. The documented UAT result applies to the recorded Selenium tests.

Decision Intelligence is not a Phase 2 deliverable in this project scope.

## 14. Future Improvements

- Add automated build and deployment workflows.
- Expand API and frontend integration tests.
- Add structured application logging.
- Improve environment-specific configuration.
- Add monitoring and service-health checks.
- Maintain repeatable release and deployment evidence.

## 15. Author

**Aswin Sankar P.S.**  
AI Engineer Intern — Infocreon Solutions  
Real Rails Internship — Batch 7

GitHub: [sankeraswin579-crypto](https://github.com/sankeraswin579-crypto)

---

*This README documents the POC-67 project and its Phase 2 deployment and containerization workflow. Reported test results and implementation status should be updated whenever new verification evidence becomes available.*
