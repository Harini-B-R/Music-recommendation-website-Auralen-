
// import { useState, useEffect, useRef } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";

// export default function RecommendationList({ items }) {
//   const [currentSong, setCurrentSong] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const audioRef = useRef(null);

//   useEffect(() => {
//     AOS.init({ duration: 1000, once: false, easing: "ease-in-out" });
//   }, []);

//   const handlePlayPause = (song) => {
//     if (currentSong && currentSong.title === song.title) {
//       if (isPlaying) {
//         audioRef.current.pause();
//         setIsPlaying(false);
//       } else {
//         audioRef.current.play();
//         setIsPlaying(true);
//       }
//     } else {
//       if (audioRef.current) {
//         audioRef.current.pause();
//       }
//       const newAudio = new Audio(song.url);
//       audioRef.current = newAudio;
//       newAudio.play();
//       setCurrentSong(song);
//       setIsPlaying(true);

//       newAudio.onended = () => setIsPlaying(false);
//     }
//   };

//   if (!items || items.length === 0) {
//     return <p className="text-gray-500 text-center mt-6">No recommendations available.</p>;
//   }

//   return (
//     <div className="relative">
//       {/* Heading with Spotify-like Animation */}
//       <h1
//         className="text-3xl font-bold text-center mb-6 text-green-600"
//         data-aos="fade-down"
//       >
//         🎶 Recommended Songs
//       </h1>

//       {/* Horizontal Scrollable Song List */}
//       <div className="flex gap-6 overflow-x-auto p-4 scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-200">
//         {items.map((song, idx) => (
//           <div
//             key={idx}
//             data-aos="fade-up"
//             data-aos-delay={idx * 150}
//             className="min-w-[220px] bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 hover:-translate-y-1 duration-500 p-4 flex-shrink-0"
//           >
//             {song.image && (
//               <img
//                 src={song.image}
//                 alt={song.title}
//                 data-aos="zoom-in"
//                 className="w-full h-40 object-cover rounded-lg mb-3"
//               />
//             )}
//             <h3 className="text-lg font-semibold">{song.title}</h3>
//             <p className="text-sm text-gray-400">{song.artist || "Unknown"}</p>

//             <div className="mt-3 flex gap-2">
//               <button
//                 onClick={() => handlePlayPause(song)}
//                 data-aos="flip-left"
//                 className={`px-4 py-2 rounded-full text-white font-semibold shadow-md transition-all duration-300 ${
//                   currentSong?.title === song.title && isPlaying
//                     ? "bg-red-500 hover:bg-red-600 scale-105"
//                     : "bg-green-500 hover:bg-green-600"
//                 }`}
//               >
//                 {currentSong?.title === song.title && isPlaying ? "⏸ Pause" : "▶ Play"}
//               </button>
//               {song.url && (
//                 <a
//                   href={song.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   data-aos="flip-right"
//                   className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-all duration-300"
//                 >
//                   Open
//                 </a>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Spotify-like Mini Player */}
//       {currentSong && (
//         <div
//           className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-black via-gray-900 to-black text-white flex items-center justify-between p-4 shadow-lg animate__animated animate__fadeInUp"
//           data-aos="fade-up"
//         >
//           <div className="flex items-center gap-3">
//             {currentSong.image && (
//               <img
//                 src={currentSong.image}
//                 alt={currentSong.title}
//                 className="w-12 h-12 rounded-md shadow-md"
//                 data-aos="zoom-in"
//               />
//             )}
//             <div>
//               <p className="font-semibold">{currentSong.title}</p>
//               <p className="text-sm text-gray-400">{currentSong.artist}</p>
//             </div>
//           </div>
//           <button
//             onClick={() => handlePlayPause(currentSong)}
//             className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-full text-lg font-bold shadow-lg transition transform hover:scale-110"
//             data-aos="flip-up"
//           >
//             {isPlaying ? "⏸ Pause" : "▶ Play"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }





// import { useState } from "react";
// import { FaPlay, FaHeart, FaRegHeart } from "react-icons/fa";
// import AudioPlayer from "./AudioPlayer";
// import { addLiked, removeLiked } from "../api";

