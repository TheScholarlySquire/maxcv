import { useState } from 'react'
import './App.css'
import { useTranslation } from 'react-i18next';

function App() {
    const { t, i18n } = useTranslation();

    return (
        <>
        <section className="text-center p-8">
                <h1 className="text-3xl font-bold">{t('welcome')}</h1>
                <p className="mt-4">{t('description')}</p>
            <div className="mt-6">
                <button onClick={() => i18n.changeLanguage('en')} className="mr-2">EN</button>
                <button onClick={() => i18n.changeLanguage('fr')}>FR</button>
            </div>
        </section>
        </>
    )
}

export default App
