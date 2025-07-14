from fastapi import APIRouter, Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from backend.analytics_service.app.dbconnect import async_session
from app.models import DailyLog
from app.schemas import DailyLogCreate
from app.utils import get_user_id_from_token


router = APIRouter()


async def get_db():
    async with async_session as session:
        yield session
