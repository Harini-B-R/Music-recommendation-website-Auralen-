# Auralen(Music-recommendation-website)
Developed a full-stack music recommendation application using modern web technologies, enabling users to discover, search, and listen to music through a responsive and interactive platform.

# 🎵 Auralens - Mood-Based Music Recommender

## 🚀 Overview

**Auralens** is a full-stack music recommendation system that suggests songs based on user mood input. The application analyzes user-provided text and generates personalized song recommendations, improving music discovery and user engagement.

---

## 🛠 Tech Stack

* **Frontend**: React (Vite), React Router, React Player
* **Backend**: Flask, Flask-CORS
* **Database/Data Source**: CSV-based dataset (`songs.csv`)
* **Other Tools**: LocalStorage (for history), REST APIs

---

## ✨ Features

* 🎯 Mood-based song recommendation using text input
* 🎧 Supports both YouTube streaming and local audio playback
* 🧠 Rule-based mood detection system
* 📜 Search history stored in browser (localStorage)
* 🔐 Basic login simulation with token storage
* ⚡ Fast and responsive UI

---

## 🏗️ Project Structure

```
Auralens-Music-Recommender-App/
│
├── frontend/              # React frontend
│   ├── src/
│   ├── package.json
│
├── backend/               # Flask backend
│   ├── app.py
│   ├── songs.csv
│   ├── static/
│   │   └── songs/         # Local audio files
│   ├── requirements.txt
│
├── README.md
├── .gitignore
```

---

## ▶️ How to Run Locally

### 🔹 Backend Setup

```bash
cd backend
python -m venv .venv

# Activate virtual environment
# Windows:
.venv\Scripts\activate
# Mac/Linux:
source .venv/bin/activate

pip install -r requirements.txt
python app.py
```

👉 Backend runs at: http://localhost:5000

---

### 🔹 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

👉 Frontend runs at: http://localhost:5173

---

## 🔄 Application Workflow

1. User enters mood text or selects mood options
2. Frontend sends request to `/recommend` API
3. Backend processes input using rule-based logic
4. Returns a list of recommended songs
5. Frontend displays results and enables playback:

   * **ReactPlayer** → YouTube videos
   * **HTML `<audio>`** → Local audio files

---

## ⚠️ Important Notes

* YouTube links cannot be played using `<audio>` — use **ReactPlayer**
* Local files must be placed inside `backend/static/songs/`
* Browser autoplay policies may require manual interaction (click play)

---

## 📈 Future Enhancements

* 🤖 Integrate machine learning models (Transformers, NLP)
* 📊 Improve recommendation accuracy using user behavior data
* 🔐 Implement secure authentication (JWT)
* ☁️ Deploy application using cloud platforms (Render, Vercel)
* 🎵 Integrate Spotify API for real-time recommendations

---





## 💡 Key Highlights

* Full-stack application with REST API integration
* Real-time recommendation workflow
* Clean and responsive UI
* Supports multimedia playback (YouTube + local audio)

---

## 👨‍💻 Author

**Harini B R**

* GitHub:https://github.com/Harini-B-R
---

## ⭐ If you like this project

Give it a ⭐ on GitHub and feel free to contribute!

