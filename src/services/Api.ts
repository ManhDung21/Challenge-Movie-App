import type { MovieDetails, Credits, VideosResponse, MoviesResponse, TVResponse } from '../movie.types';

// TMDB API Key (v3 auth)
const API_KEY = '7e8bcfdb60f5c663001a7985eeff6d87';

const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Image size helpers
export const getImageUrl = (path: string | null, size: 'w200' | 'w500' | 'original' = 'w500'): string => {
    if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
    return `${IMAGE_BASE_URL}/${size}${path}`;
};

// Generic fetch helper
async function fetchFromTMDB<T>(endpoint: string): Promise<T> {
    const url = `${BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`TMDB API Error: ${response.statusText}`);
    }

    return response.json();
}

// API Methods
export const tmdbApi = {
    // Get trending movies
    getTrending: (page: number = 1): Promise<MoviesResponse> => {
        return fetchFromTMDB<MoviesResponse>(`/trending/movie/week?page=${page}`);
    },

    // Get popular movies
    getPopularMovies: (page: number = 1): Promise<MoviesResponse> => {
        return fetchFromTMDB<MoviesResponse>(`/movie/popular?page=${page}`);
    },

    // Get now playing movies
    getNowPlaying: (page: number = 1): Promise<MoviesResponse> => {
        return fetchFromTMDB<MoviesResponse>(`/movie/now_playing?page=${page}`);
    },

    // Get top rated movies
    getTopRated: (page: number = 1): Promise<MoviesResponse> => {
        return fetchFromTMDB<MoviesResponse>(`/movie/top_rated?page=${page}`);
    },

    // Search movies
    searchMovies: (query: string, page: number = 1): Promise<MoviesResponse> => {
        const encodedQuery = encodeURIComponent(query);
        return fetchFromTMDB<MoviesResponse>(`/search/movie?query=${encodedQuery}&page=${page}`);
    },

    // Get movie details
    getMovieDetails: (movieId: number): Promise<MovieDetails> => {
        return fetchFromTMDB<MovieDetails>(`/movie/${movieId}`);
    },

    // Get movie credits (cast & crew)
    getMovieCredits: (movieId: number): Promise<Credits> => {
        return fetchFromTMDB<Credits>(`/movie/${movieId}/credits`);
    },

    // Get movie videos (trailers, teasers)
    getMovieVideos: (movieId: number): Promise<VideosResponse> => {
        return fetchFromTMDB<VideosResponse>(`/movie/${movieId}/videos`);
    },

    // Get upcoming movies
    getUpcoming: (page: number = 1): Promise<MoviesResponse> => {
        return fetchFromTMDB<MoviesResponse>(`/movie/upcoming?page=${page}`);
    },

    // Get similar movies
    getSimilarMovies: (movieId: number): Promise<MoviesResponse> => {
        return fetchFromTMDB<MoviesResponse>(`/movie/${movieId}/similar`);
    },

    // TV Series Methods
    getPopularTV: (page: number = 1): Promise<TVResponse> => {
        return fetchFromTMDB<TVResponse>(`/tv/popular?page=${page}`);
    },

    getTopRatedTV: (page: number = 1): Promise<TVResponse> => {
        return fetchFromTMDB<TVResponse>(`/tv/top_rated?page=${page}`);
    },

    getOnTheAirTV: (page: number = 1): Promise<TVResponse> => {
        return fetchFromTMDB<TVResponse>(`/tv/on_the_air?page=${page}`);
    },

    // Search TV
    searchTV: (query: string, page: number = 1): Promise<TVResponse> => {
        const encodedQuery = encodeURIComponent(query);
        return fetchFromTMDB<TVResponse>(`/search/tv?query=${encodedQuery}&page=${page}`);
    },
};
