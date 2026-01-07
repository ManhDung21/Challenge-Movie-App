import { useState, useEffect } from 'react';
import { tmdbApi, getImageUrl } from '../../services/tmdbApi';
import type { Movie } from '../types/movie.types';
import MovieRow from '../MovieRow';
import { MovieGridSkeleton } from '../Skeleton';

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
        <div className="min-h-screen text-white">
            {/* Hero Section */}
            {/* Hero Section */}
            <div
                className="relative h-screen w-full bg-cover bg-center"
                style={{
                    backgroundImage: trending[0] ? `url('${getImageUrl(trending[0].backdrop_path, 'original')}')` : undefined
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                        {trending[0] && (
                            <div className="flex flex-col md:flex-row items-center w-full gap-8 pt-16">
                                {/* Left Content */}
                                <div className="flex-1 space-y-6 max-w-2xl">
                                    <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight drop-shadow-xl">
                                        {trending[0].title}
                                    </h1>

                                    <p className="text-gray-300 text-lg md:text-xl line-clamp-3 leading-relaxed drop-shadow-md">
                                        {trending[0].overview}
                                    </p>

                                    <div className="flex items-center space-x-4 pt-4">
                                        <button className="px-8 py-3 bg-red-600 text-white rounded-full font-bold transition-all shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:shadow-[0_0_50px_rgba(220,38,38,0.8)] transform hover:scale-105 active:scale-95">
                                            Watch now
                                        </button>
                                        <button className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-black transition-all">
                                            Watch trailer
                                        </button>
                                    </div>
                                </div>

                                {/* Right Poster */}
                                <div className="hidden md:block w-[350px] flex-shrink-0">
                                    <div className="rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 border-4 border-white/10">
                                        <img
                                            src={getImageUrl(trending[0].poster_path, 'w500')}
                                            alt={trending[0].title}
                                            className="w-full h-auto object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

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
                        <MovieRow title="Trending Now" movies={trending} />
                        <MovieRow title="New Releases" movies={nowPlaying} />
                        <MovieRow title="Top Rated" movies={topRated} />
                        <MovieRow title="Coming Soon" movies={upcoming} />
                    </div>
                )}
            </div>
        </div>
    );
}
