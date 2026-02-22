
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy import inspect
from app.db.session import engine
from app.db.base import Base

def check_db():
    print("🔍 Checking Database Connection...")
    try:
        inspector = inspect(engine)
        tables = inspector.get_table_names()
        print(f"✅ Connection successful!")
        print(f"📊 Tables found: {tables}")
        
        required_tables = ["users", "telemetry", "ai_predictions"]
        missing = [t for t in required_tables if t not in tables]
        
        if missing:
            print(f"❌ Missing tables: {missing}")
        else:
            print("🚀 All required tables are present!")
            
    except Exception as e:
        print(f"❌ Connection failed: {e}")

if __name__ == "__main__":
    check_db()
