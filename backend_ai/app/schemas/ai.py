
from pydantic import BaseModel, Field

class YieldPredictionRequest(BaseModel):
    crop_type: str = Field(..., example="Maize", description="Type of crop for prediction")
    region: str = Field(..., example="North Region", description="Geographic region of the farm")
    soil_ph: float = Field(..., example=6.5, ge=0, le=14, description="Soil pH level (0-14)")
    rainfall_mm: float = Field(..., example=1200, ge=0, description="Annual rainfall in mm")
    temperature_c: float = Field(..., example=28, description="Average temperature in Celsius")

class YieldPredictionResponse(BaseModel):
    predicted_yield_tonnes_per_hectare: float = Field(..., example=4.5)
    confidence_score: float = Field(..., example=0.85, description="Confidence score of the AI model (0-1)")
