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
            <div className="flex justify-between items-center mb-6 px-4 md:px-8 border-l-4 border-red-600">
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
            <div
                className="relative group"
                style={{
                    maskImage: 'linear-gradient(to right, transparent 0, black 32px, black calc(100% - 32px), transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0, black 32px, black calc(100% - 32px), transparent 100%)'
                }}
            >
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
                        className=""
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
            </div>
        </div>
    );
}
