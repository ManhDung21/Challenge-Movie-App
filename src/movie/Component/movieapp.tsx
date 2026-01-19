import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './Navigation/Navigation';
import HomePage from '../HomePage/HomePage';
import MovieDetailsPage from '../MovieDetailsPage/MovieDetailsPage';
import MoviesPage from '../PageMovie/MoviesPage';
import TVSeriesPage from '../PageTV/TVSeriesPage';
import Footer from './Navigation/Footer';

export default function MovieApp() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-black flex flex-col">
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
