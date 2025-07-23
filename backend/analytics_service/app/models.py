from sqlalchemy import Column, Integer, Numeric, Date, String
from sqlalchemy.dialects.postgresql import UUID
import uuid
from app.dbconnect import Base


class DailyLog(Base):
    __tablename__ = "daily_logs"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)
    log_date = Column(Date, nullable=False)
    food = Column(Numeric, default=0)
    travel = Column(Numeric, default=0)
    shopping = Column(Numeric, default=0)
    daily_needs = Column(Numeric, default=0)
    other = Column(Numeric, default=0)
    income = Column(Numeric, default=0)
