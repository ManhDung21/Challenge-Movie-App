import { useEffect, useState } from 'react';

interface WelcomeScreenProps {
    onComplete: () => void;
}

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        // Start exit animation after 2 seconds
        const timer = setTimeout(() => {
            setIsExiting(true);
        }, 2000);

        // Complete callback after animation finishes (total 2.5s)
        const completeTimer = setTimeout(() => {
            onComplete();
        }, 2500);

        return () => {
            clearTimeout(timer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-[#141414] transition-opacity duration-1000 ease-in-out ${isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
        >
            <div className={`transform transition-all duration-1000 ${isExiting ? 'scale-110' : 'scale-100'}`}>
                <div className="flex flex-col items-center">
                    {/* Logo / Text Animation */}
                    <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent animate-pulse drop-shadow-2xl">
                        TheMovies
                    </h1>
                    <div className="mt-4 flex space-x-2">
                        <div className="w-3 h-3 bg-red-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-3 h-3 bg-red-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-3 h-3 bg-red-600 rounded-full animate-bounce"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
