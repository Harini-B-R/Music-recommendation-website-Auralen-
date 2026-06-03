import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  recommend,
  searchSongs,
  getDailyMix,
  getRecent,
  getLiked,
} from "./api";
import RecommendationList from "./components/RecommendationList";

import "./Sidebar.css";
import "./Topbar.css";
import "./App.css";

const MOODS = ["happy", "sad", "relaxed", "focus", "angry", "romantic"];

export default function App({ setLoggedIn }) {
  const [view, setView] = useState("home");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [mood, setMood] = useState("");
  const [liked, setLiked] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  // 🎵 Player state
  const [currentSong, setCurrentSong] = useState(null);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const username = localStorage.getItem("username") || "A";

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
    refreshLiked();
  }, []);

  const refreshLiked = async () => {
    const l = await getLiked();
    setLiked(l || []);
  };

  // 🎵 Play / Pause / Switch Song
  const playSong = (songUrl) => {
    if (audio) {
      if (currentSong === songUrl) {
        if (audio.paused) {
          audio.play();
          setIsPlaying(true);
        } else {
          audio.pause();
          setIsPlaying(false);
        }
        return;
      }
      audio.pause();
    }

    const newAudio = new Audio(songUrl);

    newAudio.onloadedmetadata = () => {
      setDuration(newAudio.duration);
    };

    newAudio.ontimeupdate = () => {
      if (newAudio.duration > 0) {
        setProgress(newAudio.currentTime / newAudio.duration);
      }
    };

    newAudio.onended = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    newAudio.play();
    setAudio(newAudio);
    setCurrentSong(songUrl);
    setIsPlaying(true);
  };

  // 🎵 Seek function
  const seekSong = (fraction) => {
    if (audio && duration > 0) {
      audio.currentTime = fraction * duration;
      setProgress(fraction);
    }
  };

  return (
    <>
      <div className="layout">
        {/* Sidebar (desktop) */}
        <aside className="sidebar">
          <div className="brand">Auralens</div>
          <nav>
            <button
              className={`nav-item ${view === "home" ? "active" : ""}`}
              onClick={() => setView("home")}
            >
              Home
            </button>
            <button
              className={`nav-item ${view === "liked" ? "active" : ""}`}
              onClick={async () => {
                const l = await getLiked();
                setView("liked");
                setMood("liked");
                setResults(l || []);
              }}
            >
              Liked Songs
            </button>
            <button
              className={`nav-item ${view === "recent" ? "active" : ""}`}
              onClick={async () => {
                const r = await getRecent();
                setView("recent");
                setMood("recently played");
                setResults(r || []);
              }}
            >
              Recently Played
            </button>
            <button
              className={`nav-item ${view === "daily" ? "active" : ""}`}
              onClick={async () => {
                const d = await getDailyMix();
                setView("daily");
                setMood("daily mix");
                setResults(d || []);
              }}
            >
              Daily Mix
            </button>
          </nav>
        </aside>

        {/* Main content */}
        <main className="content">
          <header className="topbar">
            <input
              className="search"
              placeholder="Search songs, artists…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                (async () => {
                  setView("home");
                  const list = await searchSongs(query);
                  setMood(query ? `results for "${query}"` : "");
                  setResults(list || []);
                })()
              }
            />
            <div
              className="avatar"
              title={username}
              onClick={() => setShowMenu(!showMenu)}
            >
              {(username[0] || "A").toUpperCase()}
              {showMenu && (
                <div className="menu">
                  <button
                    className="menu-item"
                    onClick={() => {
                      localStorage.clear();
                      setLoggedIn(false);
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </header>

          <div className="card" data-aos="fade-up">
            <h2>Get Recommendations</h2>
            <div className="row mb-12">
              <input
                className="input"
                placeholder="Type how you feel (e.g., I feel sad)…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                className="btn"
                onClick={() =>
                  recommend(query).then((data) => {
                    setMood(data.mood);
                    setResults(data.recommendations || []);
                  })
                }
              >
                Get Recommendations
              </button>
            </div>

            <div className="row gap-8 mb-10">
              {MOODS.map((m, i) => (
                <button
                  key={m}
                  className="badge"
                  onClick={async () => {
                    const data = await recommend(m);
                    setMood(data.mood);
                    setResults(data.recommendations || []);
                  }}
                  data-aos="fade-up"
                  data-aos-delay={100 + i * 40}
                >
                  #{m}
                </button>
              ))}
            </div>

            {!!mood && (
              <div className="small mb-8">
                Detected mood: <b>{mood}</b>
              </div>
            )}

            <RecommendationList
              items={results}
              liked={liked}
              currentSong={currentSong}
              isPlaying={isPlaying}
              progress={progress}
              duration={duration}
              onPlay={playSong}
              onSeek={seekSong}
            />
          </div>
        </main>
      </div>

      {/* 📱 Bottom Navigation (mobile only, hidden on desktop via CSS) */}
      <nav className="bottom-nav">
        <button
          className={`bottom-item ${view === "home" ? "active" : ""}`}
          onClick={() => setView("home")}
        >
          🏠 <span>Home</span>
        </button>

        <button
          className={`bottom-item ${view === "liked" ? "active" : ""}`}
          onClick={async () => {
            const l = await getLiked();
            setView("liked");
            setMood("liked");
            setResults(l || []);
          }}
        >
          ❤️ <span>Liked</span>
        </button>

        <button
          className={`bottom-item ${view === "recent" ? "active" : ""}`}
          onClick={async () => {
            const r = await getRecent();
            setView("recent");
            setMood("recently played");
            setResults(r || []);
          }}
        >
          ⏱ <span>Recent</span>
        </button>

        <button
          className={`bottom-item ${view === "daily" ? "active" : ""}`}
          onClick={async () => {
            const d = await getDailyMix();
            setView("daily");
            setMood("daily mix");
            setResults(d || []);
          }}
        >
          🎶 <span>Daily</span>
        </button>
      </nav>
    </>
  );
}
