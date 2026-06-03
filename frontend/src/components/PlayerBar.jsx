import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaRandom, FaRedo, FaVolumeUp } from "react-icons/fa";
import { useState } from "react";
import "./PlayerBar.css"; // <-- add a css file for styles

export default function PlayerBar() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="player">
      
      {/* Left - Track Info */}
      <div className="track">
        <img src="https://source.unsplash.com/80x80/?album,cover" alt="" />
        <div className="meta">
          <div className="title">Now Playing</div>
          <div className="artist">Unknown Artist</div>
        </div>
      </div>

      {/* Center - Controls */}
      <div className="controls">
        <div className="buttons">
          <button><FaRandom /></button>
          <button><FaStepBackward /></button>
          <button className="play-btn" onClick={() => setPlaying(p => !p)}>
            {playing ? <FaPause /> : <FaPlay />}
          </button>
          <button><FaStepForward /></button>
          <button><FaRedo /></button>
        </div>

        {/* Progress bar */}
        <div className="progress">
          <span>1:15</span>
          <div className="bar">
            <div className="bar-fill" style={{ width: "45%" }} />
          </div>
          <span>3:32</span>
        </div>
      </div>

      {/* Right - Volume */}
      <div className="volume">
        <FaVolumeUp />
        <div className="vol-bar">
          <div className="vol-fill" style={{ width: "60%" }} />
        </div>
      </div>
    </div>
  );
}
