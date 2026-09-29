from flask import Blueprint, jsonify, request
from app.services.supabase_rest import request as sb_request

complaints_bp = Blueprint('complaints', __name__, url_prefix='/api/complaints')

def token():
    value=request.headers.get('Authorization','')
    return value[7:] if value.startswith('Bearer ') else None

def unauthorized(): return jsonify({'error':'Bearer token requerido'}),401

@complaints_bp.get('')
def list_complaints():
    """Listar denuncias visibles según RLS
    ---
    tags: [Complaints]
    security: [{BearerAuth: []}]
    responses: {200: {description: Lista de denuncias}, 401: {description: No autenticado}}
    """
    t=token()
    if not t:return unauthorized()
    data,error,status=sb_request('GET','complaints',t,params={'select':'*','order':'created_at.desc'})
    return jsonify(error or data),status

@complaints_bp.post('')
def create_complaint():
    """Crear denuncia
    ---
    tags: [Complaints]
    security: [{BearerAuth: []}]
    responses: {201: {description: Denuncia creada}, 400: {description: Datos inválidos}}
    """
    t=token()
    if not t:return unauthorized()
    body=request.get_json(silent=True) or {}
    required=('user_id','type','description')
    if any(not body.get(k) for k in required): return jsonify({'error':'user_id, type y description son obligatorios'}),400
    if len(body['description'].strip())<20 or len(body['description'])>1000:return jsonify({'error':'description debe tener entre 20 y 1000 caracteres'}),400
    clean={k:body.get(k) for k in ('user_id','type','description','incident_date','status') if body.get(k) is not None}
    clean['description']=clean['description'].strip()
    data,error,status=sb_request('POST','complaints',t,json=clean,prefer='return=representation')
    return jsonify(error or data), (201 if status in (200,201) else status)

@complaints_bp.get('/<complaint_id>')
def get_complaint(complaint_id):
    """Consultar una denuncia por UUID
    ---
    tags: [Complaints]
    security: [{BearerAuth: []}]
    responses: {200: {description: Denuncia}, 404: {description: No encontrada}}
    """
    t=token()
    if not t:return unauthorized()
    data,error,status=sb_request('GET','complaints',t,params={'id':f'eq.{complaint_id}','select':'*'})
    if error:return jsonify(error),status
    return (jsonify(data[0]),200) if data else (jsonify({'error':'No encontrada'}),404)

@complaints_bp.patch('/<complaint_id>')
def update_complaint(complaint_id):
    """Actualizar estado de una denuncia (admin/super_admin por RLS)
    ---
    tags: [Complaints]
    security: [{BearerAuth: []}]
    responses: {200: {description: Actualizada}, 401: {description: No autenticado}}
    """
    t=token()
    if not t:return unauthorized()
    body=request.get_json(silent=True) or {}
    clean={k:body[k] for k in ('status',) if k in body}
    if not clean:return jsonify({'error':'No hay campos permitidos'}),400
    data,error,status=sb_request('PATCH','complaints',t,params={'id':f'eq.{complaint_id}'},json=clean,prefer='return=representation')
    return jsonify(error or data),status

@complaints_bp.delete('/<complaint_id>')
def delete_complaint(complaint_id):
    """Eliminar denuncia (solo si una política RLS lo permite)
    ---
    tags: [Complaints]
    security: [{BearerAuth: []}]
    responses: {204: {description: Eliminada o sin filas visibles}}
    """
    t=token()
    if not t:return unauthorized()
    _,error,status=sb_request('DELETE','complaints',t,params={'id':f'eq.{complaint_id}'})
    return (jsonify(error),status) if error else ('',204)
