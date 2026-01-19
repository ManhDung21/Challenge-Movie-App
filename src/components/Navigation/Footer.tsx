import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="relative bg-black text-gray-400 py-12 pb-16 md:pb-12 border-t border-[#2b2b2b] mt-auto">
            
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: 'url(/VN-vi-20251229-TRIFECTA-perspective_4e357d4c-ae87-47b5-954d-ec6488532b04_large.jpg)',
backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-black/80" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <Link to="/" className="flex items-center mb-4">
                            <img
                                src="tmovie-55621206.png"
                                alt="Movie App Logo"
                                className="h-10 w-auto"
                            />
                            <span className="text-4xl font-bold text-white tracking-wide">TheMovies</span>
                        </Link>

                    </div>

                    {/* Quick Links */}
                    <div>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link to="/search" className="hover:text-white transition-colors">Search</Link></li>
                            <li><a href="#" className="hover:text-white transition-colors">New Releases</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Trending</a></li>
                        </ul>
                    </div>

                   
                    <div>
                        <ul className="space-y-2 text-sm font-semibold">
                            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Cookie Preferences</a></li>
                        </ul>
                    </div>


                </div>

                <div className="border-t border-[#2b2b2b] pt-8 text-sm text-center">
                    <p>&copy; {new Date().getFullYear()} tMovies. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
