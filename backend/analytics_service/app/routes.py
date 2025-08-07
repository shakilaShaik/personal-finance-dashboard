from datetime import date
from typing import List
from fastapi import APIRouter, Depends, Query, Request, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.dbconnect import async_session
from app.models import DailyLog
from app.schemas import DailyLogCreate, DailyLogResponse

from fastapi import Body
from datetime import date


from app.deps import get_current_user

router = APIRouter()


async def get_db():
    async with async_session() as session:
        yield session


@router.post("/log")
async def create_daily_log(
    payload: DailyLogCreate,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),  # ✅ use Depends here
):
    
    user_id = current_user["user_id"]

    stmt = select(DailyLog).where(
        DailyLog.user_id == user_id, DailyLog.log_date == payload.log_date
    )
    existing_log = (await db.execute(stmt)).scalar_one_or_none()

    if existing_log:
        raise HTTPException(status_code=400, detail="Log already exists, update it.")

    new_log = DailyLog(user_id=user_id, **payload.dict())
    db.add(new_log)
    await db.commit()
    print("log is +++++++++++++++", new_log)
    return {"msg": "Today's log created successfully"}


@router.put("/update-log")
async def update_log(
    data: DailyLogCreate,
    user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):

    current_user_id = user["user_id"]
    statement = select(DailyLog).where(
        DailyLog.log_date == data.log_date, DailyLog.user_id == current_user_id
    )

    exist_log = (await db.execute(statement)).scalar_one_or_none()
    if exist_log:
        update_data = data.dict(exclude_unset=True, exclude={"log_date"})
        for field, value in update_data.items():
            setattr(exist_log, field, value)

        await db.commit()
        await db.refresh(exist_log)
        return {"msg": "updated your expenditure log"}


@router.get("/all-logs")
async def get_all_logs(
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user)):
    
    user_id = current_user["user_id"]
    stmt = (
        select(DailyLog)
        .where(
            DailyLog.user_id == user_id,
        )
        .order_by(DailyLog.log_date)
    )
    result = await db.execute(stmt)
    logs = result.scalars().all()

    return logs







@router.get("/logs", response_model=List[DailyLogResponse])
async def get_logs_between_dates(
    start_date: date = Query(..., description="Start date in YYYY-MM-DD"),
    end_date: date = Query(..., description="End date in YYYY-MM-DD"),
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    user_id = current_user["user_id"]

    if start_date > end_date:
        raise HTTPException(
            status_code=400, detail="Start date must be before end date"
        )

    stmt = (
        select(DailyLog)
        .where(
            DailyLog.user_id == user_id,
            DailyLog.log_date >= start_date,
            DailyLog.log_date <= end_date,
        )
        .order_by(DailyLog.log_date)
    )

    result = await db.execute(stmt)
    logs = result.scalars().all()

    return logs


@router.get("/summary")
async def get_spending_summary(
    start_date: date = Query(..., description="Start date (YYYY-MM-DD)"),
    end_date: date = Query(..., description="End date (YYYY-MM-DD)"),
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    user_id = current_user["user_id"]

    # Validation
    if start_date > end_date:
        raise HTTPException(
            status_code=400, detail="Start date must be before end date"
        )

    # Query all logs in the date range
    stmt = select(DailyLog).where(
        DailyLog.user_id == user_id,
        DailyLog.log_date >= start_date,
        DailyLog.log_date <= end_date,
    )

    result = await db.execute(stmt)
    logs = result.scalars().all()

    if not logs:
        raise HTTPException(status_code=404, detail="No logs found for this period")

    # Initialize totals
    total_income = 0
    food_total = 0
    travel_total = 0
    shopping_total = 0
    daily_needs_total = 0
    other_total = 0

    # For highest income
    max_income = 0

    # Loop and accumulate
    for log in logs:
        food_total += log.food
        travel_total += log.travel
        shopping_total += log.shopping
        daily_needs_total += log.daily_needs
        other_total += log.other
        total_income += log.income

        if log.income > max_income:
            max_income = log.income

    if max_income == 0:
        raise HTTPException(
            status_code=400, detail="Cannot calculate percentages because income is 0"
        )

    # Calculate percentages
    summary = {
        "total_income": total_income,
        "max_income": max_income,
        "food": {
            "total": food_total,
            "percentage": round((food_total / max_income) * 100, 2),
        },
        "travel": {
            "total": travel_total,
            "percentage": round((travel_total / max_income) * 100, 2),
        },
        "shopping": {
            "total": shopping_total,
            "percentage": round((shopping_total / max_income) * 100, 2),
        },
        "daily_needs": {
            "total": daily_needs_total,
            "percentage": round((daily_needs_total / max_income) * 100, 2),
        },
        "other": {
            "total": other_total,
            "percentage": round((other_total / max_income) * 100, 2),
        },
        "total_spending": round(
            food_total
            + travel_total
            + shopping_total
            + daily_needs_total
            + other_total,
            2,
        ),
    }

    return {
        "message": f"Here is your spending summary from {start_date} to {end_date}",
        "summary": summary,
    }
