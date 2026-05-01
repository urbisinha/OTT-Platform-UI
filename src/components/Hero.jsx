import React, { useEffect, useState } from 'react';
import { Play, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchMovies, requests } from '../services/tmdb';
import { motion } from 'framer-motion';

export default function Hero() {
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const data = await fetchMovies(requests.fetchTrending);
      setMovie(data[Math.floor(Math.random() * data.length)]);
    }
    fetchData();
  }, []);

  if (!movie) return <div className="h-[70vh] bg-netflix-dark animate-pulse"></div>;

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `https://image.tmdb.org/t/p/original/${path}`;
  };

  return (
    <div className="relative h-[85vh] text-white w-full">
      <div className="absolute w-full h-full">
        <img
          src={getImageUrl(movie?.backdrop_path)}
          alt={movie?.title || movie?.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-dark via-transparent to-transparent" />
      </div>

      <div className="absolute top-[30%] md:top-[40%] px-4 md:px-12 max-w-2xl">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg"
        >
          {movie?.title || movie?.name || movie?.original_name}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl font-medium text-gray-300 drop-shadow mb-6"
        >
          {truncate(movie?.overview, 150)}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center gap-4"
        >
          <button 
            onClick={() => navigate(`/watch/${movie.id}`, { state: { movie } })}
            className="flex items-center gap-2 bg-white text-black px-6 md:px-8 py-2 md:py-3 rounded font-bold hover:bg-white/80 transition-colors"
          >
            <Play fill="currentColor" className="w-5 h-5 md:w-6 md:h-6" /> Play
          </button>
          <button className="flex items-center gap-2 bg-gray-500/70 text-white px-6 md:px-8 py-2 md:py-3 rounded font-bold hover:bg-gray-500/50 transition-colors">
            <Info className="w-5 h-5 md:w-6 md:h-6" /> More Info
          </button>
        </motion.div>
      </div>
    </div>
  );
}
