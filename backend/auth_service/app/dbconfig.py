# config variables for the database imported from the env file

import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    DB_URL = (
        f"postgresql+asyncpg://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@"
        f"{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
    )
    SECRET_KEY = os.getenv("SECRET_KEY")


settings = Settings()
