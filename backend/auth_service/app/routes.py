from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.exc import IntegrityError
from app.dbconnect import async_session
from app.schemas import UserRegister, UserLogin, ForgotUser
from app.models import User
from fastapi import Response, Request
from fastapi import Cookie
from app.utils import (
    hash_password,
    verify_password,
    create_access_token,
    decode_token,
    create_refresh_token,
)

from sqlalchemy import select
from app.deps import get_current_user

router = APIRouter(prefix="/auth")


async def get_db():
    async with async_session() as session:
        yield session


@router.get("/")
async def Hello():
    return "Hello from get "


@router.post("/register")
async def register(user: UserRegister, db=Depends(get_db)):
    stmt = select(User).where(User.email == user.email)
    result = await db.execute(stmt)
    existing_user = result.scalar_one_or_none()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already exists, please login.",
        )

    new_user = User(
        name=user.name, email=user.email, password=hash_password(user.password)
    )

    try:
        db.add(new_user)
        await db.commit()
        return {"msg": "User registered successfully"}
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create user.",
        )


@router.post("/login", status_code=200)
async def login(user: UserLogin, response: Response, db=Depends(get_db)):
    stmt = select(User).where(User.email == user.email)
    result = await db.execute(stmt)
    db_user = result.scalar_one_or_none()

    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token({"user_id": db_user.id})
    refresh_token = create_refresh_token({"user_id": db_user.id})

    response.set_cookie(
        httponly=True, key="access_token", value=access_token, secure=True
    )
    response.set_cookie(
        httponly=True, key="refresh_token", value=refresh_token, secure=True
    )

    return {
        "msg": "user login successfully",
        "access_token": access_token,
        "refresh_token": refresh_token,
    }


@router.post("/verify-token")
async def verify_token(token: str):
    payload = decode_token(token)
    if payload:
        return {"user_id": payload["user_id"]}
    raise HTTPException(status_code=401, detail="Invalid or expired token")


@router.post("/refresh-token")
async def refresh_token(request: Request, response: Response):
    refresh_token = request.cookies.get("refresh_token")
    if not refresh_token:
        raise HTTPException(status_code=401, detail="you are unauthorised")

    payload = decode_token(refresh_token)
    if not payload:
        raise HTTPException(
            status_code=401, detail="Session expired , you have to login"
        )

    new_access_token = create_access_token({"user_id": payload["user_id"]})
    response.set_cookie(key="access_token", value=new_access_token, httponly=True)
    return {"message": "access_Token refreshed successfully"}


@router.get("/get-user")
async def get_user(current_user: dict = Depends(get_current_user)):
    return {"message": "User retrieved", "user_id": current_user["user_id"]}


from fastapi import APIRouter, Response, Request

router = APIRouter()


@router.get("/logout")
async def logout(request: Request, response: Response):
    # Clear cookies or session data here if needed
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")

    # Example
    return {"message": "Logged out successfully"}


# @router.post('/forgot-password')
# async def get_update_password(request:Request):
#     forgot_user= request.body(name:ForgotUSer)
