from flask import Blueprint, request, jsonify
from app import db
from app.models import User
from app.auth_utils import hash_password, check_password_hash, create_token

auth = Blueprint('auth', __name__)

# Register Route
@auth.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Email and password are required!"}), 400

    hashed_password = hash_password(password)

    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully!"}), 201

# Login Route
@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(password, user.password):
        return jsonify({"message": "Invalid email or password!"}), 401

    token = create_token(user.id)
    return jsonify({"token": token}), 200

# Token Verification Route
@auth.route('/verify-token', methods=['GET'])
def verify_token():
    token = request.headers.get('Authorization').split(" ")[1]

    try:
        jwt.decode(token, 'secretkey', algorithms=['HS256'])
        return jsonify({"message": "Token is valid!"}), 200
    except jwt.ExpiredSignatureError:
        return jsonify({"message": "Token has expired!"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid token!"}), 401
