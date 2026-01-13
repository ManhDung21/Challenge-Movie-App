import { useState, useEffect } from 'react';
import { tmdbApi } from '../../services/tmdbApi';
import type { Movie } from '../types/movie.types';
import MovieRow from '../MovieRow';
import MovieCard from '../MovieCard';
import { MovieGridSkeleton } from '../Skeleton';

export default function MoviesPage() {
    const [trending, setTrending] = useState<Movie[]>([]);
    const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
    const [topRated, setTopRated] = useState<Movie[]>([]);
    const [upcoming, setUpcoming] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [keyword, setKeyword] = useState('');
    const [searchResults, setSearchResults] = useState<Movie[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setIsLoading(true);
            const [trendingDat, nowPlayingData, topRatedData, upcomingData] = await Promise.all([
                tmdbApi.getTrending(1),
                tmdbApi.getNowPlaying(1),
                tmdbApi.getTopRated(1),
                tmdbApi.getUpcoming(1),
            ]);

            setTrending(trendingDat.results);
            setNowPlaying(nowPlayingData.results);
            setTopRated(topRatedData.results);
            setUpcoming(upcomingData.results);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = async () => {
        if (keyword.trim()) {
            setIsSearching(true);
            try {
                const response = await tmdbApi.searchMovies(keyword);
                setSearchResults(response.results);
            } catch (error) {
                console.error("Search failed", error);
            }
        } else {
            setIsSearching(false);
            setSearchResults([]);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#141414] pt-12 px-8">
                <MovieGridSkeleton count={8} />
            </div>
        );
    }

    return (
        <div className="min-h-screen text-white bg-[#141414]">
            {/* Page Header */}
            <div className="relative pt-32 pb-12 bg-gradient-to-b from-white/90 to-[#141414]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-start">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center w-full">Movies</h1>
                    <div className="relative w-full max-w-xl">
                        <input
                            type="text"
                            placeholder="Enter keyword"
                            value={keyword}
                            onChange={(e) => {
                                setKeyword(e.target.value);
                                if (!e.target.value.trim()) {
                                    setIsSearching(false);
                                    setSearchResults([]);
                                }
                            }}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            className="w-full bg-black text-white py-3 pl-6 pr-28 rounded-full border border-[#2b2b2b] focus:outline-none focus:border-black transition-colors shadow-lg"
                        />
                        <button
                            onClick={handleSearch}
                            className="absolute right-0.5 top-0.5 bottom-0.5 px-10 bg-red-600 text-white rounded-full font-semibold shadow-[0_0_5px_10px_rgba(239,68,68,0.5)] hover:shadow-[0_0_10px_10px_rgba(239,68,68,0.6)] transition-all hover:scale-105 active:scale-95"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>

            <div className="space-y-8 pb-12">
                {isSearching ? (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-bold mb-6">Search Results for "{keyword}"</h2>
                        {searchResults.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                {searchResults.map((movie) => (
                                    <MovieCard key={movie.id} movie={movie} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-gray-400 py-12">
                                No movies found matching your search.
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <MovieRow title="Trending Movies" movies={trending} />
                        <MovieRow title="Now Playing" movies={nowPlaying} />
                        <MovieRow title="Top Rated" movies={topRated} />
                        <MovieRow title="Coming Soon" movies={upcoming} />
                    </>
                )}
            </div>
        </div>
    );
}
