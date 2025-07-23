from pydantic import BaseModel
from datetime import date
from uuid import UUID


class DailyLogCreate(BaseModel):
    log_date: date
    income: float = 0
    food: float = 0
    travel: float = 0
    shopping: float = 0
    daily_needs: float = 0
    other: float = 0


class config:
    orm_mode = True
