import jwt
import datetime
from app import bcrypt

def hash_password(password):
    return bcrypt.generate_password_hash(password).decode('utf-8')

def check_password_hash(password, hashed_password):
    return bcrypt.check_password_hash(hashed_password, password)

def create_token(user_id):
    payload = {
        'sub': user_id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }
    token = jwt.encode(payload, 'secretkey', algorithm='HS256')
    return token
