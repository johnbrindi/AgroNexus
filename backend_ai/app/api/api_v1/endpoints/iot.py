
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.api_v1.endpoints import auth
from app.core import deps
from app.models.telemetry import Telemetry
from app.schemas import telemetry as schemas

router = APIRouter()

@router.post("/telemetry", response_model=schemas.Telemetry)
def post_telemetry(
    *,
    db: Session = Depends(deps.get_db),
    data_in: schemas.TelemetryCreate,
    current_user = Depends(deps.get_current_active_user)
):
    """
    Endpoint for hardware sensors (IoT) to POST telemetry data.
    """
    db_telemetry = Telemetry(
        **data_in.model_dump(),
        user_id=current_user.id
    )
    db.add(db_telemetry)
    db.commit()
    db.refresh(db_telemetry)
    return db_telemetry

@router.get("/telemetry/latest", response_model=schemas.Telemetry)
def get_latest_telemetry(
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_active_user)
):
    """
    Retrieve the most recent sensor data for the logged-in user.
    """
    latest = db.query(Telemetry).filter(Telemetry.user_id == current_user.id).order_by(Telemetry.timestamp.desc()).first()
    if not latest:
        raise HTTPException(status_code=404, detail="No telemetry data found")
    return latest
