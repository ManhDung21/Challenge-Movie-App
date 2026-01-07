import { useState, useEffect } from 'react';
import { tmdbApi } from '../../services/tmdbApi';
import type { TVShow } from '../types/movie.types';
import MovieRow from '../MovieRow';
import { MovieGridSkeleton } from '../Skeleton';

export default function TVSeriesPage() {
    const [popular, setPopular] = useState<TVShow[]>([]);
    const [topRated, setTopRated] = useState<TVShow[]>([]);
    const [onTheAir, setOnTheAir] = useState<TVShow[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setIsLoading(true);
            const [popularData, topRatedData, onTheAirData] = await Promise.all([
                tmdbApi.getPopularTV(1),
                tmdbApi.getTopRatedTV(1),
                tmdbApi.getOnTheAirTV(1),
            ]);

            setPopular(popularData.results);
            setTopRated(topRatedData.results);
            setOnTheAir(onTheAirData.results);
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
                <h1 className="text-3xl font-bold mb-8 border-l-4 border-red-600 pl-4 ml-8">TV Series</h1>
                <MovieRow title="Popular Shows" movies={popular} />
                <MovieRow title="Top Rated TV" movies={topRated} />
                <MovieRow title="On The Air" movies={onTheAir} />
            </div>
        </div>
    );
}
