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
        <div className="group/card relative block aspect-[2/3] rounded-xl overflow-hidden cursor-pointer animate-scale-in">
            <Link to={linkPath} className="block w-full h-full">
                <div className="w-full h-full transform transition-transform duration-500 group-hover/card:scale-110">
                    <img
                        src={getImageUrl(movie.poster_path, 'w500')}
                        alt={title}
                        className="w-full h-full object-cover transition-all duration-300 group-hover/card:brightness-50"
                        loading="lazy"
                    />
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 z-20">
                    <div className="w-24 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:shadow-[0_0_50px_rgba(220,38,38,0.8)] transform scale-0 group-hover/card:scale-100 transition-all duration-300 delay-100">
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>

                {/* Hover Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                    <h3 className="text-white font-bold text-xl leading-tight mb-2 line-clamp-2 transition-all duration-300 group-hover/card:text-red-500 opacity-0 group-hover/card:opacity-100 transform scale-50 group-hover/card:scale-100 origin-bottom-left">
                        {title}
                    </h3>
                </div>
            </Link>
        </div>
    );
}
