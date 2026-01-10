import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    const navLinkClass = (path: string) =>
        isActive(path)
            ? "text-white font-semibold border-b-2 border-red-600 pb-1 text-2xl"
            : "text-gray-300 hover:text-white font-medium transition-colors hover:text-red-500 text-2xl";

    return (
        <nav
            className={`fixed w-full top-0 z-50 transition-colors duration-300 ${isScrolled ? 'bg-black/90 border-b border-[#2b2b2b]' : 'bg-transparent border-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo - Visible on all screens */}
                    <Link to="/" className="flex items-center space-x-2">
                        <img
                            src="https://calm-cendol-f3d19f.netlify.app/assets/tmovie-55621206.png"
                            alt="Movie App Logo"
                            className="h-8 md:h-10 w-auto"
                        />
                        <span className="text-2xl md:text-4xl font-bold text-white tracking-wide">TheMovies</span>
                    </Link>

                    {/* Desktop Navigation Links - Hidden on Mobile */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/"
                            className={navLinkClass('/')}
                        >
                            Home
                        </Link>
                        <Link
                            to="/movie"
                            className={navLinkClass('/movie')}
                        >
                            Movies
                        </Link>
                        <Link
                            to="/tv"
                            className={navLinkClass('/tv')}
                        >
                            TV Series
                        </Link>
                        <Link
                            to="/search"
                            className={isActive('/search') ? "text-white transition-colors" : "text-gray-300 hover:text-white transition-colors"}
                        >
                            <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile Bottom Navigation Bar */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black/95 border-t border-[#2b2b2b] px-6 py-4 flex justify-between items-center z-50">
                <Link to="/" className={`flex flex-col items-center space-y-1 ${isActive('/') ? 'text-red-600' : 'text-gray-400'}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="text-xs">Home</span>
                </Link>
                <Link to="/movie" className={`flex flex-col items-center space-y-1 ${isActive('/movie') ? 'text-red-600' : 'text-gray-400'}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                    </svg>
                    <span className="text-xs">Movies</span>
                </Link>
                <Link to="/tv" className={`flex flex-col items-center space-y-1 ${isActive('/tv') ? 'text-red-600' : 'text-gray-400'}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs">TV</span>
                </Link>
                <Link to="/search" className={`flex flex-col items-center space-y-1 ${isActive('/search') ? 'text-red-600' : 'text-gray-400'}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span className="text-xs">Search</span>
                </Link>
            </div>
        </nav>
    );
}
