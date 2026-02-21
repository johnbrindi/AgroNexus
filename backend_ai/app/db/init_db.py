
import logging

from app.db.base import Base
from app.db.session import engine
from app.core.config import settings

# Importance: Import all models here so that Base.metadata.create_all(bind=engine) 
# knows about all the tables we want to create.
from app.models.user import User
from app.models.ai import AIPrediction

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def init_db():
    logger.info("Creating initial data")
    Base.metadata.create_all(bind=engine)
    logger.info("Initial data created")

if __name__ == "__main__":
    init_db()
