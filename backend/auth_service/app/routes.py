from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.exc import IntegrityError
from app.dbconnect import async_session
from app.schemas import UserRegister, UserLogin
from app.models import User
from app.utils import hash_password, verify_password, create_access_token
from sqlalchemy import select


router = APIRouter()


async def get_db():
    async with async_session() as session:
        yield session


@router.get("/")
async def Hello():
    return "Hello from get "


@router.post("/register")
async def register(user: UserRegister, db: async_session = Depends(get_db)):
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


@router.post("/login")
async def login(user: UserLogin, db: async_session = Depends(get_db)):
    stmt = select(User).where(User.email == user.email)
    result = await db.execute(stmt)
    db_user = result.scalar_one_or_none()

    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found , please register",
        )
    if not verify_password(user.password, db_user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail=" incorrect password"
        )
    token = create_access_token({"user_id": db_user.id})
    return {
        "access_token": token,
        "token_type": "bearer",
        "message": "Login successful",
    }
