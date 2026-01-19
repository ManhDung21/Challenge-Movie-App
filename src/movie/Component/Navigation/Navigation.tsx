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
            ? "text-white font-bold text-2xl pb-1 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-red-600 after:transition-transform after:duration-300 after:origin-center after:scale-x-100"
            : "text-gray-300 font-bold text-2xl pb-1 relative transition-colors duration-300 hover:text-red-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-red-600 after:transition-transform after:duration-300 after:origin-center after:scale-x-0 hover:after:scale-x-100";

    return (
        <>
            <nav
                className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/70 backdrop-blur-md border-b border-[#2b2b2b]' : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent border-transparent'}`}
            >
                <div className="w-full px-4 md:px-[30px]">
                    <div className="flex items-center justify-between h-20 md:h-25">
                        {/* Logo - Visible on all screens */}
                        <Link to="/" className="flex items-center space-x-3">
                            <img
                                src="https://calm-cendol-f3d19f.netlify.app/assets/tmovie-55621206.png"
                                alt="Movie App Logo"
                                className="h-10 md:h-12 w-auto"
                            />
                            <span className="text-2xl md:text-4xl font-bold text-white hover:text-red-600 transition-colors duration-300 cursor-pointer">theMovies</span>
                        </Link>

                        {/* Desktop Navigation Links - Hidden on Mobile */}
                        <div className="hidden md:flex items-center space-x-10">
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
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Bottom Navigation Bar */}

            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black/95 border-t border-[#2b2b2b] pb-5 pt-3 z-[100]">
                <div className="grid grid-cols-3 h-full">
                    <Link to="/" className={`flex flex-col items-center justify-center ${isActive('/') ? 'text-red-600' : 'text-gray-400'}`}>
                        <span className="text-xl font-bold">Home</span>
                    </Link>
                    <Link to="/movie" className={`flex flex-col items-center justify-center ${isActive('/movie') ? 'text-red-600' : 'text-gray-400'}`}>
                        <span className="text-xl font-bold">Movies</span>
                    </Link>
                    <Link to="/tv" className={`flex flex-col items-center justify-center ${isActive('/tv') ? 'text-red-600' : 'text-gray-400'}`}>
                        <span className="text-xl font-bold">TV</span>
                    </Link>
                </div>
            </div>
        </>
    );
}
