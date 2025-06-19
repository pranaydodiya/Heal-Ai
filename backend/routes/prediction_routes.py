
from flask import Blueprint, request, jsonify
from api.advanced_ml import AdvancedMedicalAI

prediction_bp = Blueprint('prediction', __name__)

# Initialize advanced AI system (singleton pattern)
advanced_ai = AdvancedMedicalAI()

@prediction_bp.route('/api/advanced-predict', methods=['POST'])
def advanced_predict():
    try:
        data = request.json
        symptoms = data.get('symptoms', '')
        age = data.get('age', 30)
        gender = data.get('gender', 'Adult')
        
        if not symptoms:
            return jsonify({'error': 'Symptoms are required'}), 400
        
        # Determine age group
        age_num = int(age) if age else 30
        if age_num >= 65:
            age_group = 'Senior'
        elif age_num >= 18:
            age_group = 'Adult'
        else:
            age_group = 'Youth'
        
        # Get ensemble prediction
        prediction_result = advanced_ai.ensemble_predict(
            symptoms, 
            age_group=age_group, 
            severity_hint='Moderate'
        )
        
        # Get advanced recommendations
        recommendations = advanced_ai.get_advanced_recommendations(
            prediction_result['ensemble_prediction'],
            'Moderate',
            age_group
        )
        
        # Risk assessment
        patient_data = {'age': age_num, 'symptoms': symptoms}
        risk_scores = advanced_ai.risk_stratification(patient_data)
        
        response = {
            'disease': prediction_result['ensemble_prediction'],
            'confidence': prediction_result['confidence'],
            'model_agreement': prediction_result['model_agreement'],
            'individual_predictions': prediction_result['individual_predictions'],
            'individual_confidences': prediction_result['individual_confidences'],
            'recommendations': recommendations,
            'risk_assessment': risk_scores,
            'severity': 'High' if prediction_result['confidence'] > 85 else 'Moderate' if prediction_result['confidence'] > 70 else 'Mild'
        }
        
        return jsonify(response)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@prediction_bp.route('/api/treatment-protocol', methods=['POST'])
def treatment_protocol():
    try:
        data = request.json
        disease = data.get('disease', '')
        severity = data.get('severity', 'Moderate')
        age_group = data.get('age_group', 'Adult')
        
        if not disease:
            return jsonify({'error': 'Disease is required'}), 400
        
        protocol = advanced_ai.get_advanced_recommendations(disease, severity, age_group)
        
        return jsonify({
            'disease': disease,
            'severity': severity,
            'age_group': age_group,
            'treatment_protocol': protocol,
            'generated_at': advanced_ai.models.get('saved_at', 'Unknown')
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
