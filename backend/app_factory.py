
from flask import Flask
from flask_cors import CORS
import os
from config import config

def create_app(config_name=None):
    """Application factory pattern"""
    if config_name is None:
        config_name = os.environ.get('FLASK_ENV', 'default')
    
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    
    # Initialize extensions
    CORS(app)
    
    # Register blueprints
    from routes.prediction_routes import prediction_bp
    from routes.assessment_routes import assessment_bp
    from routes.analytics_routes import analytics_bp
    
    app.register_blueprint(prediction_bp)
    app.register_blueprint(assessment_bp)
    app.register_blueprint(analytics_bp)
    
    return app
