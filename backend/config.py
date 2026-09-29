import os
from dotenv import load_dotenv
load_dotenv()

class Config:
    SUPABASE_URL = os.getenv('SUPABASE_URL', '').rstrip('/')
    SUPABASE_PUBLISHABLE_KEY = os.getenv('SUPABASE_PUBLISHABLE_KEY', '')
    FRONTEND_ORIGIN = os.getenv('FRONTEND_ORIGIN', 'http://localhost:5173')
