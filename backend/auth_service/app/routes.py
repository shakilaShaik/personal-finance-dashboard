from flask import Blueprint, request, jsonify
from sqlalchemy.exc import IntegrityError
from dbconnect import SessionLocal
from schemas import UserRegister
from models import User
from utils import hash_password

router = Blueprint("auth", __name__)
db = SessionLocal()


@router.route("/register", methods=["POST"])
def register():
    data = UserRegister(**request.json)
    existing_user = db.query(User).filter((User.email == data.email)).first()
    if existing_user:
        return jsonify({"error": "user already exist , please login"})
    new_user = User(
        name=data.name, email=data.email, password=hash_password(data.password)
    )
    try:
        db.add(new_user)
        db.commit()
        return jsonify({"msg": "User regisered successfully"}), 201
    except:
        db.rollback()
        return jsonify({"error": "Failed to create user"}), 500
