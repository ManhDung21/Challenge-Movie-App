import { useState } from 'react';
import MovieApp from "./MovieApp";
import WelcomeScreen from "./HomePage/WelcomeScreen";

function App() {
    const [showWelcome, setShowWelcome] = useState(true);

    if (showWelcome) {
        return <WelcomeScreen onComplete={() => setShowWelcome(false)} />;
    }

    return (
        <div>
            <MovieApp />
        </div>
    );
}

export default App;
