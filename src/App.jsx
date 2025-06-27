import { useState } from 'react';
import './App.scss';
import { useTranslation } from 'react-i18next';

import GreetingTypewriter from './components/GreetingTypewriter';
import SwipingWords from './components/SwipingWords';
import TechSkills from './components/TechSkills';
import Projects from './components/Projects';
import Experience from './components/Experience';

function App() {
    const { t, i18n } = useTranslation('translation');
    const skills = t('skills', { returnObjects: true });
    const projects = t('projects', { returnObjects: true });
    const jobs = t('experience', { returnObjects: true });

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="relative">
            {/* Sticky top nav bar */}
            <nav className="navbar z-50 w-full px-4 py-3 md:backdrop-blur sticky top-0 flex justify-between items-center">
                <div className="langbtns hidden md:flex">
                    <button onClick={() => i18n.changeLanguage('en')}
                        className={`px-4 py-1 rounded-ful transition-colors duration-300 ${
                            i18n.language === 'en'
                                ? 'bg-white text-black font-semibold'
                                : 'text-white hover:bg-neutral-700'
                        }`}
                    >EN</button>
                    <button onClick={() => i18n.changeLanguage('fr')}
                    className={`px-4 py-1 rounded-ful transition-colors duration-300 ${
                        i18n.language === 'fr'
                            ? 'bg-white text-black font-semibold'
                            : 'text-white hover:bg-neutral-700'
                    }`}
                    >FR</button>
                </div>

                {/* Desktop buttons */}
                <div className="hidden md:flex gap-4">
                    <button>{t('download')}</button>
                    <button>{t('contact')}</button>
                </div>

                {/* Mobile menu toggle */}
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile sidebar and backdrop - always mounted */}
            <div>
                {/* Backdrop */}
                <div
                    className={`
                        fixed inset-0 z-40 bg-black/60 transition-opacity duration-300
                        ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
                    `}
                    onClick={() => setIsMenuOpen(false)}
                ></div>

                {/* Sidebar */}
                <div
                    className={`
                        navbar backdrop-blur fixed top-0 right-0 h-full w-3/4 max-w-sm bg-neutral-900 text-white z-50 p-6 shadow-lg
                        transform transition-transform duration-300 ease-in-out
                        ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
                    `}
                >
                    <div className="sm:flex">
                        <button onClick={() => i18n.changeLanguage('en')}
                            className={`px-4 py-1 rounded-ful transition-colors duration-300 border border-solid border-white ${
                                i18n.language === 'en'
                                    ? 'bg-white text-black font-semibold'
                                    : 'text-white hover:bg-neutral-700'
                            }`}
                        >EN</button>
                        <button onClick={() => i18n.changeLanguage('fr')}
                        className={`px-4 py-1 rounded-ful transition-colors duration-300 border border-solid border-white ${
                            i18n.language === 'fr'
                                ? 'bg-white text-black font-semibold'
                                : 'text-white hover:bg-neutral-700'
                        }`}
                        >FR</button>
                    </div>
                    <ul className="flex flex-col gap-4">
                        <li><button>{t('download')}</button></li>
                        <li><button>{t('contact')}</button></li>
                    </ul>
                </div>
            </div>

            <header className="relative h-screen flex flex-col justify-center items-center text-center px-4">
                {/* Hero + intro */}
                <div id="greeting-container">
                    <SwipingWords />
                    <GreetingTypewriter />
                    <p className="mt-30 lg:mt-50">{t('description')}</p>
                    <p className="mt-4 text-sm text-gray-400">{t('disclaimer')}</p>
                </div>
            </header>

            {/* Main page content */}
            <article id="main-container">
                <section id="technical-skills" className="flex flex-col md:flex-row gap-2">
                    <TechSkills
                        title={t('techTitle')}
                        skills={skills}
                        type="tech"
                        imgWidth="100px"
                    />
                    <TechSkills
                        title={t('toolTitle')}
                        skills={skills}
                        type="tool"
                    />
                    <TechSkills
                        title={t('designTitle')}
                        skills={skills}
                        type="design"
                    />
                </section>

                <section id="projects">
                    <Projects projects={projects} />
                </section>

                <section id="experience">
                    <Experience jobs={jobs} />
                </section>
            </article>
        </div>
    )
}

export default App
