import React, { useRef, useState, useEffect } from 'react';
import { useGlobal } from '../context/GlobalContext';

export default function VideoPlayer({ movie }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const { watchProgress, setWatchProgress } = useGlobal();

  // Load saved progress
  useEffect(() => {
    if (videoRef.current && watchProgress[movie.id]) {
      videoRef.current.currentTime = watchProgress[movie.id];
    }
  }, [movie.id, watchProgress]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setProgress((current / duration) * 100);
      
      // Save progress every few seconds (throttled conceptually here)
      if (Math.floor(current) % 5 === 0) {
        setWatchProgress(prev => ({
          ...prev,
          [movie.id]: current
        }));
      }
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative w-full h-screen bg-black group">
      {/* We use a placeholder video for demo purposes */}
      <video
        ref={videoRef}
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        className="w-full h-full object-contain"
        onTimeUpdate={handleTimeUpdate}
        onClick={togglePlay}
        autoPlay
      />
      
      {/* Controls Overlay */}
      <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-full h-1 bg-gray-600 cursor-pointer rounded overflow-hidden">
          <div 
            className="h-full bg-netflix-red transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center gap-4 mt-4">
          <button onClick={togglePlay} className="text-white hover:text-gray-300 transition-colors">
            {isPlaying ? (
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>
            ) : (
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>
          <div className="text-white text-xl font-medium">
            {movie.title || movie.name}
          </div>
        </div>
      </div>
    </div>
  );
}
