import requests
from flask import current_app

def _headers(user_token, prefer=None):
    headers = {
        'apikey': current_app.config['SUPABASE_PUBLISHABLE_KEY'],
        'Authorization': f'Bearer {user_token}',
        'Content-Type': 'application/json',
    }
    if prefer: headers['Prefer'] = prefer
    return headers

def request(method, table, user_token, params=None, json=None, prefer=None):
    url = f"{current_app.config['SUPABASE_URL']}/rest/v1/{table}"
    response = requests.request(method, url, headers=_headers(user_token, prefer), params=params, json=json, timeout=15)
    if response.status_code >= 400:
        try: detail = response.json()
        except ValueError: detail = {'message': response.text}
        return None, detail, response.status_code
    if not response.content: return None, None, response.status_code
    return response.json(), None, response.status_code
