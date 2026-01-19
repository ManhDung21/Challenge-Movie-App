import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { tmdbApi, getImageUrl } from './../services/Api';
import type { MovieDetails, Credits, Video, Movie } from '../movie.types';
import { MovieDetailsSkeleton } from '../components/Card/Skeleton';
import MovieRow from '../components/Card/MovieRow';

export default function MovieDetailsPage() {
    const { id } = useParams<{ id: string }>();

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



    return (
        <div className="relative min-h-screen bg-[#141414] text-white">
            {/* Full Screen Backdrop */}
            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center fixed"
                style={{
                    backgroundImage: `url('${getImageUrl(movie.backdrop_path, 'original')}')`,
                    height: '100vh',
                    position: 'fixed',
                    zIndex: 0
                }}
            >
                {/* Gradient Overlays for readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/90 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent"></div>
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">

                    {/* Left Column: Poster */}
                    <div className="hidden md:block w-full md:w-[350px] flex-shrink-0 mx-auto md:mx-0">
                        <div className="aspect-[2/3] rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-gray-800/50 group">
                            <img
                                src={getImageUrl(movie.poster_path, 'w500')}
                                alt={movie.title}
                                className="w-full h-full object-cover transition-transform duration-500 "
                            />
                        </div>
                    </div>

                    {/* Right Column: Details */}
                    <div className="flex-1 space-y-6 md:pt-4">
                        {/* Title */}
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wide drop-shadow-lg leading-tight">
                                {movie.title}
                            </h1>

                            {/* Metadata Line (optional, ref image implies it) */}
                            {/* Genres Pills */}
                            <div className="flex flex-wrap gap-3">
                                {movie.genres.map(genre => (
                                    <span
                                        key={genre.id}
                                        className="px-4 py-1.5 rounded-full border border-gray-500 hover:border-white transition-colors text-sm font-medium bg-black/30 backdrop-blur-md cursor-default"
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Overview */}
                        <div className="max-w-3xl">
                            <p className="text-gray-300 text-base md:text-lg leading-relaxed font-light">
                                {movie.overview}
                            </p>
                        </div>

                        {/* Buttons */}
                        {/* <div className="flex flex-wrap gap-4 pt-4">
                            {trailer && (
                                <button
                                    onClick={() => setIsTrailerOpen(true)}
                                    className="px-8 py-3 bg-red-600 text-white font-bold rounded-full shadow-[0_0_5px_10px_rgba(239,68,68,0.5)] hover:shadow-[0_0_10px_10px_rgba(239,68,68,0.6)] transition-transform active:scale-95 shadow-lg flex items-center gap-2"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                    Watch Trailer
                                </button>
                            )}
                        </div> */}


                        {/* Casts Section */}
                        {cast.length > 0 && (
                            <div className="pt-8">
                                <h3 className="text-xl font-bold text-white mb-4">Casts</h3>
                                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 w-full h-full object-cover transition-transform duration-300 gap-4">
                                    {cast.slice(0, 6).map(actor => (
                                        <div key={actor.id} className="space-y-2 group cursor-pointer">
                                            <div className="aspect-[3/4] rounded-lg overflow-hidden bg-gray-800 shadow-md">
                                                {actor.profile_path ? (
                                                    <img
                                                        src={getImageUrl(actor.profile_path, 'w500')}
                                                        alt={actor.name}

                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">No Image</div>
                                                )}
                                            </div>
                                            <div className="space-y-0.5">
                                                <p className="text-sm font-semibold text-white leading-tight truncate">{actor.name}</p>
                                                <p className="text-xs text-gray-400 leading-tight truncate">{actor.character}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Trailer Section */}
                        {trailer && (
                            <div className="pt-8">
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
                </div>

                {/* Similar Movies Section (Below Fold) */}
                {similarMovies.length > 0 && (
                    <div className="mt-24 space-y-6">
                        <MovieRow title="More Like This" movies={similarMovies} />
                    </div>
                )}
            </div>

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
