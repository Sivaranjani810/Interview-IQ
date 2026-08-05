from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity,
)
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import timedelta
import requests
import random
import re

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["JWT_SECRET_KEY"] = "change-this-secret-key-later"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1)

CORS(app)

db = SQLAlchemy(app)
jwt = JWTManager(app)


# ------------------ DATABASE ------------------

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)


class InterviewAttempt(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    role = db.Column(db.String(100), nullable=False)
    round_type = db.Column(db.String(20), nullable=False)
    score = db.Column(db.Integer, nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())


with app.app_context():
    db.create_all()


# ------------------ SIGNUP ------------------

@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    existing = User.query.filter_by(email=email).first()

    if existing:
        return jsonify({"error": "Email already registered"}), 400

    hashed = generate_password_hash(password)

    user = User(
        name=name,
        email=email,
        password=hashed
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "Signup successful"}), 201


# ------------------ LOGIN ------------------

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({"error": "Invalid email or password"}), 401

    token = create_access_token(identity=str(user.id))

    return jsonify({
        "message": "Login successful",
        "token": token,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    }), 200


# ------------------ PROFILE ------------------

@app.route("/api/profile", methods=["GET"])
@jwt_required()
def profile():

    user_id = get_jwt_identity()

    user = User.query.get(user_id)

    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email
    })


@app.route("/api/profile", methods=["PUT"])
@jwt_required()
def update_profile():

    user_id = get_jwt_identity()

    user = User.query.get(user_id)

    data = request.get_json()

    name = data.get("name")

    if not name:
        return jsonify({"error": "Name cannot be empty"}), 400

    user.name = name.strip()

    db.session.commit()

    return jsonify({
        "message": "Profile updated",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    })


# ------------------ AI QUESTION ------------------

@app.route('/api/generate-question', methods=['POST'])
@jwt_required()
def generate_question():
    data = request.get_json()
    role = data.get('role', 'general')
    round_type = data.get('roundType', 'technical')
    difficulty = data.get('difficulty', 'easy')

    difficulty_map = {
        'easy': 'suitable for a beginner or fresher, using simple and clear language',
        'medium': 'suitable for someone with 1-2 years of experience',
        'hard': 'suitable for an experienced professional, more in-depth',
    }
    difficulty_desc = difficulty_map.get(difficulty, difficulty_map['easy'])

    topics_technical = ['core concepts', 'a practical scenario', 'tools and technologies used', 'problem-solving approach', 'a real-world challenge']
    topics_hr = ['teamwork', 'handling conflict', 'time management', 'motivation and career goals', 'a challenging situation you overcame']

    if round_type == 'hr':
        topic = random.choice(topics_hr)
        prompt = f"""You are an interviewer conducting an HR/behavioral round for a {role} position.
Ask ONE realistic HR interview question specifically about: {topic}.
The question should be {difficulty_desc}.
IMPORTANT: Keep the question to ONE SHORT SENTENCE, maximum 20 words. No explanation, no scenario setup, just the direct question.
Only output the question text, nothing else."""
    else:
        topic = random.choice(topics_technical)
        prompt = f"""You are an interviewer conducting a technical round for a {role} position.
Ask ONE realistic technical interview question about: {topic}.
The question should be {difficulty_desc}.
IMPORTANT: Keep the question to ONE SHORT SENTENCE, maximum 20 words. No explanation, no scenario setup, just the direct question.
Only output the question text, nothing else."""

    try:
        response = requests.post(
            'http://localhost:11434/api/generate',
            json={
                'model': 'llama3.2',
                'prompt': prompt,
                'stream': False,
                'options': {
                    'temperature': 0.9
                }
            }
        )
        result = response.json()
        question = result.get('response', '').strip()
        return jsonify({'question': question}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ------------------ EVALUATE ANSWER ------------------

@app.route('/api/evaluate-answer', methods=['POST'])
@jwt_required()
def evaluate_answer():
    data = request.get_json()
    question = data.get('question')
    answer = data.get('answer')
    role = data.get('role', 'general')
    round_type = data.get('roundType', 'technical')
    user_id = get_jwt_identity()

    prompt = f"""You are a strict but fair interview coach for a {role} position.

Question: {question}
Candidate's Answer: {answer}

Give VERY SHORT, practical feedback in this EXACT format (keep each line under 20 words):
Score: [number]/10
Good: [one short sentence on what was good]
Fix: [one short sentence on what to improve]
Ideal Answer: [a brief 2-3 sentence example of what a strong answer would sound like]

Be concise. No long paragraphs. No extra explanation outside this format."""

    try:
        response = requests.post(
            'http://localhost:11434/api/generate',
            json={
                'model': 'llama3.2',
                'prompt': prompt,
                'stream': False
            }
        )
        result = response.json()
        feedback = result.get('response', '').strip()

        score = None
        match = re.search(r'Score:\s*(\d+)', feedback)
        if match:
            score = int(match.group(1))

        attempt = InterviewAttempt(
            user_id=user_id,
            role=role,
            round_type=round_type,
            score=score
        )
        db.session.add(attempt)
        db.session.commit()

        return jsonify({'feedback': feedback}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ------------------ STATS ------------------

@app.route('/api/stats', methods=['GET'])
@jwt_required()
def get_stats():
    user_id = get_jwt_identity()
    attempts = InterviewAttempt.query.filter_by(user_id=user_id).all()

    total_interviews = len(attempts)
    scores = [a.score for a in attempts if a.score is not None]
    avg_score = round(sum(scores) / len(scores), 1) if scores else None

    return jsonify({
        'totalInterviews': total_interviews,
        'averageScore': avg_score
    }), 200


# ------------------ RUN ------------------

if __name__ == "__main__":
    app.run(debug=True)