// export default function RecommendationList({ items = [], liked = [] }) {
//   const [localLiked, setLocalLiked] = useState(liked.map((x) => x.url));

//   if (!items.length) return null;

//   const isLiked = (song) => localLiked.includes(song.url);

//   const toggleLike = async (song) => {
//     if (isLiked(song)) {
//       await removeLiked(song);
//       setLocalLiked((l) => l.filter((u) => u !== song.url));
//     } else {
//       await addLiked(song);
//       setLocalLiked((l) => [...l, song.url]);
//     }
//   };

//   return (
//     <div className="section">
//       <h3 className="section-title">🎵 Recommended Songs</h3>
//       <div className="card-grid">
//         {items.map((x, i) => {
//           const cover =
//             x.image || "https://source.unsplash.com/400x400/?music,album";

//           return (
//             <div className="playlist-card" key={i} data-aos="zoom-in">
//               <div className="cover">
//                 <img src={cover} alt={x.title || "cover"} />
//                 <button className="play-fab" title="Play preview">
//                   <FaPlay />
//                 </button>
//               </div>
//               <div className="info">
//                 <div className="t">{x.title || "Unknown Title"}</div>
//                 <div className="s">{x.artist || "Unknown Artist"}</div>
//               </div>

//               <div
//                 className="row"
//                 style={{ justifyContent: "space-between", marginTop: 8 }}
//               >
//                 <button className="btn ghost" onClick={() => toggleLike(x)}>
//                   {isLiked(x) ? <FaHeart /> : <FaRegHeart />} &nbsp; Like
//                 </button>
//               </div>

//               {/* ✅ Force re-mount when url changes */}
//               <div style={{ marginTop: 8 }}>
//                 <AudioPlayer
//                   key={x.url}  // 👈 important fix
//                   url={x.url}
//                   title={x.title}
//                   image={x.image}
//                   artist={x.artist}
//                   mood={x.mood}
//                 />
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }




// import { useState } from "react";
// import { FaPlay, FaPause, FaHeart, FaRegHeart } from "react-icons/fa";
// import { addLiked, removeLiked } from "../api";

// export default function RecommendationList({
//   items = [],
//   liked = [],
//   currentSong,
//   isPlaying,
//   progress,
//   duration,
//   onPlay,
//   onSeek
// }) {
//   const [localLiked, setLocalLiked] = useState(liked.map((x) => x.url));

//   if (!items.length) return null;

//   const isLiked = (song) => localLiked.includes(song.url);

//   const toggleLike = async (song) => {
//     if (isLiked(song)) {
//       await removeLiked(song);
//       setLocalLiked((l) => l.filter((u) => u !== song.url));
//     } else {
//       await addLiked(song);
//       setLocalLiked((l) => [...l, song.url]);
//     }
//   };

//   const formatTime = (sec) => {
//     if (!sec || isNaN(sec)) return "0:00";
//     const m = Math.floor(sec / 60);
//     const s = Math.floor(sec % 60);
//     return `${m}:${s < 10 ? "0" : ""}${s}`;
//   };

//   return (
//     <div className="section">
//       <h3 className="section-title">🎵 Recommended Songs</h3>
//       <div className="card-grid">
//         {items.map((x, i) => {
//           const cover = x.image || "https://source.unsplash.com/400x400/?music,album";
//           const isCurrent = currentSong === x.url;

//           return (
//             <div className="playlist-card" key={i} data-aos="zoom-in">
//               <div className="cover">
//                 <img src={cover} alt={x.title || "cover"} />
//                 <button
//                   className="play-fab"
//                   title={isCurrent && isPlaying ? "Pause" : "Play preview"}
//                   onClick={() => onPlay(x.url)}
//                 >
//                   {isCurrent && isPlaying ? <FaPause /> : <FaPlay />}
//                 </button>
//               </div>

