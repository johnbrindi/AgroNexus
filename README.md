# AgroConnect Monorepo

AgroConnect is an agricultural AI-powered mobile app built with Flutter and Python.

## Project Structure

- **mobile_app/**: Flutter application for Android/iOS.
    - `features/`: Contains UI screens (Auth, Dashboard, etc.).
    - `core/`: Themes and utilities.
- **backend_ai/**: Python FastAPI backend for AI services.
    - `api/`: API endpoints.
    - `training/`: Scripts to train AI models.
    - `models/`: Stores trained models (`.pkl`).

## Setup Instructions

### 1. Backend Setup (Python)

1. Navigate to the backend directory:
   ```bash
   cd backend_ai
   ```
2. Create and activate a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # Mac/Linux
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Generate the dummy AI model:
   ```bash
   python training/train_model.py
   ```
5. Run the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```
   The API will be available at `http://localhost:8000`.
   Review API documentation at `http://localhost:8000/docs`.

### 2. Mobile App Setup (Flutter)

1. Navigate to the mobile app directory:
   ```bash
   cd mobile_app
   ```
2. Install dependencies:
   ```bash
   flutter pub get
   ```
3. Configure Firebase (Required for Auth):
   - Create a project in [Firebase Console](https://console.firebase.google.com/).
   - Install FlutterFire CLI:
     ```bash
     dart pub global activate flutterfire_cli
     ```
   - Run configuration:
     ```bash
     flutterfire configure
     ```
   - This will regenerate `lib/firebase_options.dart` with your actual keys.
   - Uncomment the `await Firebase.initializeApp(...)` line in `lib/main.dart`.
4. Run the app:
   ```bash
   flutter run
   ```

## Connecting App to Backend

- The app is currently set up with placeholder UI.
- To connect to the Python backend, use the `http` package in Flutter.
- Example:
  ```dart
  import 'package:http/http.dart' as http;
  
  // Android emulator uses 10.0.2.2 to access host localhost
  final response = await http.get(Uri.parse('http://10.0.2.2:8000/predict/yield'));
  ```

## License

MIT
