
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.db.base import Base

class AIPrediction(Base):
    __tablename__ = "ai_predictions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    crop_type = Column(String)
    region = Column(String)
    soil_ph = Column(Float)
    rainfall_mm = Column(Float)
    temperature_c = Column(Float)
    predicted_yield = Column(Float)
    confidence_score = Column(Float)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
