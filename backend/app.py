
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
import joblib
import os

app = Flask(__name__)
CORS(app)

# Disease prediction model
class DiseasePredictor:
    def __init__(self):
        self.model = None
        self.vectorizer = None
        self.is_trained = False
        self.train_model()
    
    def train_model(self):
        # Sample training data (in real scenario, this would be a large medical dataset)
        symptoms_data = [
            "fever headache cough", "Common Cold",
            "chest pain shortness of breath", "Heart Disease", 
            "fever cough fatigue body aches", "Flu",
            "persistent cough weight loss fever", "Tuberculosis",
            "high blood pressure dizziness", "Hypertension",
            "frequent urination excessive thirst", "Diabetes",
            "severe headache nausea vomiting", "Migraine",
            "joint pain swelling stiffness", "Arthritis",
            "stomach pain nausea diarrhea", "Gastroenteritis",
            "skin rash itching redness", "Allergic Reaction"
        ]
        
        # Create dataset
        symptoms = []
        diseases = []
        
        for i in range(0, len(symptoms_data), 2):
            symptoms.append(symptoms_data[i])
            diseases.append(symptoms_data[i + 1])
        
        # Create pipeline with TF-IDF and Naive Bayes
        self.pipeline = Pipeline([
            ('tfidf', TfidfVectorizer(stop_words='english')),
            ('classifier', MultinomialNB())
        ])
        
        # Train the model
        self.pipeline.fit(symptoms, diseases)
        self.is_trained = True
    
    def predict(self, symptoms_text, age=None, gender=None):
        if not self.is_trained:
            return None
        
        # Predict disease
        predicted_disease = self.pipeline.predict([symptoms_text])[0]
        
        # Get prediction probability
        probabilities = self.pipeline.predict_proba([symptoms_text])[0]
        confidence = max(probabilities) * 100
        
        # Extract symptoms from text
        symptoms_words = symptoms_text.lower().split()
        
        # Generate recommendations based on predicted disease
        recommendations = self.get_recommendations(predicted_disease)
        
        # Determine severity
        severity = self.determine_severity(predicted_disease, confidence)
        
        return {
            'disease': predicted_disease,
            'confidence': round(confidence, 1),
            'symptoms_match': symptoms_words[:3],  # Top 3 symptoms
            'recommendations': recommendations,
            'severity': severity
        }
    
    def get_recommendations(self, disease):
        recommendations_map = {
            'Common Cold': [
                'Rest and get plenty of sleep',
                'Drink lots of fluids',
                'Use over-the-counter pain relievers',
                'Gargle with salt water'
            ],
            'Flu': [
                'Rest and avoid contact with others',
                'Drink plenty of fluids',
                'Take antiviral medication if prescribed',
                'Use fever reducers as needed'
            ],
            'Heart Disease': [
                'Seek immediate medical attention',
                'Take prescribed heart medications',
                'Follow a heart-healthy diet',
                'Exercise as recommended by doctor'
            ],
            'Diabetes': [
                'Monitor blood sugar regularly',
                'Follow diabetic diet plan',
                'Take prescribed medications',
                'Exercise regularly'
            ],
            'Hypertension': [
                'Monitor blood pressure daily',
                'Reduce sodium intake',
                'Exercise regularly',
                'Take prescribed medications'
            ]
        }
        
        return recommendations_map.get(disease, [
            'Consult with a healthcare professional',
            'Monitor symptoms closely',
            'Maintain healthy lifestyle',
            'Seek medical attention if symptoms worsen'
        ])
    
    def determine_severity(self, disease, confidence):
        high_severity_diseases = ['Heart Disease', 'Tuberculosis']
        
        if disease in high_severity_diseases or confidence > 90:
            return 'High'
        elif confidence > 70:
            return 'Moderate'
        else:
            return 'Mild'

# Initialize the disease predictor
predictor = DiseasePredictor()

@app.route('/api/predict', methods=['POST'])
def predict_disease():
    try:
        data = request.json
        symptoms = data.get('symptoms', '')
        age = data.get('age')
        gender = data.get('gender')
        
        if not symptoms:
            return jsonify({'error': 'Symptoms are required'}), 400
        
        # Get prediction
        result = predictor.predict(symptoms, age, gender)
        
        if result is None:
            return jsonify({'error': 'Model not trained'}), 500
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'model_trained': predictor.is_trained})

# Medical image analysis endpoint (placeholder)
@app.route('/api/analyze-image', methods=['POST'])
def analyze_image():
    try:
        # In a real implementation, this would use computer vision models
        # like TensorFlow/Keras for medical image analysis
        
        return jsonify({
            'analysis': 'Normal chest X-ray',
            'confidence': 78.5,
            'findings': ['No acute abnormalities detected'],
            'recommendations': ['Routine follow-up recommended']
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Drug interaction checker
@app.route('/api/check-interactions', methods=['POST'])
def check_drug_interactions():
    try:
        data = request.json
        medications = data.get('medications', [])
        
        # Mock drug interaction data
        interactions = []
        if len(medications) > 1:
            interactions = [
                {
                    'drug1': medications[0],
                    'drug2': medications[1], 
                    'severity': 'Moderate',
                    'description': 'May increase risk of side effects'
                }
            ]
        
        return jsonify({
            'interactions': interactions,
            'safe': len(interactions) == 0
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
