


# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import os, random
# from transformers import pipeline
# from pymongo import MongoClient

# app = Flask(__name__, static_folder="static")
# CORS(app)

# # ---------- MongoDB Setup ----------
# client = MongoClient("mongodb://localhost:27017/")  # change if using Atlas
# db = client["moodify"]   # database name
# songs_collection = db["songs"]

# def get_all_songs():
#     """Fetch all songs from MongoDB"""
#     return list(songs_collection.find({}, {"_id": 0}))

# # ---------- Memory stores ----------
# LIKED = []          # list of liked songs
# RECENT = []         # list of recently played songs
# MAX_RECENT = 25

# # ---------- Load ML model ----------
# classifier = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base")

# # ---------- Emotion → Mood mapping ----------
# EMOTION_TO_MOOD = {
#     "joy": "happy",
#     "happiness": "happy",
#     "anger": "angry",
#     "sadness": "sad",
#     "fear": "sad",
#     "disgust": "angry",
#     "surprise": "happy"
# }

# def detect_mood(text: str) -> str:
#     """Detect mood using ML + keyword fallback. Always returns one of 6 moods."""
#     if not text:
#         return "relaxed"
    
#     result = classifier(text, top_k=1)[0]
#     emotion = result["label"].lower()
    
#     t = text.lower()
#     if any(w in t for w in [
#         "romantic","love","date","sweet","kiss","darling","honey",
#         "crush","cuddle","passion","affection","valentine"
#     ]):
#         return "romantic"
#     if any(w in t for w in [
#         "relax","calm","chill","soothe","peace","serene","quiet",
#         "gentle","smooth","tranquil"
#     ]):
#         return "relaxed"
#     if any(w in t for w in [
#         "focus","study","work","concentrate","coding","productive",
#         "research","project","analyze","thinking"
#     ]):
#         return "focus"
    
#     return EMOTION_TO_MOOD.get(emotion, "relaxed")

# def _absolutize(item):
#     """Make url/image absolute to this server."""
#     base = request.host_url.rstrip("/")
#     out = dict(item)
#     for k in ["url", "image"]:
#         v = out.get(k) or ""
#         if v and not v.startswith("http"):
#             if not v.startswith("/static/"):
#                 v = "/static/" + v.lstrip("/").lstrip("static/").lstrip("/")
#             out[k] = f"{base}{v}"
#     return out

# # ---------- Health/auth ----------
# @app.route("/health")
# def health():
#     return {"ok": True}

# @app.route("/auth/login", methods=["POST"])
# def login():
#     data = request.get_json(force=True, silent=True) or {}
#     username = (data.get("username") or "user").strip() or "user"
#     return jsonify({"token": f"demo-{username}", "username": username})

# # ---------- Songs ----------
# @app.route("/songs")
# def list_songs():
#     return jsonify([_absolutize(s) for s in get_all_songs()])

# @app.route("/search")
# def search():
#     q = (request.args.get("q") or "").lower().strip()
#     if not q:
#         return jsonify([_absolutize(s) for s in get_all_songs()])
#     found = list(songs_collection.find(
#         {"$or": [
#             {"title": {"$regex": q, "$options": "i"}},
#             {"artist": {"$regex": q, "$options": "i"}}
#         ]},
#         {"_id": 0}
#     ))
#     return jsonify([_absolutize(s) for s in found])

# # ---------- Recommend ----------
# @app.route("/recommend", methods=["POST"])
# def recommend():
#     data = request.get_json(force=True, silent=True) or {}
#     mood = detect_mood(data.get("text", ""))

#     results = list(songs_collection.find({"mood": mood}, {"_id": 0}))
#     if not results:
#         results = list(songs_collection.find({"mood": "relaxed"}, {"_id": 0}))

#     random.shuffle(results)
#     return jsonify({"mood": mood, "recommendations": [_absolutize(s) for s in results[:12]]})

# # ---------- Liked ----------

# # ---------- Add Song ----------
# @app.route("/add-song", methods=["POST"])
# def add_song():
#     """Add a new song to MongoDB."""
#     body = request.get_json(force=True, silent=True) or {}
    
#     title = body.get("title", "").strip()
#     url = body.get("url", "").strip()
    
#     if not title or not url:
#         return jsonify({"ok": False, "error": "Title and URL are required"}), 400

#     # Check if song already exists
#     existing = songs_collection.find_one({"title": title, "url": url})
#     if existing:
#         return jsonify({"ok": False, "error": "Song already exists"}), 400

#     song = {
#         "title": title,
#         "artist": body.get("artist", "").strip(),
#         "url": url,
#         "image": body.get("image", "").strip(),
#         "mood": body.get("mood", "relaxed").strip().lower()
#     }

#     songs_collection.insert_one(song)
#     return jsonify({"ok": True, "song": song})

# @app.route("/liked", methods=["GET", "POST", "DELETE"])
# def liked():
#     global LIKED
#     if request.method == "GET":
#         return jsonify([_absolutize(s) for s in LIKED])

