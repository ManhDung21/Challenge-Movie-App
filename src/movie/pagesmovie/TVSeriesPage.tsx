import { useState, useEffect } from 'react';
import { tmdbApi } from '../../services/tmdbApi';
import type { TVShow } from '../types/movie.types';
import MovieCard from '../MovieCard';
import { MovieGridSkeleton } from '../Skeleton';

export default function TVSeriesPage() {
    const [tvShows, setTvShows] = useState<TVShow[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [totalPages, setTotalPages] = useState(0);

    const [keyword, setKeyword] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    // Initial Load
    useEffect(() => {
        loadTvShows(1);
    }, []);

    const loadTvShows = async (pageNumber: number) => {
        try {
            if (pageNumber === 1) setIsLoading(true);
            else setIsLoadingMore(true);

            // Use getPopularTV as default list
            const response = await tmdbApi.getPopularTV(pageNumber);

            if (pageNumber === 1) {
                setTvShows(response.results);
            } else {
                setTvShows(prev => [...prev, ...response.results]);
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
            loadTvShows(nextPage);
        }
    };

    const handleSearch = async () => {
        if (keyword.trim()) {
            setIsSearching(true);
            setIsLoading(true);
            try {
                const response = await tmdbApi.searchTV(keyword);
                setTvShows(response.results);
                setTotalPages(response.total_pages);
                setPage(1);
            } catch (error) {
                console.error("Search failed", error);
            } finally {
                setIsLoading(false);
            }
        } else {
            setIsSearching(false);
            setPage(1);
            loadTvShows(1);
        }
    };

    return (
        <div className="min-h-screen text-white bg-[#141414]">
            {/* Page Header */}
            <div className="relative pt-32 pb-12 bg-gradient-to-b from-white/90 to-[#141414]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-start">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center w-full">TV Series</h1>
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
                                    loadTvShows(1);
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
                            {tvShows.map((show, index) => (
                                <div key={`${show.id}-${index}`} className="w-full">
                                    <MovieCard movie={show} />
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

                        {tvShows.length === 0 && (
                            <div className="text-center text-gray-400 py-20">
                                No TV shows found.
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
