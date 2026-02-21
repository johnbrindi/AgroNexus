from fastapi import APIRouter, Depends, File, UploadFile
import os
import shutil
from app.services.gemini_service import gemini_service

@router.post("/detect-disease")
async def detect_disease(
    file: UploadFile = File(...),
    current_user = Depends(deps.get_current_active_user)
):
    """
    Upload an image of a crop to detect diseases using Gemini AI.
    """
    # Ensure temp directory exists
    os.makedirs("temp_uploads", exist_ok=True)
    file_path = f"temp_uploads/{file.filename}"
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    try:
        diagnosis = await gemini_service.detect_crop_disease(file_path)
        return {"diagnosis": diagnosis}
    finally:
        # Clean up
        if os.path.exists(file_path):
            os.remove(file_path)

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
