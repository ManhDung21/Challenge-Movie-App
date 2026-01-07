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
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <img
                            src="https://calm-cendol-f3d19f.netlify.app/assets/tmovie-55621206.png"
                            alt="Movie App Logo"
                            className="h-10 w-auto"
                        />
                        <span className="text-4xl font-bold text-white tracking-wide">TheMovies</span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-8">
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
        </nav>
    );
}
