import numpy as np
from sqlalchemy.orm import Session
from app.schemas import ai as schemas
from app.models.ai import AIPrediction

class AIService:
    @staticmethod
    def predict_yield(db: Session, request: schemas.YieldPredictionRequest, user_id: int) -> schemas.YieldPredictionResponse:
        """
        Predicts crop yield and stores the result in the database.
        """
        # specific dummy logic
        base_yield = 5.0
        
        if request.soil_ph < 5.5 or request.soil_ph > 7.5:
            base_yield *= 0.8
        if request.rainfall_mm < 500:
            base_yield *= 0.6
        elif request.rainfall_mm > 2000:
             base_yield *= 0.9
        if request.temperature_c > 35:
            base_yield *= 0.7

        final_yield = base_yield * (1 + np.random.uniform(-0.1, 0.1))
        
        # Create DB record
        db_prediction = AIPrediction(
            user_id=user_id,
            crop_type=request.crop_type,
            region=request.region,
            soil_ph=request.soil_ph,
            rainfall_mm=request.rainfall_mm,
            temperature_c=request.temperature_c,
            predicted_yield=round(final_yield, 2),
            confidence_score=0.85
        )
        db.add(db_prediction)
        db.commit()
        db.refresh(db_prediction)
        
        return schemas.YieldPredictionResponse(
            predicted_yield_tonnes_per_hectare=db_prediction.predicted_yield,
            confidence_score=db_prediction.confidence_score
        )

ai_service = AIService()
