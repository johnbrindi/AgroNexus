
from fastapi import APIRouter
from app.api.api_v1.endpoints import auth, users, ai_prediction

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(ai_prediction.router, prefix="/ai", tags=["ai"])
