import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';

import type { Movie, TVShow } from '../movie.types';
import MovieCard from './MovieCard';

interface MovieRowProps {
    title: string;
    movies: (Movie | TVShow)[];
    viewMoreLink?: string;
}

export default function MovieRow({ title, movies, viewMoreLink }: MovieRowProps) {
    return (
        <div className="mb-8">
            <div className="flex justify-between items-center mb-6 px-4 sm:px-6 lg:px-8 ml-4 sm:ml-6 lg:ml-8 border-l-4 border-red-600">
                <h2 className="text-2xl md:text-3xl font-bold text-white pl-4">
                    {title}
                </h2>
                {viewMoreLink && (
                    <Link
                        to={viewMoreLink}
                        className="px-4 py-1 md:px-6 md:py-2 border border-gray-500 rounded-full text-sm md:text-base font-medium hover:bg-white hover:text-red-600 transition-colors"
                    >
                        View more
                    </Link>
                )}
            </div>
            <div className="relative group">
                <div className="px-4 md:px-8">
                    <Swiper
                        modules={[FreeMode, Autoplay]}
                        freeMode={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        spaceBetween={16}
                        slidesPerView="auto"
                        className="!overflow-visible"
                    >
                        {movies.map((movie, index) => (
                            <SwiperSlide key={`${movie.id}-${index}`} className="!w-auto">
                                <div className="w-[140px] md:w-[250px]">
                                    <MovieCard movie={movie} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Gradient Masks */}
                <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
                <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
            </div>
        </div>
    );
}
