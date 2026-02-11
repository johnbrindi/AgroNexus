import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
import joblib
import os

# Create dummy data
data = {
    'soil_ph': np.random.uniform(5.0, 8.0, 100),
    'rainfall_mm': np.random.uniform(200, 2000, 100),
    'temperature_c': np.random.uniform(15, 40, 100),
    'yield': np.random.uniform(2, 10, 100)
}

df = pd.DataFrame(data)

# Train a simple model
X = df[['soil_ph', 'rainfall_mm', 'temperature_c']]
y = df['yield']

model = LinearRegression()
model.fit(X, y)

# Ensure models directory exists
os.makedirs('models', exist_ok=True)

# Save the model
model_path = os.path.join('models', 'yield_model.pkl')
joblib.dump(model, model_path)

print(f"Dummy model saved to {model_path}")
