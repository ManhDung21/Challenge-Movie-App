import { useEffect, useState } from 'react';
import { tmdbApi } from '../services/Api';
import type { Movie } from '../movie.types';
import MovieRow from '../components/Card/MovieRow';
import { MovieGridSkeleton } from '../components/Card/Skeleton';
import HeroCarousel from '../components/Card/HeroCarousel';

export default function HomePage() {
    const [trending, setTrending] = useState<Movie[]>([]);
    const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
    const [topRated, setTopRated] = useState<Movie[]>([]);
    const [upcoming, setUpcoming] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
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
            } catch (err) {
                console.error('Failed to fetch home movies', err);
                setError('Failed to load movies.');
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    return (
        <div className="text-white">
            {/* Draggable Banner Section */}
            {!isLoading && trending.length > 0 && (
                <HeroCarousel movies={trending} />
            )}

            <div className="relative z-10 pb-6 md:pb-12">
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
