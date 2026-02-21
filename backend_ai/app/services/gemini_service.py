
import google.generativeai as genai
from typing import Optional, List
from PIL import Image
from app.core.config import settings

class GeminiService:
    def __init__(self):
        if settings.GEMINI_API_KEY:
            genai.configure(api_key=settings.GEMINI_API_KEY)
            self.model = genai.GenerativeModel('gemini-1.5-flash')
        else:
            self.model = None

    async def get_agricultural_advice(self, sensor_data: dict, crop_type: str) -> str:
        """
        Uses Gemini to analyze sensor data and provide custom farming advice.
        """
        if not self.model:
            return "Gemini API Key not configured."

        prompt = f"""
        Role: You are 'AgroNexus Expert AI', a world-class agronomist and digital agriculture specialist.
        Context: You are analyzing real-time IoT sensor data from a {crop_type} farm.
        
        Sensor Input:
        - Soil pH: {sensor_data.get('soil_ph')} (Normal range for {crop_type}: 5.8-7.0)
        - Soil Moisture: {sensor_data.get('moisture')}%
        - Ambient temperature: {sensor_data.get('temperature')}°C
        - Rainfall/Precipitation: {sensor_data.get('rainfall')}mm

        Objective: 
        1. Analyze the current metrics against the optimal requirements for {crop_type}.
        2. Identify any immediate risks (e.g., waterlogging, nutrient lockout, heat stress).
        3. Provide 3 highly specific, technical, yet actionable recommendations for the farmer.
        4. Predict the impact on this season's yield if these steps are followed.

        Output Style: Professional, encouraging, and scientific. Use Markdown for clarity.
        """
        
        response = self.model.generate_content(prompt)
        return response.text

    async def detect_crop_disease(self, image_path: str) -> str:
        """
        Processes a farm image to detect pests or diseases.
        """
        if not self.model:
            return "Gemini API Key not configured."

        img = Image.open(image_path)
        prompt = """
        Role: You are 'AgroNexus Vision AI', a specialist in plant pathology and pest identification.
        Objective: Perform a comprehensive diagnostic analysis of the attached image.
        
        Instruction:
        1. Identify the crop species and current growth stage.
        2. Scan for visual symptoms of:
           - Fungal, bacterial, or viral infections.
           - Insect pest infestations.
           - Nutrient deficiencies (e.g., Nitrogen, Potassium).
        3. Diagnosis: Provide a clear name for the issue (or confirm the plant is healthy).
        4. Treatment Plan: Suggest organic and chemical solutions, including dosage if applicable.
        5. Prevention: How can the farmer avoid this in the future?

        Note: If the image is not related to agriculture, politely ask the user to upload a farm/crop photo.
        """
        
        response = self.model.generate_content([prompt, img])
        return response.text

gemini_service = GeminiService()
