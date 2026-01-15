import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Fade from 'embla-carousel-fade';
import type { Movie } from './types/movie.types';
import { getImageUrl } from '../services/tmdbApi';

interface HeroCarouselProps {
    movies: Movie[];
}

export default function HeroCarousel({ movies }: HeroCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 20 }, [Fade()]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Update index on select
    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
        return () => {
            emblaApi.off('select', onSelect);
            emblaApi.off('reInit', onSelect);
        };
    }, [emblaApi, onSelect]);

    const displayMovies = movies.slice(0, 10);

    if (displayMovies.length === 0) return null;

    return (
        <div className="relative w-full h-[80vh] md:h-screen overflow-hidden bg-black group">
            <div className="overflow-hidden h-full" ref={emblaRef}>
                <div className="flex h-full touch-pan-y">
                    {displayMovies.map((movie, index) => (
                        <div
                            key={movie.id}
                            className="relative flex-[0_0_100%] w-full h-full"
                        >
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-out"
                                style={{
                                    backgroundImage: `url('${getImageUrl(movie.backdrop_path, 'original')}')`,
                                    transform: index === selectedIndex ? 'scale(1.05)' : 'scale(1.0)'
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8">
                                    <div className="flex-1 text-center md:text-left space-y-4">
                                        <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg ${index === selectedIndex ? 'animate-fade-in-up' : 'opacity-0'}`}>
                                            {movie.title}
                                        </h1>
                                        <p className={`text-lg md:text-xl text-gray-200 line-clamp-3 max-w-2xl drop-shadow-md mx-auto md:mx-0 ${index === selectedIndex ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
                                            {movie.overview}
                                        </p>
                                        <div className={`flex items-center justify-center md:justify-start space-x-2 md:space-x-4 pt-4 pointer-events-auto ${index === selectedIndex ? 'animate-fade-in-up delay-400' : 'opacity-0'}`}>
                                            <button className="px-6 py-2 md:px-8 md:py-3 bg-[#ff0000] text-white rounded-full font-bold shadow-lg hover:scale-105 transition-transform text-lg md:text-2xl">
                                                Watch now
                                            </button>
                                            <button className="px-6 py-2 md:px-8 md:py-3 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-red-600 transition-colors text-lg md:text-2xl">
                                                Watch trailer
                                            </button>
                                        </div>
                                    </div>

                                    {/* Poster (Desktop only) */}
                                    <div className={`hidden md:block w-[450px] flex-shrink-0 ${index === selectedIndex ? 'animate-scale-in delay-700' : 'opacity-0'}`}>
                                        <img
                                            src={getImageUrl(movie.poster_path, 'w500')}
                                            alt={movie.title}
                                            className="w-full rounded-xl shadow-2xl transform hover:scale-105 m-30 transition-transform duration-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
