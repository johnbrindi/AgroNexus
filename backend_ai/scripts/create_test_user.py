import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.user import User
from app.core import security

def create_test_user():
    db = SessionLocal()
    try:
        email = "testuser@example.com"
        password = "securepassword123"
        
        user = db.query(User).filter(User.email == email).first()
        if user:
            print(f"ℹ️ User {email} already exists.")
            return

        db_user = User(
            email=email,
            hashed_password=security.get_password_hash(password),
            full_name="Test User",
            role="farmer",
            is_active=True
        )
        db.add(db_user)
        db.commit()
        print(f"✅ Successfully created test user: {email}")
        print(f"🔑 Password: {password}")
    except Exception as e:
        print(f"❌ Error creating user: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    create_test_user()
