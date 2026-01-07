import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { tmdbApi } from '../../services/tmdbApi';
import { useDebounce } from '../../hooks/useDebounce';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import type { Movie } from '../types/movie.types';
import MovieCard from '../MovieCard';
import { MovieGridSkeleton } from '../Skeleton';

export default function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('q') || '');
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Pagination state
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    // Debounce search query
    const debouncedQuery = useDebounce(query, 500);

    // Search when debounced query changes
    useEffect(() => {
        if (debouncedQuery.trim()) {
            // Reset state for new search
            setPage(1);
            setHasMore(true);
            setMovies([]);
            loadMovies(debouncedQuery, 1);
            setSearchParams({ q: debouncedQuery });
        } else {
            setMovies([]);
            setSearchParams({});
        }
    }, [debouncedQuery]);

    const loadMovies = async (searchQuery: string, pageNum: number) => {
        try {
            setIsLoading(true);
            const response = await tmdbApi.searchMovies(searchQuery, pageNum);

            if (pageNum === 1) {
                setMovies(response.results);
            } else {
                // Deduplicate movies just in case
                setMovies(prev => {
                    const existingIds = new Set(prev.map(m => m.id));
                    const newMovies = response.results.filter(m => !existingIds.has(m.id));
                    return [...prev, ...newMovies];
                });
            }

            // Check if we have more pages
            setHasMore(pageNum < response.total_pages);
        } catch (error) {
            console.error('Error searching movies:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const loadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        loadMovies(debouncedQuery, nextPage);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    // Infinite scroll hook
    const observerTarget = useInfiniteScroll({
        onLoadMore: loadMore,
        hasMore,
        isLoading,
    });

    return (
        <div className="min-h-screen text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                {/* Search Input - YouTube style */}
                <div className="max-w-2xl mx-auto mb-8">
                    <div className="relative">
                        <input
                            type="text"
                            value={query}
                            onChange={handleSearch}
                            placeholder="Search for movies..."
                            className="w-full px-4 py-3 pr-12 bg-[#2b2b2b] border border-[#404040] text-white rounded-full focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all placeholder-gray-400"
                        />
                        <button className="absolute right-0 top-0 h-full px-6 text-gray-400 hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Results */}
                {movies.length > 0 ? (
                    <>
                        <h2 className="text-2xl font-bold text-white mb-6">
                            Search Results ({movies.length}+)
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {movies.map(movie => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>

                        {/* Loading indicator for infinite scroll */}
                        {isLoading && (
                            <div className="mt-8">
                                <MovieGridSkeleton count={4} />
                            </div>
                        )}

                        {/* Infinite Scroll Trigger */}
                        <div ref={observerTarget} className="h-4" />

                        {!hasMore && movies.length > 0 && (
                            <div className="text-center py-8 text-gray-500">
                                No more results to show
                            </div>
                        )}
                    </>
                ) : isLoading ? (
                    <MovieGridSkeleton count={12} />
                ) : query.trim() ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No results found for "{query}"</p>
                        <p className="text-gray-400 mt-2">Try different keywords</p>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-400 text-lg">Start typing to search for movies</p>
                    </div>
                )}
            </div>
        </div>
    );
}
