import axios from 'axios';

// Fallback mock data to ensure the UI looks great even without an API key.
import { mockMovies } from '../data/mockData';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'YOUR_API_KEY_HERE';
const BASE_URL = 'https://api.themoviedb.org/3';

const instance = axios.create({
  baseURL: BASE_URL,
});

export const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

// Helper function with fallback to mock data if API fails
export const fetchMovies = async (url) => {
  const getShuffledMockData = () => {
    return [...mockMovies].sort(() => 0.5 - Math.random());
  };

  try {
    if (API_KEY === 'YOUR_API_KEY_HERE') {
      console.warn("No TMDB API key provided. Using mock data.");
      return getShuffledMockData();
    }
    const response = await instance.get(url);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching from TMDB, using mock data fallback:", error);
    return getShuffledMockData(); // Fallback
  }
};

export default instance;
