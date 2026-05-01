import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import { requests } from '../services/tmdb';
import { useGlobal } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { profile } = useGlobal();
  const navigate = useNavigate();

  useEffect(() => {
    if (!profile) {
      navigate('/profiles');
    }
  }, [profile, navigate]);

  if (!profile) return null;

  return (
    <div className="bg-netflix-dark min-h-screen pb-12">
      <Navbar />
      <Hero />
      <div className="-mt-16 relative z-20 md:-mt-32 pb-8">
        <MovieRow title="Trending Now" fetchUrl={requests.fetchTrending} />
        <MovieRow title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} />
        <MovieRow title="Top Rated" fetchUrl={requests.fetchTopRated} />
        <MovieRow title="Action Thrillers" fetchUrl={requests.fetchActionMovies} />
        <MovieRow title="Comedy" fetchUrl={requests.fetchComedyMovies} />
        <MovieRow title="Scary Movies" fetchUrl={requests.fetchHorrorMovies} />
        <MovieRow title="Romance" fetchUrl={requests.fetchRomanceMovies} />
        <MovieRow title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
      </div>
    </div>
  );
}
