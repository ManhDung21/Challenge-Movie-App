import { Link } from 'react-router-dom';
import { getImageUrl } from '../services/tmdbApi';
import type { Movie, TVShow } from './types/movie.types';

interface MovieCardProps {
    movie: Movie | TVShow;
}

export default function MovieCard({ movie }: MovieCardProps) {
    const title = 'title' in movie ? movie.title : movie.name;

    const linkPath = 'title' in movie ? `/movie/${movie.id}` : `/tv/${movie.id}`; // Assuming separate details page for TV later, or reuse movie details

    return (

        <div className="group/card relative block cursor-pointer animate-scale-in">
            <Link to={linkPath} className="block w-full">
                <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden">
                    <div className="w-full h-full transform transition-transform duration-500 group-hover/card:scale-110">
                        <img
                            src={getImageUrl(movie.poster_path, 'w500')}
                            alt={title}
                            className="w-full h-full object-cover transition-all duration-300 group-hover/card:brightness-90"
                            loading="lazy"
                        />
                    </div>

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 z-20">
                        <div className="w-20 h-12 md:w-23 md:h-14 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_5px_10px_rgba(239,68,68,0.5)] hover:shadow-[0_0_10px_15px_rgba(239,68,68,0.5)] transform scale-0 group-hover/card:scale-100 transition-all duration-300 delay-100">
                            {/* Adjusted button style slightly to be more Youtube-like or just standard play */}
                            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Title Below */}
                <div className="mt-3">
                    <h3 className="text-white font-medium text-base leading-tight line-clamp-1 group-hover/card:text-red-500 transition-colors">
                        {title}
                    </h3>
                    {/* Optional: Add year or secondary info if desired later, keeping it simple for now */}
                </div>
            </Link>
        </div>
    );
}
