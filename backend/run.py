
import sys
import os

# Add the current directory to Python path
sys.path.append(os.path.dirname(__file__))

from app_factory import create_app
from api.advanced_ml import AdvancedMedicalAI

def initialize_ai_system():
    """Initialize AI models on startup"""
    print("Training AI models (this may take a moment)...")
    try:
        advanced_ai = AdvancedMedicalAI()
        advanced_ai.train_ensemble_models()
        print("✓ AI models trained successfully")
        return True
    except Exception as e:
        print(f"⚠ Warning: Could not train models - {e}")
        return False

if __name__ == '__main__':
    print("Starting Advanced MediAI Backend...")
    
    # Initialize models on startup
    initialize_ai_system()
    
    # Create Flask app
    app = create_app('development')
    
    print("🚀 Advanced MediAI Backend running on http://localhost:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)