//               {/* ✅ Progress bar */}
//               {isCurrent && (
//                 <div style={{ marginTop: "8px" }}>
//                   <div
//                     className="progress-bar"
//                     onClick={(e) => {
//                       const rect = e.currentTarget.getBoundingClientRect();
//                       const clickX = e.clientX - rect.left;
//                       const newProgress = clickX / rect.width;
//                       onSeek(newProgress);
//                     }}
//                     style={{ cursor: "pointer" }}
//                   >
//                     <div
//                       className="progress-fill"
//                       style={{ width: `${(progress || 0) * 100}%` }}
//                     />
//                   </div>
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       fontSize: "12px",
//                       color: "#aaa",
//                       marginTop: "2px",
//                     }}
//                   >
//                     <span>{formatTime((progress || 0) * duration)}</span>
//                     <span>{formatTime(duration)}</span>
//                   </div>
//                 </div>
//               )}

//               <div className="info">
//                 <div className="t">{x.title || "Unknown Title"}</div>
//                 <div className="s">{x.artist || "Unknown Artist"}</div>
//               </div>

//               <div className="row" style={{ justifyContent: "space-between", marginTop: 8 }}>
//                 <button className="btn ghost" onClick={() => toggleLike(x)}>
//                   {isLiked(x) ? <FaHeart /> : <FaRegHeart />} &nbsp; Like
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// import { useState } from "react";
// import { FaPlay, FaPause, FaHeart, FaRegHeart } from "react-icons/fa";
// import { addLiked, removeLiked, recordPlay } from "../api"; // ✅ add recordPlay

// export default function RecommendationList({
//   items = [],
//   liked = [],
//   currentSong,
//   isPlaying,
//   progress,
//   duration,
//   onPlay,
//   onSeek
// }) {
//   const [localLiked, setLocalLiked] = useState(liked.map((x) => x.url));

//   if (!items.length) return null;

//   const isLiked = (song) => localLiked.includes(song.url);

//   const toggleLike = async (song) => {
//     if (isLiked(song)) {
//       await removeLiked(song);
//       setLocalLiked((l) => l.filter((u) => u !== song.url));
//     } else {
//       await addLiked(song);
//       setLocalLiked((l) => [...l, song.url]);
//     }
//   };

//   const handlePlay = async (song) => {
//     // ✅ Play the song
//     onPlay(song.url);

//     // ✅ Record in Recently Played
//     await recordPlay(song);
//   };

//   const formatTime = (sec) => {
//     if (!sec || isNaN(sec)) return "0:00";
//     const m = Math.floor(sec / 60);
//     const s = Math.floor(sec % 60);
//     return `${m}:${s < 10 ? "0" : ""}${s}`;
//   };

//   return (
//     <div className="section">
//       <h3 className="section-title">🎵 Recommended Songs</h3>
//       <div className="card-grid">
//         {items.map((x, i) => {
//           const cover = x.image || "https://source.unsplash.com/400x400/?music,album";
//           const isCurrent = currentSong === x.url;

//           return (
//             <div className="playlist-card" key={i} data-aos="zoom-in">
//               <div className="cover">
//                 <img src={cover} alt={x.title || "cover"} />
//                 <button
//                   className="play-fab"
//                   title={isCurrent && isPlaying ? "Pause" : "Play preview"}
//                   onClick={() => handlePlay(x)} // ✅ use new function
//                 >
//                   {isCurrent && isPlaying ? <FaPause /> : <FaPlay />}
//                 </button>
//               </div>

//               {/* ✅ Progress bar */}
//               {isCurrent && (
//                 <div style={{ marginTop: "8px" }}>
//                   <div
//                     className="progress-bar"
//                     onClick={(e) => {
//                       const rect = e.currentTarget.getBoundingClientRect();
//                       const clickX = e.clientX - rect.left;
//                       const newProgress = clickX / rect.width;
//                       onSeek(newProgress);
//                     }}
//                     style={{ cursor: "pointer" }}
//                   >
//                     <div
//                       className="progress-fill"
//                       style={{ width: `${(progress || 0) * 100}%` }}
//                     />
//                   </div>
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       fontSize: "12px",
//                       color: "#aaa",
//                       marginTop: "2px",
//                     }}
//                   >
//                     <span>{formatTime((progress || 0) * duration)}</span>
//                     <span>{formatTime(duration)}</span>
//                   </div>
//                 </div>
//               )}

