// TypeScript types for TMDB API
export interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    backdrop_path: string | null;
    overview: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
    genre_ids: number[];
}

export interface MovieDetails extends Movie {
    runtime: number;
    genres: Genre[];
    tagline: string;
    status: string;
    budget: number;
    revenue: number;
}

export interface Genre {
    id: number;
    name: string;
}

export interface Cast {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
    order: number;
}

export interface Credits {
    cast: Cast[];
    crew: any[];
}

export interface Video {
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
    official: boolean;
}

export interface VideosResponse {
    results: Video[];
}

export interface MoviesResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

// TV Show Types
export interface TVShow {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
    overview: string;
    first_air_date: string;
    vote_average: number;
    vote_count: number;
    genre_ids: number[];
}

export interface TVResponse {
    page: number;
    results: TVShow[];
    total_pages: number;
    total_results: number;
}
