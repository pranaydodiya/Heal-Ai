
from flask import Blueprint, request, jsonify
from api.advanced_ml import AdvancedMedicalAI

assessment_bp = Blueprint('assessment', __name__)

# Initialize advanced AI system (singleton pattern)
advanced_ai = AdvancedMedicalAI()

@assessment_bp.route('/api/risk-assessment', methods=['POST'])
def risk_assessment():
    try:
        data = request.json
        patient_data = {
            'age': data.get('age', 30),
            'symptoms': data.get('symptoms', ''),
            'medical_history': data.get('medical_history', ''),
            'gender': data.get('gender', 'unknown')
        }
        
        risks = advanced_ai.risk_stratification(patient_data)
        
        return jsonify({
            'risk_scores': risks,
            'assessment_date': advanced_ai.models.get('saved_at', 'Unknown'),
            'recommendations': [
                'Regular health screenings based on age and risk factors',
                'Maintain healthy lifestyle habits',
                'Monitor symptoms and seek medical care when needed',
                'Follow preventive care guidelines'
            ]
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@assessment_bp.route('/api/model-performance', methods=['GET'])
def model_performance():
    try:
        if not advanced_ai.is_trained:
            advanced_ai.train_ensemble_models()
        
        return jsonify({
            'model_performance': advanced_ai.model_performance,
            'models_available': list(advanced_ai.models.keys()),
            'training_status': 'Trained' if advanced_ai.is_trained else 'Not Trained',
            'last_updated': advanced_ai.models.get('saved_at', 'Unknown')
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
