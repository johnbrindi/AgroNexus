
from pydantic_settings import BaseSettings
from typing import List, Union, Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "AgroConnect Backend"
    API_V1_STR: str = "/api/v1"
    
    # Secret Key for JWT
    # In production, this should be generated and stored securely
    SECRET_KEY: str = "your-super-secret-key-change-this-in-production" 
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # AI Keys
    GEMINI_API_KEY: Optional[str] = None
    
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:8000", "*"]

    # Database
    # Using Neon (PostgreSQL) - Defaulting to SQLite for safety if no URL is provided
    SQLALCHEMY_DATABASE_URI: str = "postgresql://user:password@hostname/dbname"
    DATABASE_URL: Optional[str] = None # Support for Neon/Vercel style env var

    @property
    def database_uri(self) -> str:
        if self.DATABASE_URL:
            # Handle "postgres://" vs "postgresql://" for SQLAlchemy
            return self.DATABASE_URL.replace("postgres://", "postgresql://", 1)
        return self.SQLALCHEMY_DATABASE_URI

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
