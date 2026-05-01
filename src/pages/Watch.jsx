import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import { ArrowLeft } from 'lucide-react';

export default function Watch() {
  const location = useLocation();
  const navigate = useNavigate();
  const movie = location.state?.movie;

  if (!movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white flex-col gap-4">
        <h2>Video not found</h2>
        <button onClick={() => navigate('/')} className="bg-white text-black px-4 py-2 rounded">
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="absolute top-4 left-4 z-50">
        <button 
          onClick={() => navigate(-1)}
          className="text-white hover:text-gray-300 transition-colors p-2"
        >
          <ArrowLeft className="w-8 h-8" />
        </button>
      </div>
      
      <VideoPlayer movie={movie} />

      <div className="max-w-4xl mx-auto px-4 py-12 text-white">
        <h1 className="text-4xl font-bold mb-4">{movie.title || movie.name}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
          <span className="text-green-400 font-semibold">{movie.vote_average ? `${(movie.vote_average * 10).toFixed(0)}% Match` : 'New'}</span>
          <span>{movie.release_date?.substring(0, 4) || '2024'}</span>
          <span className="border border-gray-600 px-1 rounded">HD</span>
        </div>
        <p className="text-lg leading-relaxed text-gray-300">
          {movie.overview}
        </p>
      </div>
    </div>
  );
}