//               <div className="info">
//                 <div className="t">{x.title || "Unknown Title"}</div>
//                 <div className="s">{x.artist || "Unknown Artist"}</div>
//               </div>

//               <div className="row" style={{ justifyContent: "space-between", marginTop: 8 }}>
//                 <button className="btn ghost" onClick={() => toggleLike(x)}>
//                   {isLiked(x) ? <FaHeart /> : <FaRegHeart />} &nbsp; Like
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { FaPlay, FaPause, FaHeart, FaRegHeart } from "react-icons/fa";
import { addLiked, removeLiked, recordPlay } from "../api"; 
import { toast } from "react-toastify"; // ✅ feedback

export default function RecommendationList({
  items = [],
  liked = [],
  currentSong,
  isPlaying,
  progress,
  duration,
  onPlay,
  onSeek
}) {
  const [localLiked, setLocalLiked] = useState(liked.map((x) => x.url));

  if (!items.length) return null;

  const isLiked = (song) => localLiked.includes(song.url);

  const toggleLike = async (song) => {
    if (isLiked(song)) {
      await removeLiked(song);
      setLocalLiked((l) => l.filter((u) => u !== song.url));
      toast.info(`💔 Removed from Liked: ${song.title}`);
    } else {
      await addLiked(song);
      setLocalLiked((l) => [...l, song.url]);
      toast.success(`❤️ Added to Liked: ${song.title}`);
    }
  };

  const handlePlay = async (song) => {
    // ✅ Play the song
    onPlay(song.url);

    // ✅ Record in Recently Played
    await recordPlay(song);

    // ✅ Feedback
    toast(`🎶 Now Playing: ${song.title}`, { autoClose: 1500 });
  };

  const formatTime = (sec) => {
    if (!sec || isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="section">
      <h3
        className="section-title"
        data-aos="fade-right"
        data-aos-duration="1000"
      >
        🎵 Recommended Songs
      </h3>

      <div className="card-grid">
        {items.map((x, i) => {
          const cover =
            x.image || "https://source.unsplash.com/400x400/?music,album";
          const isCurrent = currentSong === x.url;

          return (
            <div
              className="playlist-card"
              key={i}
              data-aos="zoom-in-up"
              data-aos-delay={i * 120}
            >
              <div className="cover" data-aos="flip-left" data-aos-delay="200">
                <img src={cover} alt={x.title || "cover"} />
                <button
                  className="play-fab"
                  title={isCurrent && isPlaying ? "Pause" : "Play preview"}
                  onClick={() => handlePlay(x)}
                  data-aos="zoom-in"
                  data-aos-delay="400"
                >
                  {isCurrent && isPlaying ? <FaPause /> : <FaPlay />}
                </button>
              </div>

              {/* ✅ Progress bar */}
              {isCurrent && (
                <div
                  style={{ marginTop: "8px" }}
                  data-aos="fade-in"
                  data-aos-delay="500"
                >
                  <div
                    className="progress-bar"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickX = e.clientX - rect.left;
                      const newProgress = clickX / rect.width;
                      onSeek(newProgress);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <div
                      className="progress-fill"
                      style={{ width: `${(progress || 0) * 100}%` }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "12px",
                      color: "#aaa",
                      marginTop: "2px",
                    }}
                  >
                    <span>{formatTime((progress || 0) * duration)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              )}

              <div className="info" data-aos="fade-up" data-aos-delay="600">
                <div className="t">{x.title || "Unknown Title"}</div>
                <div className="s">{x.artist || "Unknown Artist"}</div>
              </div>

              <div
                className="row"
                style={{ justifyContent: "space-between", marginTop: 8 }}
              >
                <button
                  className="btn ghost"
                  onClick={() => toggleLike(x)}
                  data-aos="zoom-in"
                  data-aos-delay="700"
                >
                  {isLiked(x) ? <FaHeart /> : <FaRegHeart />} &nbsp; Like
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
