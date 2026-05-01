import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { fetchMovies, requests } from '../services/tmdb';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const genres = [
  { name: 'Action', fetchUrl: requests.fetchActionMovies },
  { name: 'Comedy', fetchUrl: requests.fetchComedyMovies },
  { name: 'Horror', fetchUrl: requests.fetchHorrorMovies },
  { name: 'Romance', fetchUrl: requests.fetchRomanceMovies },
  { name: 'Documentaries', fetchUrl: requests.fetchDocumentaries },
];

export default function Categories() {
  const [selectedGenre, setSelectedGenre] = useState(genres[0]);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const data = await fetchMovies(selectedGenre.fetchUrl);
      setMovies(data);
    }
    fetchData();
  }, [selectedGenre]);

  const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `https://image.tmdb.org/t/p/w500/${path}`;
  };

  return (
    <div className="bg-netflix-dark min-h-screen">
      <Navbar />
      <div className="pt-24 px-4 md:px-12">
        <h1 className="text-3xl text-white font-bold mb-6">TV Shows & Movies</h1>
        
        {/* Genre Selector */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide mb-8 pb-2">
          {genres.map((genre) => (
            <button
              key={genre.name}
              onClick={() => setSelectedGenre(genre)}
              className={`whitespace-nowrap px-4 py-2 rounded-full border transition-colors ${
                selectedGenre.name === genre.name 
                  ? 'bg-white text-black border-white' 
                  : 'bg-black text-white border-gray-600 hover:border-white'
              }`}
            >
              {genre.name}
            </button>
          ))}
        </div>

        {/* Grid of Movies */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <motion.div
              key={movie.id}
              whileHover={{ scale: 1.05 }}
              className="relative cursor-pointer group"
              onClick={() => navigate(`/watch/${movie.id}`, { state: { movie } })}
            >
              <img
                src={getImageUrl(movie.backdrop_path || movie.poster_path)}
                alt={movie.name || movie.title}
                className="rounded object-cover w-full h-full aspect-video"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded flex flex-col justify-end p-4">
                <h3 className="text-white text-sm font-bold">{movie.title || movie.name}</h3>
                <div className="text-xs text-green-400 font-semibold mt-1">
                  {movie.vote_average ? `${(movie.vote_average * 10).toFixed(0)}% Match` : 'New'}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
