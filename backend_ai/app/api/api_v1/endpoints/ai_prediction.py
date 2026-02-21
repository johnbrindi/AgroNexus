from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas import ai as schemas
from app.services.ai_service import ai_service
from app.core import deps

router = APIRouter()

@router.post("/predict/yield", response_model=schemas.YieldPredictionResponse)
def predict_yield(
    request: schemas.YieldPredictionRequest,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_active_user)
):
    """
    Predicts crop yield. Requires authentication.
    Stores the prediction history in the database.
    """
    return ai_service.predict_yield(db=db, request=request, user_id=current_user.id)
