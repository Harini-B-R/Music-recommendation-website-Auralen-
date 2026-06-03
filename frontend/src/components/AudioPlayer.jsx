// export default function AudioPlayer({ url, title }) {
//   const isYouTube = /youtube\.com|youtu\.be/.test(url);
//   if (isYouTube) return null;

//   return (
//     <div>
//       <audio controls preload="none" style={{ width: "100%" }}>
//         <source src={url} type="audio/mpeg" /> {/* ✅ mp3 */}
//         Your browser does not support the audio element.
//       </audio>
//       <div className="small">Local audio: {title}</div>
//     </div>
//   );
// }

// import { useRef } from "react";
// import { recordPlay } from "../api";

// export default function AudioPlayer({ url, title, image, artist, mood }) {
//   const ref = useRef(null);
//   const isYouTube = /youtube\.com|youtu\.be/.test(url);
//   if (isYouTube) return null;

//   const onPlay = async () => {
//     await recordPlay({ title, url, image, artist, mood });
//   };

//   return (
//     <div>
//       <audio ref={ref} controls preload="none" style={{ width: "100%" }} onPlay={onPlay}>
//         <source src={url} type="audio/mpeg" />
//         <source src={url} type="audio/wav" />
//         Your browser does not support the audio element.
//       </audio>
//     </div>
//   );
// }
import { useRef } from "react";
import { recordPlay } from "../api";

export default function AudioPlayer({ url, title, image, artist, mood }) {
  const ref = useRef(null);
  const isYouTube = /youtube\.com|youtu\.be/.test(url);
  if (isYouTube) return null;

  const onPlay = async () => {
    // send to backend
    await recordPlay({ title, url, image, artist, mood });

    // ✅ Save to localStorage for Recently Played
    let history = JSON.parse(localStorage.getItem("recentlyPlayed")) || [];
    history = history.filter((h) => h.url !== url); // remove duplicate
    history.unshift({ title, url, image, artist, mood }); // add to front
    if (history.length > 20) history.pop(); // keep max 20
    localStorage.setItem("recentlyPlayed", JSON.stringify(history));
  };

  return (
    <div>
      <audio
        ref={ref}
        controls
        preload="none"
        style={{ width: "100%" }}
        onPlay={onPlay}
      >
        <source src={url} type="audio/mpeg" />
        <source src={url} type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
      <div className="small">{title}</div>
    </div>
  );
}
