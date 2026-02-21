
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class TelemetryCreate(BaseModel):
    device_id: str = Field(..., example="SOIL_001")
    soil_ph: Optional[float] = Field(None, example=6.5)
    moisture: Optional[float] = Field(None, example=45.0)
    temperature: Optional[float] = Field(None, example=24.5)
    rainfall: Optional[float] = Field(None, example=0.0)

class Telemetry(TelemetryCreate):
    id: int
    user_id: int
    timestamp: datetime

    class Config:
        from_attributes = True
