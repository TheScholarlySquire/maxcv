import { useState } from 'react';
import './App.scss';
import { useTranslation } from 'react-i18next';

import GreetingTypewriter from './components/GreetingTypewriter';
import SwipingWords from './components/SwipingWords';

function formatDate(dateStr) {
    const [year, month] = dateStr.split('-');
    const date = new Date(`${dateStr}-01`);
    return date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
}

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
                    <p className="mt-6">{t('description')}</p>
                    <p className="mt-4 text-sm text-gray-400">{t('disclaimer')}</p>
                </div>
            </header>

            {/* Main page content */}
            <article id="main-container">
                <section id="technical-skills">
                    {/*MAKE THESE DIVS INTO COMPONENTS, AND ITERATE THROUGH THE TYPES OF SKILLS TO STREAMLINE THIS NEXT SECTION*/}
                    <div id="tech" className="skills-section">
                        {skills
                            .filter(skill => skill.type === 'tech')
                            .map((skill, index) => (
                                <div
                                    className="tech-item shadow-lg rounded-2xl"
                                    id={`skill-${index}`}
                                    key={`skill-${index}`}
                                >
                                    {skill.img && (
                                        <img style={{width:"100px"}} src={skill.img} alt={skill.alt} />
                                    )}
                                    <h3 className="font-semibold">{skill.name}</h3>
                                </div>
                            ))}
                    </div>
                    <div id="tools" className="skills-section">
                        {skills
                            .filter(skill => skill.type === 'tool')
                            .map((skill, index) => (
                                <div
                                    className="tools-item"
                                    id={`skill-${index}`}
                                    key={`skill-${index}`}
                                >
                                    {skill.img && (
                                        <img style={{width:"3rem"}} src={skill.img} alt={skill.alt} />
                                    )}
                                    <h3 className="font-semibold">{skill.name}</h3>
                                </div>
                            ))}
                    </div>
                </section>

                <section id="projects">
                    <h2 className="text-2xl font-semibold">{t('projectsTitle')}</h2>
                    <div>
                    {projects.map((project, index) => (
                        <div
                            id={`project-${index}`}
                            key={`project-${index}`}
                            className="project-item p-4 sm:w-full text-left"
                        >
                            <h3 className="text-xl font-semibold text-blue-600 hover:text-blue-400 transition hover:cursor-pointer">
                                {project.title}
                                <span>
                                    <a href={project.url}>{t('projectsRepo')}</a>
                                </span>
                            </h3>
                            <p className="mt-2">{project.desc}</p>
                        </div>
                    ))}
                    </div>
                </section>

                <section id="experience">
                    <h2 className="text-2xl font-semibold">{t('experienceTitle')}</h2>
                    {/*MAKE THESE DIVS INTO COMPONENTS, AND MAP THE JOBS TO THIS SEPARATE COMPONENT TO STREAMLINE THIS NEXT SECTION*/}
                    <div id="jobs">
                    {jobs.map((job, index) => (
                        <div
                            id={`job-${index}`}
                            key={`job-${index}`}
                            className="jobs-item shadow-lg rounded-2xl p-4 sm:w-full text-left"
                        >
                            <h3 className="text-xl font-semibold">{job.employer}</h3>
                            <h4 className="text-md font-medium text-gray-200">{job.position}</h4>
                            <p className="text-sm text-gray-400">
                                {formatDate(job.dates.start)} - {job.dates.end === 'current' ? t('currentJob') : formatDate(job.dates.end)}
                            </p>
                            <ul className="mt-2 list-disc list-inside space-y-1">
                                {job.desc.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    </div>
                </section>
            </article>
        </div>
    )
}

export default App
