
"""
Core Medical AI Models and Utilities
"""

import numpy as np
import pandas as pd
from sklearn.base import BaseEstimator, ClassifierMixin
from sklearn.utils.validation import check_X_y, check_array
from sklearn.utils.multiclass import unique_labels
import warnings
warnings.filterwarnings('ignore')

class MedicalClassifier(BaseEstimator, ClassifierMixin):
    """
    Custom medical condition classifier with domain-specific features
    """
    
    def __init__(self, model_type='ensemble'):
        self.model_type = model_type
        self.classes_ = None
        self.feature_names_ = None
        
    def fit(self, X, y):
        """Fit the medical classifier"""
        # Check that X and y have correct shape
        X, y = check_X_y(X, y, accept_sparse=True)
        
        # Store the classes seen during fit
        self.classes_ = unique_labels(y)
        
        # Store feature names if available
        if hasattr(X, 'columns'):
            self.feature_names_ = X.columns.tolist()
        
        # Simple medical condition mapping for demo
        self.condition_mapping_ = {
            'fever': 'Viral Infection',
            'cough': 'Respiratory Issue',
            'chest_pain': 'Cardiac Concern',
            'headache': 'Neurological',
            'fatigue': 'General Malaise'
        }
        
        # Return the classifier
        return self
    
    def predict(self, X):
        """Predict medical conditions"""
        # Check is fit had been called
        # Input validation
        X = check_array(X, accept_sparse=True)
        
        # Simple prediction logic for demo
        n_samples = X.shape[0]
        predictions = np.random.choice(self.classes_, n_samples)
        
        return predictions
    
    def predict_proba(self, X):
        """Predict class probabilities"""
        X = check_array(X, accept_sparse=True)
        n_samples = X.shape[0]
        n_classes = len(self.classes_)
        
        # Random probabilities for demo (in real scenario, use trained model)
        probabilities = np.random.dirichlet(np.ones(n_classes), n_samples)
        
        return probabilities

class SymptomProcessor:
    """Process and analyze medical symptoms"""
    
    def __init__(self):
        self.symptom_categories = {
            'respiratory': ['cough', 'shortness of breath', 'chest pain', 'wheezing'],
            'neurological': ['headache', 'dizziness', 'confusion', 'seizure'],
            'gastrointestinal': ['nausea', 'vomiting', 'diarrhea', 'abdominal pain'],
            'cardiovascular': ['chest pain', 'palpitations', 'edema', 'syncope'],
            'general': ['fever', 'fatigue', 'weight loss', 'malaise']
        }
    
    def categorize_symptoms(self, symptom_text):
        """Categorize symptoms into medical domains"""
        symptom_text = symptom_text.lower()
        categories = {}
        
        for category, symptoms in self.symptom_categories.items():
            count = sum(1 for symptom in symptoms if symptom in symptom_text)
            if count > 0:
                categories[category] = count
        
        return categories
    
    def extract_features(self, symptom_text):
        """Extract medical features from symptom description"""
        features = {
            'symptom_count': len(symptom_text.split()),
            'severity_indicators': sum(1 for word in ['severe', 'intense', 'extreme'] if word in symptom_text.lower()),
            'duration_mentioned': any(word in symptom_text.lower() for word in ['days', 'weeks', 'months']),
            'categories': self.categorize_symptoms(symptom_text)
        }
        
        return features

class TreatmentRecommender:
    """Generate treatment recommendations based on conditions"""
    
    def __init__(self):
        self.treatment_protocols = {
            'Common Cold': {
                'first_line': ['Rest', 'Hydration', 'Symptomatic care'],
                'second_line': ['Decongestants', 'Cough suppressants'],
                'monitoring': ['Temperature', 'Symptom progression']
            },
            'Influenza': {
                'first_line': ['Antiviral medications', 'Rest', 'Isolation'],
                'second_line': ['Supportive care', 'Fever management'],
                'monitoring': ['Respiratory status', 'Complications']
            },
            'Heart Disease': {
                'first_line': ['Cardiac medications', 'Lifestyle modifications'],
                'second_line': ['Interventional procedures', 'Surgery'],
                'monitoring': ['Cardiac function', 'Blood pressure', 'Symptoms']
            }
        }
    
    def get_recommendations(self, condition, severity='moderate', patient_factors=None):
        """Get treatment recommendations for a condition"""
        if patient_factors is None:
            patient_factors = {}
        
        base_protocol = self.treatment_protocols.get(condition, {
            'first_line': ['Consult healthcare provider'],
            'second_line': ['Symptomatic treatment'],
            'monitoring': ['General health status']
        })
        
        # Adjust recommendations based on severity and patient factors
        recommendations = {
            'immediate_care': base_protocol.get('first_line', []),
            'ongoing_treatment': base_protocol.get('second_line', []),
            'monitoring_plan': base_protocol.get('monitoring', []),
            'lifestyle_modifications': self._get_lifestyle_recommendations(condition),
            'follow_up': self._get_followup_schedule(condition, severity)
        }
        
        return recommendations
    
    def _get_lifestyle_recommendations(self, condition):
        """Get lifestyle recommendations for condition"""
        general_recs = ['Maintain healthy diet', 'Regular exercise', 'Adequate sleep']
        
        condition_specific = {
            'Heart Disease': ['Low sodium diet', 'Cardiac rehabilitation', 'Stress management'],
            'Diabetes': ['Blood sugar monitoring', 'Diabetic diet', 'Weight management'],
            'Hypertension': ['DASH diet', 'Regular blood pressure monitoring', 'Reduce alcohol']
        }
        
        return general_recs + condition_specific.get(condition, [])
    
    def _get_followup_schedule(self, condition, severity):
        """Determine follow-up schedule"""
        if severity == 'high':
            return 'Follow-up in 24-48 hours'
        elif severity == 'moderate':
            return 'Follow-up in 1-2 weeks'
        else:
            return 'Follow-up as needed or if symptoms worsen'
