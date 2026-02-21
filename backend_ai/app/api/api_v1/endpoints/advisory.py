
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core import deps
from app.services.gemini_service import gemini_service
from app.models.telemetry import Telemetry

router = APIRouter()

@router.get("/smart-advice")
async def get_smart_advice(
    crop_type: str = "Maize",
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_active_user)
):
    """
    Uses AI to analyze the LATEST sensor data and provide expert advice.
    """
    latest_data = db.query(Telemetry).filter(Telemetry.user_id == current_user.id).order_by(Telemetry.timestamp.desc()).first()
    
    if not latest_data:
        raise HTTPException(status_code=400, detail="Cannot provide advice without sensor data. Please POST to /iot/telemetry first.")

    sensor_dict = {
        "soil_ph": latest_data.soil_ph,
        "moisture": latest_data.moisture,
        "temperature": latest_data.temperature,
        "rainfall": latest_data.rainfall
    }

    advice = await gemini_service.get_agricultural_advice(sensor_dict, crop_type)
    return {"crop": crop_type, "advice": advice, "timestamp": latest_data.timestamp}
