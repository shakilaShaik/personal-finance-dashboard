from fastapi import Depends, HTTPException
from fastapi.security import APIKeyHeader
from app.utils import decode_token

api_key_header = APIKeyHeader(name="Authorization")


def get_current_user(token: str = Depends(api_key_header)):
    print(f"Authorization header received: {token}")
    if not token.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid token format")

    token = token.split("Bearer ")[1]
    payload = decode_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Token is invalid or expired")

    return {"user_id": payload.get("user_id")}
