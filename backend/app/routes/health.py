from flask import Blueprint, jsonify

health_bp = Blueprint("health", __name__)


@health_bp.get("/health")
def health():
    return jsonify({
        "status": "ok",
        "message": "API Casa de la Mujer funcionando"
    }), 200