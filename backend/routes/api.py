from fastapi import APIRouter, HTTPException
from services.data_service import data_service

router = APIRouter(
    prefix="/api",
    tags=["Government Spending"]
)

# -----------------------------------------
# API Status
# -----------------------------------------

@router.get("/")
def api_status():
    return {
        "project": "Government Spending Contract Graph",
        "status": "Running"
    }


# -----------------------------------------
# Dashboard Summary
# -----------------------------------------

@router.get("/summary")
def summary():
    try:
        return data_service.summary()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# -----------------------------------------
# Contracts
# -----------------------------------------

@router.get("/contracts")
def contracts(limit: int = 100):
    try:
        return data_service.get_contracts(limit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# -----------------------------------------
# Search
# -----------------------------------------

@router.get("/search")
def search(q: str):
    try:
        return data_service.search(q)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# -----------------------------------------
# Analytics
# -----------------------------------------

@router.get("/analytics")
def analytics():
    try:
        return data_service.analytics()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# -----------------------------------------
# Graph
# -----------------------------------------

@router.get("/graph")
def graph():
    try:
        return data_service.graph()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# -----------------------------------------
# Top Values
# -----------------------------------------

@router.get("/column/{column_name}")
def top_values(column_name: str):
    try:
        return data_service.top_values(column_name)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# -----------------------------------------
# Dataset Information
# -----------------------------------------

@router.get("/info")
def dataset_info():
    try:
        return data_service.info()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))