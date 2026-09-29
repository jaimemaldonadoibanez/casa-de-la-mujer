from flask import Blueprint, jsonify, request
from app.services.supabase_rest import request as sb_request
updates_bp=Blueprint('updates',__name__,url_prefix='/api/case-updates')
def token():
 v=request.headers.get('Authorization','');return v[7:] if v.startswith('Bearer ') else None
@updates_bp.get('/<complaint_id>')
def list_updates(complaint_id):
 """Listar seguimiento de una denuncia
 ---
 tags: [Case Updates]
 security: [{BearerAuth: []}]
 responses: {200: {description: Actualizaciones}}
 """
 t=token()
 if not t:return jsonify({'error':'Bearer token requerido'}),401
 data,error,status=sb_request('GET','case_updates',t,params={'complaint_id':f'eq.{complaint_id}','select':'*','order':'created_at.asc'})
 return jsonify(error or data),status
@updates_bp.post('')
def create_update():
 """Crear seguimiento (admin/super_admin por RLS)
 ---
 tags: [Case Updates]
 security: [{BearerAuth: []}]
 responses: {201: {description: Actualización creada}}
 """
 t=token();body=request.get_json(silent=True) or {}
 if not t:return jsonify({'error':'Bearer token requerido'}),401
 if not all(body.get(k) for k in ('complaint_id','created_by','comment')):return jsonify({'error':'Faltan campos'}),400
 data,error,status=sb_request('POST','case_updates',t,json={k:body[k] for k in ('complaint_id','created_by','comment')},prefer='return=representation')
 return jsonify(error or data),(201 if status in (200,201) else status)