#     body = request.get_json(force=True, silent=True) or {}
#     key = (body.get("title","").strip().lower(), (body.get("url") or "").strip())
#     if request.method == "POST":
#         if key[0] and key[1] and key not in [(s["title"].lower(), s["url"]) for s in LIKED]:
#             LIKED.append({
#                 "title": body.get("title",""),
#                 "artist": body.get("artist",""),
#                 "url": body.get("url",""),
#                 "image": body.get("image",""),
#                 "mood": body.get("mood","")
#             })
#         return jsonify({"ok": True, "liked": [ _absolutize(s) for s in LIKED ]})

#     LIKED = [s for s in LIKED if (s["title"].lower(), s["url"]) != key]
#     return jsonify({"ok": True})

# # ---------- Recent ----------
# @app.route("/play", methods=["POST"])
# def record_play():
#     body = request.get_json(force=True, silent=True) or {}
#     song = {
#         "title": body.get("title",""),
#         "artist": body.get("artist",""),
#         "url": body.get("url",""),
#         "image": body.get("image",""),
#         "mood": body.get("mood","")
#     }
#     if song["url"]:
#         global RECENT
#         RECENT = [s for s in RECENT if s.get("url") != song["url"]]
#         RECENT.append(song)
#         if len(RECENT) > MAX_RECENT:
#             RECENT = RECENT[-MAX_RECENT:]
#     return jsonify({"ok": True})

# @app.route("/recent")
# def recent():
#     return jsonify([_absolutize(s) for s in RECENT[::-1]])

# # ---------- Daily Mix ----------
# @app.route("/daily-mix")
# def daily_mix():
#     pool = get_all_songs()
#     random.shuffle(pool)
#     return jsonify([_absolutize(s) for s in pool[:12]])

# # ---------- Static ----------
# @app.route('/static/<path:path>')
# def send_static(path):
#     from flask import send_from_directory
#     return send_from_directory('static', path)

# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5000, debug=True)



from flask import Flask, request, jsonify
from flask_cors import CORS
import os, random
from transformers import pipeline
from pymongo import MongoClient
import bcrypt, jwt, datetime
from functools import wraps

app = Flask(__name__, static_folder="static")
CORS(app)

# ---------- MongoDB Setup ----------
client = MongoClient("mongodb://127.0.0.1:27017/")  # change if using Atlas
db = client["moodify"]   # database name
songs_collection = db["songs"]
SECRET_KEY = "supersecret"   # change in production
users_collection = db["users"]


def get_all_songs():
    """Fetch all songs from MongoDB"""
    return list(songs_collection.find({}, {"_id": 0}))

# ---------- Memory stores ----------
LIKED = []          # list of liked songs
RECENT = []         # list of recently played songs
MAX_RECENT = 25

# ---------- Load ML model ----------
classifier = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base")

# ---------- Emotion → Mood mapping ----------
EMOTION_TO_MOOD = {
    "joy": "happy",
    "happiness": "happy",
    "anger": "angry",
    "sadness": "sad",
    "fear": "sad",
    "disgust": "angry",
    "surprise": "happy"
}

def detect_mood(text: str) -> str:
    """Detect mood using ML + keyword fallback. Always returns one of 6 moods."""
    if not text:
        return "relaxed"
    
    result = classifier(text, top_k=1)[0]
    emotion = result["label"].lower()
    
    t = text.lower()
    if any(w in t for w in [
        "romantic","love","date","sweet","kiss","darling","honey",
        "crush","cuddle","passion","affection","valentine"
    ]):
        return "romantic"
    if any(w in t for w in [
        "relax","calm","chill","soothe","peace","serene","quiet",
        "gentle","smooth","tranquil"
    ]):
        return "relaxed"
    if any(w in t for w in [
        "focus","study","work","concentrate","coding","productive",
        "research","project","analyze","thinking"
    ]):
        return "focus"
    
    return EMOTION_TO_MOOD.get(emotion, "relaxed")


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization")
        if not token:
            return jsonify({"ok": False, "error": "Token missing"}), 401
        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            current_user = users_collection.find_one({"email": data["email"]})
        except:
            return jsonify({"ok": False, "error": "Invalid token"}), 401
        return f(current_user, *args, **kwargs)
    return decorated


def _absolutize(item):
    """Make url/image absolute to this server."""
    base = request.host_url.rstrip("/")
    out = dict(item)
    for k in ["url", "image"]:
        v = out.get(k) or ""
        if v and not v.startswith("http"):
            if not v.startswith("/static/"):
                v = "/static/" + v.lstrip("/").lstrip("static/").lstrip("/")
            out[k] = f"{base}{v}"
    return out

# ---------- Health/auth ----------
@app.route("/health")
def health():
    return {"ok": True}

