# Casa de la Mujer — Actividad 04

Versión preparada para React + Vite + Supabase + Flask.

## 1. Configurar Supabase
1. Abre Supabase > SQL Editor.
2. Ejecuta `supabase/activity04_setup.sql`.
3. En Authentication > Providers, deja Email habilitado.
4. En Connect > React > Vite copia Project URL y Publishable Key.

## 2. Frontend
Copia `.env.example` como `.env` y reemplaza solo los valores:

```env
VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
VITE_API_URL=http://127.0.0.1:5000
```

Ejecuta:
```powershell
npm install
npm run dev
```

## 3. Backend Flask
En `backend`, copia `.env.example` como `.env` y usa la misma URL y Publishable Key. No uses service_role.

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python run.py
```

Prueba `http://127.0.0.1:5000/health`. Swagger queda en `http://127.0.0.1:5000/apidocs/`.

## 4. Evidencias para la rúbrica
- SQL Editor: tablas `profiles`, `complaints`, `case_updates`, `audit_logs`.
- Foreign keys y RLS habilitado.
- Políticas RLS por usuario y roles admin/super_admin.
- Trigger de auditoría de INSERT en complaints.
- Registro/login real y creación/listado de denuncias.
- `/health` y `/apidocs/` del backend Flask.
- Código modular por Blueprints (`health`, `complaints`, `updates`).
- Lighthouse del frontend.
- GitHub sin `.env` ni `venv`.
- Despliegue público y métricas de sostenibilidad (pendiente de ejecutar con la URL final).

## Seguridad
El frontend usa exclusivamente la Publishable Key. La seguridad de datos depende de Auth + RLS. Nunca publiques `service_role` ni archivos `.env`.
