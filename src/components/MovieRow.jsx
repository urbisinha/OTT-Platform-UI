import React, { useEffect, useState, useRef } from 'react';
import { fetchMovies } from '../services/tmdb';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function MovieRow({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const rowRef = useRef(null);
  const navigate = useNavigate();
  const [isMoved, setIsMoved] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchMovies(fetchUrl);
      setMovies(data);
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = (direction) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `https://image.tmdb.org/t/p/w500/${path}`;
  };

  return (
    <div className="space-y-0.5 md:space-y-2 px-4 md:px-12 py-4">
      <h2 className="text-white font-semibold md:text-xl lg:text-2xl hover:text-gray-300 transition-colors cursor-pointer">
        {title}
      </h2>
      <div className="group relative">
        <ChevronLeft 
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 text-white bg-black/50 rounded-full p-1 ${!isMoved && 'hidden'}`}
          onClick={() => handleClick('left')}
        />
        
        <div 
          ref={rowRef} 
          className="flex items-center gap-2 md:gap-4 overflow-x-scroll scrollbar-hide py-4"
        >
          {movies.map((movie) => (
            <motion.div
              key={movie.id}
              whileHover={{ scale: 1.05, zIndex: 50 }}
              transition={{ duration: 0.2 }}
              className="relative min-w-[160px] md:min-w-[240px] cursor-pointer"
              onClick={() => navigate(`/watch/${movie.id}`, { state: { movie } })}
            >
              <img
                src={getImageUrl(movie.backdrop_path || movie.poster_path)}
                alt={movie.name || movie.title}
                className="rounded-sm md:rounded object-cover w-full h-full aspect-video"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-sm md:rounded flex flex-col justify-end p-2 md:p-4">
                <h3 className="text-white text-sm md:text-base font-bold">{movie.title || movie.name}</h3>
                <div className="flex items-center gap-2 text-xs text-green-400 font-semibold mt-1">
                  <span>{movie.vote_average ? `${(movie.vote_average * 10).toFixed(0)}% Match` : 'New'}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <ChevronRight 
          className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 text-white bg-black/50 rounded-full p-1"
          onClick={() => handleClick('right')}
        />
      </div>
    </div>
  );
}
