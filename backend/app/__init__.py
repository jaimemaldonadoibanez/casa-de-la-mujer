from flask import Flask
from flask_cors import CORS
from flasgger import Swagger
from config import Config
from app.routes.health import health_bp
from app.routes.complaints import complaints_bp
from app.routes.updates import updates_bp

def create_app():
    app=Flask(__name__)
    app.config.from_object(Config)
    CORS(app, origins=[app.config['FRONTEND_ORIGIN']], supports_credentials=True)
    app.config['SWAGGER']={'title':'Casa de la Mujer API','uiversion':3,'securityDefinitions':{'BearerAuth':{'type':'apiKey','name':'Authorization','in':'header','description':'Escribe: Bearer <access_token>'}}}
    Swagger(app)
    app.register_blueprint(health_bp)
    app.register_blueprint(complaints_bp)
    app.register_blueprint(updates_bp)
    return app
