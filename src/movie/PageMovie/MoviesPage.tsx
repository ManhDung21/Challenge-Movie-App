import { useState, useEffect } from 'react';
import { tmdbApi } from '../../services/Api';
import type { Movie } from '../Component/movie.types';
import MovieCard from '../Component/Card/MovieCard';
import { MovieGridSkeleton } from '../Component/Skeleton';

export default function MoviesPage() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [totalPages, setTotalPages] = useState(0);

    const [keyword, setKeyword] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    // Initial Load
    useEffect(() => {
        loadMovies(1);
    }, []);

    const loadMovies = async (pageNumber: number) => {
        try {
            if (pageNumber === 1) setIsLoading(true);
            else setIsLoadingMore(true);

            const response = await tmdbApi.getPopularMovies(pageNumber);

            if (pageNumber === 1) {
                setMovies(response.results);
            } else {
                setMovies(prev => [...prev, ...response.results]);
            }
            setTotalPages(response.total_pages);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
            setIsLoadingMore(false);
        }
    };

    const handleLoadMore = () => {
        if (page < totalPages) {
            const nextPage = page + 1;
            setPage(nextPage);
            loadMovies(nextPage);
        }
    };

    const handleSearch = async () => {
        if (keyword.trim()) {
            setIsSearching(true);
            setIsLoading(true);
            try {
                // Determine if we are searching or just filtering.
                // For API search, we usually just replace the list.
                // Assuming simple search for now (no load more for search in this basic version unless requested)
                const response = await tmdbApi.searchMovies(keyword);
                setMovies(response.results);
                setTotalPages(response.total_pages); // Update total pages for search results if pagination needed later
                setPage(1); // Reset page
            } catch (error) {
                console.error("Search failed", error);
            } finally {
                setIsLoading(false);
            }
        } else {
            // Reset to popular if search cleared
            setIsSearching(false);
            setPage(1);
            loadMovies(1);
        }
    };

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
                                    setPage(1);
                                    loadMovies(1);
                                }
                            }}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            className="w-full bg-black text-white py-2 pl-6 pr-12 rounded-full border border-[#141414] focus:outline-none focus:border-black transition-colors shadow-lg"
                        />
                        <button
                            onClick={handleSearch}
                            className="absolute right-0.5 top-0.5 bottom-0.5 px-12 bg-red-600 text-white rounded-full font-semibold shadow-[0_0_5px_10px_rgba(239,68,68,0.5)] hover:shadow-[0_0_10px_10px_rgba(239,68,68,0.6)] transition-all hover:scale-105 active:scale-95"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                {isLoading ? (
                    <MovieGridSkeleton count={10} />
                ) : (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8">
                            {movies.map((movie, index) => (
                                <div key={`${movie.id}-${index}`} className="w-full">
                                    <MovieCard movie={movie} />
                                </div>
                            ))}
                        </div>

                        {!isSearching && page < totalPages && (
                            <div className="flex justify-center mt-12">
                                <button
                                    onClick={handleLoadMore}
                                    disabled={isLoadingMore}
                                    className="px-8 py-2 bg-transparent border border-white text-white rounded-full hover:bg-white hover:text-red-600 transition-all duration-300 font-semibold disabled:opacity-50"
                                >
                                    {isLoadingMore ? 'Loading...' : 'Watch more'}
                                </button>
                            </div>
                        )}

                        {movies.length === 0 && (
                            <div className="text-center text-gray-400 py-20">
                                No movies found.
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
