import { useState, useEffect } from 'react';
import { tmdbApi } from '../../services/tmdbApi';
import type { Movie } from '../types/movie.types';
import MovieRow from '../MovieRow';
import { MovieGridSkeleton } from '../Skeleton';
import HeroCarousel from '../HeroCarousel';

export default function HomePage() {
    const [trending, setTrending] = useState<Movie[]>([]);
    const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
    const [topRated, setTopRated] = useState<Movie[]>([]);
    const [upcoming, setUpcoming] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch initial data
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setIsLoading(true);

            // Parallel fetch from multiple endpoints
            const [trendingData, nowPlayingData, topRatedData, upcomingData] = await Promise.all([
                tmdbApi.getTrending(1),
                tmdbApi.getNowPlaying(1),
                tmdbApi.getTopRated(1),
                tmdbApi.getUpcoming(1),
            ]);

            setTrending(trendingData.results);
            setNowPlaying(nowPlayingData.results);
            setTopRated(topRatedData.results);
            setUpcoming(upcomingData.results);

        } catch (error) {
            console.error('Error loading movies:', error);
            setError('Failed to load movies. Please check your API key or internet connection.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen text-white pb-20 md:pb-0">
            {/* Draggable Banner Section */}
            {!isLoading && trending.length > 0 && (
                <HeroCarousel movies={trending} />
            )}

            <div className="relative z-10 pb-12">
                {error && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                        <div className="bg-red-900/50 border-l-4 border-red-500 p-4">
                            <p className="text-red-200">{error}</p>
                        </div>
                    </div>
                )}

                {isLoading ? (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
                        <MovieGridSkeleton count={4} />
                    </div>
                ) : (
                    <div className="space-y-8 mt-12">
                        <MovieRow title="Trending Now" movies={trending} viewMoreLink="/movie" />
                        <MovieRow title="New Releases" movies={nowPlaying} viewMoreLink="/movie" />
                        <MovieRow title="Top Rated" movies={topRated} viewMoreLink="/movie" />
                        <MovieRow title="Coming Soon" movies={upcoming} viewMoreLink="/movie" />

                    </div>
                )}
            </div>
        </div>
    );
}
