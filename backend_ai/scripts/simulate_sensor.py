
import requests
import time
import random

# --- CONFIGURATION ---
BASE_URL = "http://localhost:8000/api/v1"
USERNAME = "testuser@example.com" # Use a user you registered
PASSWORD = "securepassword123"

def simulate_sensor():
    print("🚀 Starting AgroConnect Hardware Simulator...")
    
    # 1. Login to get Token
    try:
        login_resp = requests.post(
            f"{BASE_URL}/auth/login/access-token",
            data={"username": USERNAME, "password": PASSWORD}
        )
        token = login_resp.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}"}
        print("✅ Authenticated successfully.")
    except Exception as e:
        print(f"❌ Auth Failed: {e}. Make sure the server is running and user exists.")
        return

    # 2. Simulate Telemetry loop
    try:
        while True:
            # Simulated sensor data
            payload = {
                "device_id": "SOIL_SENSOR_X1",
                "soil_ph": round(random.uniform(5.5, 7.5), 1),
                "moisture": round(random.uniform(30.0, 60.0), 1),
                "temperature": round(random.uniform(20.0, 35.0), 1),
                "rainfall": round(random.uniform(0.0, 50.0), 1)
            }
            
            resp = requests.post(f"{BASE_URL}/iot/telemetry", json=payload, headers=headers)
            if resp.status_code == 200:
                print(f"📡 Data Sent: pH={payload['soil_ph']}, Moisture={payload['moisture']}%")
            else:
                print(f"⚠️ Failed to send data: {resp.text}")
            
            time.sleep(10) # Send every 10 seconds
            
    except KeyboardInterrupt:
        print("\n🛑 Simulator stopped.")

if __name__ == "__main__":
    simulate_sensor()
