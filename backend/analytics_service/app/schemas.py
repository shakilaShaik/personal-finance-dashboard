from pydantic import BaseModel
from datetime import date
from uuid import UUID


class DailyLogCreate(BaseModel):
    date: date
    income: float
    food: float
    travel: float
    shopping: float
    daily_needs: float
    other: float


class DailyLogResponse(DailyLogCreate):
    id: int
    user_id: UUID


class config:
    orm_mode = True
