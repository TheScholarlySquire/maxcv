import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';

export default function ContactForm() {
    const { t } = useTranslation('translation');
    const form = useRef();
    const [status, setStatus] = useState({
        submitted: false,
        error: false,
        messageKey: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs.sendForm(
            'service_d1l31tw',
            'template_0dxq8nr',
            form.current,
            'gynnxssIw1L6xhHTT'
        )
        .then(() => {
            setStatus({ submitted: true, error: false, messageKey: 'formSuccess' });

            // Clear form after delay so message stays visible
            setTimeout(() => {
                form.current.reset();
                setStatus({ submitted: false, error: false, messageKey: '' });
            }, 1500);
        })
        .catch((error) => {
            console.error('Email sending failed:', error);
            setStatus({ submitted: false, error: true, messageKey: 'formFailure' });

            // Clear message after delay
            setTimeout(() => {
                setStatus({ submitted: false, error: false, messageKey: '' });
            }, 1500);
        });
    };

    return (
        <form ref={form} onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
            <input
                type="text"
                name="name"
                placeholder={t('contactName')}
                required
                className="w-full p-2 rounded bg-neutral-800 text-white"
            />
            <input
                type="email"
                name="email"
                placeholder={t('contactEmail')}
                required
                className="w-full p-2 rounded bg-neutral-800 text-white"
            />
            <textarea
                name="message"
                placeholder={t('contactMessage')}
                required
                rows="5"
                className="w-full p-2 rounded bg-neutral-800 text-white"
            />

            {!status.submitted ? (
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 cursor-pointer text-white py-2 px-4 rounded transition"
                >
                    {t('contactSend')}
                </button>
            ) : (
                <p className={`mt-2 text-sm ${status.error ? 'text-red-600' : 'text-green-600'}`}>
                    {t(status.messageKey)}
                </p>
            )}
        </form>
    );
}
