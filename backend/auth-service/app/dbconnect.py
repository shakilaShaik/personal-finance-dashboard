from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from .dbconfig import settings


engine = create_engine(settings.DB_URL)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()
