import { useEffect, useState } from 'react';

export default function SwipingWords() {
    const words = [
        'a developer',
        'a medievalist',
        'a calligrapher',
        'a car enthusiast',
        'a bit of a weirdo',
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);

            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % words.length);
                setIsAnimating(false);
            }, 500); //animation duration
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    //compute nextIndex dynamically, because having it as asynchronous state update didn't update instantly, and caused loop where only indexed 0 -> 1 -> 0 -> 1
    const nextIndex = (currentIndex + 1) % words.length;

    return (
        <div className="swipingWords absolute top-1/2 left-0 w-full text-center -translate-y-5/5 z-0 pointer-events-none overflow-hidden h-[20vw]">
            {/* current word (sliding out left) */}
            <p
                className={`font-bold text-[12vw] italic text-[#3c84ff] opacity-20 transition-transform duration-500 absolute w-full
                    ${isAnimating ? '-translate-x-full' : 'translate-x-0'}
                `}
                key={`current-${currentIndex}`}
              >
                {words[currentIndex]}
            </p>

            {/* Next word (sliding in from right) */}
            <p
                className={`font-bold text-[12vw] italic text-[#3c84ff] opacity-20 transition-transform duration-500 absolute w-full
                    ${isAnimating ? 'translate-x-0' : 'translate-x-full'}
                `}
                key={`next-${nextIndex}`}
            >
                {words[nextIndex]}
            </p>
        </div>
    );
}
