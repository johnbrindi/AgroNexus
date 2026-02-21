
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.api.api_v1.api import api_router
from app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME, 
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    version="1.0.0",
    description="""
    ## AgroConnect API Documentation
    
    ### Authentication Flow:
    1. **Register**: Use `POST /api/v1/users/` to create a new account.
    2. **Login**: Use `POST /api/v1/auth/login/access-token` (standard OAuth2 form) to get a JWT token.
    3. **Authorize**: Click the **'Authorize'** button at the top of this page and paste your token to access protected endpoints.
    
    ### Core Modules:
    - **Users**: Manage farmer, buyer, and advisor profiles.
    - **AI**: Get crop yield predictions (History is automatically saved specialized for the logged-in user).
    """,
)

# Set all CORS enabled origins
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {"message": "Welcome to AgroConnect API", "docs": "/docs"}
