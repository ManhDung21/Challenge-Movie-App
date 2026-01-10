// Uncomment these if you want to see the challenge components
// import Newbi from "./challenge/Newbi";
// import Lesson from "./challenge/Lesson";
// import TodoList from "./challenge/TodoList";
// import ConditionalRendering from "./challenge/ConditionalRendering";
// import RenderingLists from "./challenge/RenderingLists";
// import FormReact from "./challenge/Formreact";
// import Login from "./challenge/Login";
// import Register from "./challenge/Register";
// import FetchAPI from "./challenge/FetchAPI";
// import LoadingError from "./challenge/LoadingError";
// import UseContextExample from "./challenge/UseContextExample";
// import CustomHooks from "./challenge/CustomHooks";
// import ReactRouterExample from "./challenge/ReactRouterExample";

// Movie App - Main Project
import { useState } from 'react';
import MovieApp from "./movie/movieapp";
import WelcomeScreen from "./movie/WelcomeScreen";

function App() {
    const [showWelcome, setShowWelcome] = useState(true);

    if (showWelcome) {
        return <WelcomeScreen onComplete={() => setShowWelcome(false)} />;
    }

    return (
        <div>
            {/* Bài học React Router Cơ Bản */}
            {/* <ReactRouterBasics /> */}
            <MovieApp />

            {/* <Newbi />
            <TodoList />
            <Login />
            <Register /> */}
        </div>
    );
}

export default App;
