from fastapi import APIRouter, Depends, Request, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.dbconnect import async_session
from app.models import DailyLog
from app.schemas import DailyLogCreate
from app.utils import get_user_id_from_token


router = APIRouter()


async def get_db():
    async with async_session() as session:
        yield session


@router.post("/log")
async def create_daily_log(
    payload: DailyLogCreate, request: Request, db: AsyncSession = Depends(get_db)
):
    user_id = get_user_id_from_token(request)

    stmt = select(DailyLog).where(
        DailyLog.user_id == user_id, DailyLog.log_date == payload.log_date
    )
    existing_log = (await db.execute(stmt)).scalar_one_or_none()

    if existing_log:
        raise HTTPException(status_code=400, detail="Log already exists, update it.")

    new_log = DailyLog(user_id=user_id, **payload.dict())
    db.add(new_log)
    await db.commit()
    return {"msg": "Today's log created successfully"}
