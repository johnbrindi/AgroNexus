from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import numpy as np
import joblib
import os

app = FastAPI(title="AgroConnect AI Backend", version="1.0.0")

# --- Data Models ---
class YieldPredictionRequest(BaseModel):
    crop_type: str
    region: str
    soil_ph: float
    rainfall_mm: float
    temperature_c: float

class YieldPredictionResponse(BaseModel):
    predicted_yield_tonnes_per_hectare: float
    confidence_score: float

# --- Mock Model Loading (Replace with actual model loading logic) ---
# In a real scenario, you would load a trained model from the 'models' directory.
# model = joblib.load("models/yield_model.pkl")

@app.get("/")
def read_root():
    return {"message": "Welcome to AgroConnect AI Backend"}

@app.post("/predict/yield", response_model=YieldPredictionResponse)
def predict_yield(request: YieldPredictionRequest):
    """
    Predicts crop yield based on environmental factors.
    This is a mock implementation using simple logic for demonstration.
    """
    try:
        # Simulate prediction logic
        # In reality, you would prepare the dataframe and pass it to the model.
        # input_data = pd.DataFrame([request.dict()])
        # prediction = model.predict(input_data)
        
        # specific dummy logic
        base_yield = 5.0 # default tonnes/ha
        
        # Adjust based on simple heuristics
        if request.soil_ph < 5.5 or request.soil_ph > 7.5:
            base_yield *= 0.8
        
        if request.rainfall_mm < 500:
            base_yield *= 0.6
        elif request.rainfall_mm > 2000:
             base_yield *= 0.9 # risk of flooding
             
        if request.temperature_c > 35:
            base_yield *= 0.7

        # Add some random variation
        final_yield = base_yield * (1 + np.random.uniform(-0.1, 0.1))
        
        return YieldPredictionResponse(
            predicted_yield_tonnes_per_hectare=round(final_yield, 2),
            confidence_score=0.85 
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
