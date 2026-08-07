# Deployment Notes

## Local Development

### Backend

```bash
cd backend

python -m venv .venv

pip install -r requirements.txt

uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Environment Variables

Create:

```
backend/.env
```

Example:

```
DATABASE_URL=

OPENAI_API_KEY=

API_BASE_URL=http://localhost:8000
```

---

## Production Deployment

Recommended platforms:

- Render
- Railway
- Vercel
- Azure