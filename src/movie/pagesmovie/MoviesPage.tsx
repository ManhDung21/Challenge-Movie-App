import { useState, useEffect } from 'react';
import { tmdbApi } from '../../services/tmdbApi';
import type { Movie } from '../types/movie.types';
import MovieRow from '../MovieRow';
import { MovieGridSkeleton } from '../Skeleton';

export default function MoviesPage() {
    const [trending, setTrending] = useState<Movie[]>([]);
    const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
    const [topRated, setTopRated] = useState<Movie[]>([]);
    const [upcoming, setUpcoming] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(true);

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

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#141414] pt-24 px-8">
                <MovieGridSkeleton count={8} />
            </div>
        );
    }

    return (
        <div className="min-h-screen text-white pt-24 pb-12">
            <div className="space-y-8">
                <h1 className="text-3xl font-bold mb-8 border-l-4 border-red-600 pl-4 ml-8">Movies</h1>
                <MovieRow title="Trending Movies" movies={trending} />
                <MovieRow title="Now Playing" movies={nowPlaying} />
                <MovieRow title="Top Rated" movies={topRated} />
                <MovieRow title="Coming Soon" movies={upcoming} />
            </div>
        </div>
    );
}
