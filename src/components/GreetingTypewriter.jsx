import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function GreetingTypewriter() {
    const greetings = ['Hello', 'Bonjour', 'Привет'];
    const [displayText, setDisplayText] = useState('');
    const [index, setIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const { t, i18n } = useTranslation('translation');

    useEffect(() => {
        const fullText = greetings[index];
        let timeout;

        if (isDeleting) {
            timeout = setTimeout(() => {
                setDisplayText((prev) => prev.slice(0, -1));
            }, 75); //speed of backspacing
        } else {
            timeout = setTimeout(() => {
                setDisplayText((prev) => fullText.slice(0, prev.length + 1));
            }, 125); //speed of typing
        }

        //when fully typed
        if (!isDeleting && displayText === fullText) {
            timeout = setTimeout(() => setIsDeleting(true), 1000); //wait before deleting
        }

        //when fully deleted
        if (isDeleting && displayText === '') {
            timeout = setTimeout(() => {
                setIsDeleting(false);
                setIndex((prev) => (prev + 1) % greetings.length);
            }, 300); //wait before typing next
        }

        return () => clearTimeout(timeout); //cleanup
    }, [displayText, isDeleting, index]);

    return (
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
            <span className="inline-block min-w-[6ch] text-blue-100">{displayText}</span>
            <span className="blinking-cursor"> | </span>
            <span id="name" className="ml-2">{t('welcome')}</span>
        </h1>
    )
}
