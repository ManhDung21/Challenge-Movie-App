import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './Navigation';
import HomePage from './pagesmovie/HomePage';
import MovieDetailsPage from './pagesmovie/MovieDetailsPage';
import MoviesPage from './pagesmovie/MoviesPage';
import TVSeriesPage from './pagesmovie/TVSeriesPage';
import Footer from './Footer';

export default function MovieApp() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-black flex flex-col pb-20 md:pb-0">
                <Navigation />

                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/movie" element={<MoviesPage />} />
                    <Route path="/tv" element={<TVSeriesPage />} />
                    <Route path="/movie/:id" element={<MovieDetailsPage />} />
                    <Route path="/tv/:id" element={<MovieDetailsPage />} /> {/* Reuse details page for now */}
                </Routes>

                <Footer />
            </div>
        </BrowserRouter>
    )
}
