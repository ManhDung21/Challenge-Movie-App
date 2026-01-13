import type { Movie, TVShow } from './types/movie.types';
import MovieCard from './MovieCard';

interface MovieRowProps {
    title: string;
    movies: (Movie | TVShow)[];
}

export default function MovieRow({ title, movies }: MovieRowProps) {


    return (
        <div className="mb-8">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 px-4 sm:px-6 lg:px-8 border-l-4 border-red-600 ml-4 sm:ml-6 lg:ml-8">
                {title}
            </h2>
            <div className="relative group overflow-hidden pl-4 md:pl-8">
                <div
                    className="flex space-x-4 animate-scroll w-max"
                >
                    {/* Original Set */}
                    {movies.map((movie, index) => (
                        <div key={`${movie.id}-${index}`} className="w-[140px] md:w-[250px] flex-none">
                            <MovieCard movie={movie} />
                        </div>
                    ))}
                    {/* Duplicated Set for Infinite Scroll */}
                    {movies.map((movie, index) => (
                        <div key={`${movie.id}-${index}-duplicate`} className="w-[140px] md:w-[250px] flex-none">
                            <MovieCard movie={movie} />
                        </div>
                    ))}
                </div>

                {/* Gradient Masks */}
                <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black to-transparent pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black to-transparent pointer-events-none" />
            </div>
        </div>
    );
}