# @app.route("/auth/login", methods=["POST"])
# def login():
#     data = request.get_json(force=True, silent=True) or {}
#     username = (data.get("username") or "user").strip() or "user"
#     return jsonify({"token": f"demo-{username}", "username": username})
@app.route("/auth/login", methods=["POST"])
def login():
    data = request.get_json(force=True, silent=True) or {}
    email = data.get("email", "").strip()
    password = data.get("password", "").strip()

    user = users_collection.find_one({"email": email})
    if not user:
        return jsonify({"ok": False, "error": "User not found"}), 400

    if not bcrypt.checkpw(password.encode("utf-8"), user["password"]):
        return jsonify({"ok": False, "error": "Invalid password"}), 400

    token = jwt.encode(
        {"email": email, "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2)},
        SECRET_KEY,
        algorithm="HS256"
    )

    return jsonify({"ok": True, "token": token, "username": user["username"]})

# ---------- Songs ----------
@app.route("/songs")
def list_songs():
    return jsonify([_absolutize(s) for s in get_all_songs()])

@app.route("/search")
def search():
    q = (request.args.get("q") or "").lower().strip()
    if not q:
        return jsonify([_absolutize(s) for s in get_all_songs()])
    found = list(songs_collection.find(
        {"$or": [
            {"title": {"$regex": q, "$options": "i"}},
            {"artist": {"$regex": q, "$options": "i"}}
        ]},
        {"_id": 0}
    ))
    return jsonify([_absolutize(s) for s in found])

# ---------- Recommend ----------
@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json(force=True, silent=True) or {}
    mood = detect_mood(data.get("text", ""))

    results = list(songs_collection.find({"mood": mood}, {"_id": 0}))
    if not results:
        results = list(songs_collection.find({"mood": "relaxed"}, {"_id": 0}))

    random.shuffle(results)
    return jsonify({"mood": mood, "recommendations": [_absolutize(s) for s in results[:12]]})

# ---------- Liked ----------

# ---------- Add Song ----------
@app.route("/add-song", methods=["POST"])
def add_song():
    """Add a new song to MongoDB."""
    body = request.get_json(force=True, silent=True) or {}
    
    title = body.get("title", "").strip()
    url = body.get("url", "").strip()
    
    if not title or not url:
        return jsonify({"ok": False, "error": "Title and URL are required"}), 400

    # Check if song already exists
    existing = songs_collection.find_one({"title": title, "url": url})
    if existing:
        return jsonify({"ok": False, "error": "Song already exists"}), 400

    song = {
        "title": title,
        "artist": body.get("artist", "").strip(),
        "url": url,
        "image": body.get("image", "").strip(),
        "mood": body.get("mood", "relaxed").strip().lower()
    }

    songs_collection.insert_one(song)
    return jsonify({"ok": True, "song": song})

@app.route("/liked", methods=["GET", "POST", "DELETE"])
def liked():
    global LIKED
    if request.method == "GET":
        return jsonify([_absolutize(s) for s in LIKED])

    body = request.get_json(force=True, silent=True) or {}
    key = (body.get("title","").strip().lower(), (body.get("url") or "").strip())
    if request.method == "POST":
        if key[0] and key[1] and key not in [(s["title"].lower(), s["url"]) for s in LIKED]:
            LIKED.append({
                "title": body.get("title",""),
                "artist": body.get("artist",""),
                "url": body.get("url",""),
                "image": body.get("image",""),
                "mood": body.get("mood","")
            })
        return jsonify({"ok": True, "liked": [ _absolutize(s) for s in LIKED ]})

    LIKED = [s for s in LIKED if (s["title"].lower(), s["url"]) != key]
    return jsonify({"ok": True})

# ---------- Recent ----------
@app.route("/play", methods=["POST"])
def record_play():
    body = request.get_json(force=True, silent=True) or {}
    song = {
        "title": body.get("title",""),
        "artist": body.get("artist",""),
        "url": body.get("url",""),
        "image": body.get("image",""),
        "mood": body.get("mood","")
    }
    if song["url"]:
        global RECENT
        RECENT = [s for s in RECENT if s.get("url") != song["url"]]
        RECENT.append(song)
        if len(RECENT) > MAX_RECENT:
            RECENT = RECENT[-MAX_RECENT:]
    return jsonify({"ok": True})

@app.route("/recent")
def recent():
    return jsonify([_absolutize(s) for s in RECENT[::-1]])

# ---------- Daily Mix ----------
@app.route("/daily-mix")
def daily_mix():
    pool = get_all_songs()
    random.shuffle(pool)
    return jsonify([_absolutize(s) for s in pool[:12]])


@app.route("/auth/signup", methods=["POST"])
def signup():
    data = request.get_json(force=True, silent=True) or {}
    username = data.get("username", "").strip()
    email = data.get("email", "").strip()
    password = data.get("password", "").strip()

    if not username or not email or not password:
        return jsonify({"ok": False, "error": "All fields required"}), 400

    if users_collection.find_one({"email": email}):
        return jsonify({"ok": False, "error": "User already exists"}), 400

    hashed_pw = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

    users_collection.insert_one({
        "username": username,
        "email": email,
        "password": hashed_pw
    })

    return jsonify({"ok": True, "message": "User created"})


# ---------- Static ----------
@app.route('/static/<path:path>')
def send_static(path):
    from flask import send_from_directory
    return send_from_directory('static', path)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
