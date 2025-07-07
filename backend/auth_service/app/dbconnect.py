from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.dbconfig import settings

Base = declarative_base()
engine = create_async_engine(settings.DB_URL, echo=True)


async_session = sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)
