
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# SQLite needs specifically ensure that the same thread is used 
# for the connection to be maintained
db_url = settings.database_uri
connect_args = {"check_same_thread": False} if "sqlite" in db_url else {}

engine = create_engine(
    db_url, connect_args=connect_args
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
