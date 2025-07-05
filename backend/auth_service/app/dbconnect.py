from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dbconfig import settings

try:
    engine = create_async_engine(settings.DB_URL, echo=True)
    async_session = sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)
    Base = declarative_base()
    print("connected to db successfully")
except:
    print("error while connecting to database")
