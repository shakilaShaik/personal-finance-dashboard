from fastapi import Request, HTTPException

import jwt
import os

SECRET_KEY = os.getenv("SECRET_KEY")


def get_user_id_from_token(request: Request):
    token = request.cookies.get("access_token")

    if not token:
        raise HTTPException(status_code=401, detail="Access token missing")

    # Strip "Bearer " if present
    if token.startswith("Bearer "):
        token = token.split(" ")[1]

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=["HS256"],
        )
        return payload.get("user_id")

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Access token expired")

    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid access token")
