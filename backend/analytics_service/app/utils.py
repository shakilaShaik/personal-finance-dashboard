# app/utils.py
import jwt
import os

SECRET_KEY = os.getenv("SECRET_KEY")
print("secret key is", SECRET_KEY)
ALGORITHM = "HS256"


def decode_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError as e:
        print(f"JWT decode failed: {str(e)}")
        return None  # Token expired
    except jwt.InvalidTokenError as e:
        print(f"JWT decode failed: {str(e)}")
        return None  # Token invalid
