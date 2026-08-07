from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.api import router

app = FastAPI(
    title="Government Spending Contract Graph API",
    description="Real Rails Intelligence Library - Batch 7",
    version="1.0.0",
)

# -----------------------------
# CORS Configuration
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # Change this to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Root Endpoint
# -----------------------------
@app.get("/")
def home():
    return {
        "project": "Government Spending Contract Graph",
        "developer": "Aswin Sankar P.S.",
        "batch": "Real Rails Intelligence Library - Batch 7",
        "status": "Running",
        "docs": "/docs"
    }

# -----------------------------
# API Routes
# -----------------------------
app.include_router(router)

# -----------------------------
# Health Check
# -----------------------------
@app.get("/health")
def health():
    return {
        "status": "healthy",
        "message": "Backend is running successfully."
    }