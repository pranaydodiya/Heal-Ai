
# MediAI Backend - Disease Detection & Treatment Recommendation System

## Overview
This is a Python Flask backend for an AI-powered medical diagnosis and treatment recommendation system. It uses machine learning to analyze symptoms and provide disease predictions with treatment suggestions.

## Features
- **Symptom Analysis**: Natural language processing to analyze patient symptoms
- **Disease Prediction**: Machine learning models for disease classification
- **Treatment Recommendations**: Evidence-based treatment suggestions
- **Vital Signs Analysis**: Analysis of blood pressure, heart rate, temperature
- **Drug Interaction Checking**: Safety checks for medication combinations
- **Medical Image Analysis**: Computer vision for medical imaging (placeholder)

## Installation

### Prerequisites
- Python 3.8 or higher
- pip package manager

### Setup
1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the Flask application:
```bash
python app.py
```

The server will start on `http://localhost:5000`

## API Endpoints

### Disease Prediction
```
POST /api/predict
Content-Type: application/json

{
  "symptoms": "fever headache cough fatigue",
  "age": 30,
  "gender": "male"
}
```

Response:
```json
{
  "disease": "Common Cold",
  "confidence": 85.2,
  "symptoms_match": ["fever", "headache", "cough"],
  "recommendations": [
    "Rest and get plenty of sleep",
    "Drink lots of fluids",
    "Use over-the-counter pain relievers"
  ],
  "severity": "Mild"
}
```

### Health Check
```
GET /api/health
```

### Medical Image Analysis
```
POST /api/analyze-image
Content-Type: multipart/form-data

image: [medical image file]
```

### Drug Interaction Check
```
POST /api/check-interactions
Content-Type: application/json

{
  "medications": ["aspirin", "warfarin"]
}
```

## Machine Learning Models

### Symptom Analysis Model
- **Algorithm**: Naive Bayes with TF-IDF vectorization
- **Features**: Text-based symptom descriptions
- **Output**: Disease classification with confidence scores

### Treatment Recommendation Engine
- Rule-based system using medical knowledge database
- Considers disease type, severity, and patient demographics
- Provides medication suggestions and lifestyle recommendations

## Data Sources
The system uses curated medical datasets including:
- Symptom-disease mappings
- Treatment protocols
- Drug interaction databases
- Medical imaging datasets (for future implementation)

## Security & Privacy
- Patient data is not stored permanently
- All communications should use HTTPS in production
- Implement proper authentication and authorization
- Comply with HIPAA and other medical data regulations

## Disclaimer
This system is for educational and research purposes only. It should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers for medical decisions.

## Future Enhancements
- Integration with real medical databases
- Advanced deep learning models for image analysis
- Real-time vital signs monitoring
- Electronic health record integration
- Multi-language support
- Mobile app integration

## Development
To extend the system:
1. Add new disease patterns to the training data
2. Implement additional ML models in `models/medical_ai.py`
3. Add new API endpoints for specific medical functions
4. Integrate with external medical APIs and databases

## License
This project is for educational purposes. Consult legal requirements for medical software in your jurisdiction.
