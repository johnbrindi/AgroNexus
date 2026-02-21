
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.db.base import Base

class Telemetry(Base):
    __tablename__ = "telemetry"

    id = Column(Integer, primary_key=True, index=True)
    device_id = Column(String, index=True) # ID of the physical sensor
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    soil_ph = Column(Float, nullable=True)
    moisture = Column(Float, nullable=True)
    temperature = Column(Float, nullable=True)
    rainfall = Column(Float, nullable=True)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
