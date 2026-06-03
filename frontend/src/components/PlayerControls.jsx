import { Shuffle, SkipBack, Play, Pause, SkipForward, Repeat } from "lucide-react";

export default function PlayerControls({ isPlaying, onPlayPause }) {
  return (
    <div className="flex items-center justify-center space-x-6">
      {/* Shuffle */}
      <button className="text-gray-700 hover:text-green-500 transition">
        <Shuffle size={22} />
      </button>

      {/* Back */}
      <button className="text-gray-700 hover:text-green-500 transition">
        <SkipBack size={28} />
      </button>

      {/* Play / Pause (bigger in center) */}
      <button
        onClick={onPlayPause}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg"
      >
        {isPlaying ? <Pause size={28} /> : <Play size={28} />}
      </button>

      {/* Next */}
      <button className="text-gray-700 hover:text-green-500 transition">
        <SkipForward size={28} />
      </button>

      {/* Repeat */}
      <button className="text-gray-700 hover:text-green-500 transition">
        <Repeat size={22} />
      </button>
    </div>
  );
}
