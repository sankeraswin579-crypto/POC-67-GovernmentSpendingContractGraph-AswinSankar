# POC-67 Vercel + Render Deployment

## Architecture
- `frontend/` -> Vercel (Next.js)
- `backend/` -> Render (FastAPI)

## Render
Create a Web Service from this GitHub repository.

- Root Directory: `backend`
- Runtime: Python 3
- Build Command: `pip install -r requirements.txt`
- Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- Health Check Path: `/health`

Environment variable:
- `FRONTEND_URL` = the final Vercel URL, e.g. `https://your-project.vercel.app`

After deployment, verify:
- `/health`
- `/docs`
- `/api/summary`
- `/api/contracts`
- `/api/analytics`
- `/api/graph`

## Vercel
Import the same GitHub repository as a separate Vercel project.

- Root Directory: `frontend`
- Framework: Next.js
- Build Command: `npm run build`
- Output Directory: default

Environment variable:
- `NEXT_PUBLIC_API_URL` = the Render service URL, e.g. `https://your-service.onrender.com`

Redeploy after adding the environment variable.

## Important
Do not use the old localhost rewrite in `frontend/next.config.ts`. The frontend now calls the Render API directly through `NEXT_PUBLIC_API_URL`.
