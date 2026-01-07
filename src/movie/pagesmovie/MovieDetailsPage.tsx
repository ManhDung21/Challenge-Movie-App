import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { tmdbApi, getImageUrl } from '../../services/tmdbApi';
import type { MovieDetails, Credits, Video, Movie } from '../types/movie.types';
import { MovieDetailsSkeleton } from '../Skeleton';
import MovieRow from '../MovieRow';

export default function MovieDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const isMovie = location.pathname.includes('/movie');
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [cast, setCast] = useState<Credits['cast']>([]);
    const [trailer, setTrailer] = useState<Video | null>(null);
    const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
    const [isTrailerOpen, setIsTrailerOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (id) {
            loadMovieDetails(Number(id));
            window.scrollTo(0, 0);
        }
    }, [id]);

    const loadMovieDetails = async (movieId: number) => {
        try {
            setIsLoading(true);

            // Parallel fetch all data
            const [movieData, creditsData, videosData, similarData] = await Promise.all([
                tmdbApi.getMovieDetails(movieId),
                tmdbApi.getMovieCredits(movieId),
                tmdbApi.getMovieVideos(movieId),
                tmdbApi.getSimilarMovies(movieId),
            ]);

            setMovie(movieData);
            setCast(creditsData.cast.slice(0, 15)); // Increased to 15 for scrolling
            setSimilarMovies(similarData.results);

            // Find official trailer
            const officialTrailer = videosData.results.find(
                video => video.type === 'Trailer' && video.site === 'YouTube' && video.official
            ) || videosData.results.find(
                video => video.type === 'Trailer' && video.site === 'YouTube'
            );

            setTrailer(officialTrailer || null);
        } catch (error) {
            console.error('Error loading movie details:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <MovieDetailsSkeleton />
                </div>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="min-h-screen bg-[#141414] flex items-center justify-center">
                <p className="text-gray-400 text-xl">Movie not found</p>
                <Link to="/" className="ml-4 text-red-600 hover:text-red-500">Go Home</Link>
            </div>
        );
    }

    const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
    const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : 'N/A';

    return (
        <div className="min-h-screen bg-[#141414] text-white">
            {/* Immersive Backdrop */}
            <div
                className="relative h-[70vh] w-full bg-cover bg-top"
                style={{
                    backgroundImage: `url('${getImageUrl(movie.backdrop_path, 'original')}')`
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12">


                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-xl">
                            {movie.title}
                        </h1>

                        <div className="flex items-center space-x-4 text-gray-300 mb-6 text-sm md:text-base font-medium">
                            <span className="text-green-400 font-bold">{Math.round(movie.vote_average * 10)}% Match</span>
                            <span>{year}</span>
                            <span className="border border-gray-600 px-1 rounded text-xs">HD</span>
                            <span>{runtime}</span>
                        </div>

                        <div className="flex flex-wrap gap-3 mb-8">
                            {movie.genres.map(genre => (
                                <span
                                    key={genre.id}
                                    className="px-3 py-1 bg-white/20 backdrop-blur-md text-white rounded-full text-sm hover:bg-white/30 transition-colors cursor-default"
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-4">
                            {trailer && (
                                <button
                                    onClick={() => setIsTrailerOpen(true)}
                                    className="px-8 py-3 bg-white text-black font-bold rounded hover:bg-gray-200 transition-colors flex items-center"
                                >
                                    <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                    Play Trailer
                                </button>
                            )}
                            <button className="px-8 py-3 bg-gray-500/70 text-white font-bold rounded hover:bg-gray-500/50 transition-colors flex items-center backdrop-blur-sm">
                                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                More Info
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Left Column: Overview */}
                    <div className="md:col-span-2 space-y-12">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">Synopsis</h2>
                            <p className="text-gray-300 text-lg leading-relaxed">{movie.overview}</p>
                        </div>

                        {/* Inline Trailer - Restored by request */}
                        {trailer && (
                            <div className="mt-8">
                                <h3 className="text-xl font-bold text-white mb-4">Official Trailer</h3>
                                <div className="aspect-video w-full bg-black rounded-xl overflow-hidden shadow-lg border border-[#2b2b2b]">
                                    <iframe
                                        className="w-full h-full"
                                        src={`https://www.youtube.com/embed/${trailer.key}`}
                                        title={trailer.name}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Key Details */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-gray-400 mb-2 font-medium">Maturity Rating</h2>
                            <span className="border border-gray-500 px-2 py-0.5 text-sm text-gray-300">TV-14</span>
                            <p className="text-xs text-gray-500 mt-1">Recommended for ages 14 and up</p>
                        </div>
                    </div>
                </div>

                {/* Movie Player Embed */}


                {/* Cast Scroll Row */}
                {cast.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-red-600 pl-4">Top Cast</h2>
                        <div
                            className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide scroll-smooth"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {cast.map(actor => (
                                <div key={actor.id} className="min-w-[140px] w-[140px] flex-none group cursor-pointer">
                                    <div className="aspect-[2/3] rounded-lg overflow-hidden bg-[#2b2b2b] mb-2 relative">
                                        {actor.profile_path ? (
                                            <img
                                                src={getImageUrl(actor.profile_path, 'w500')}
                                                alt={actor.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-500">
                                                No Image
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                    </div>
                                    <p className="font-semibold text-white text-sm truncate">{actor.name}</p>
                                    <p className="text-xs text-gray-400 truncate">{actor.character}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>



            {/* Similar Movies */}
            {similarMovies.length > 0 && (
                <div className="mt-16 pb-12">
                    <MovieRow title="More Like This" movies={similarMovies} />
                </div>
            )}

            {/* Trailer Modal */}
            {isTrailerOpen && trailer && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
                    <div className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
                        <button
                            onClick={() => setIsTrailerOpen(false)}
                            className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors z-10"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&modestbranding=1&rel=0`}
                            title={trailer.name}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
