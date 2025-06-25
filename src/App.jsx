import { useState } from 'react';
import './App.scss';
import { useTranslation } from 'react-i18next';

import GreetingTypewriter from './components/GreetingTypewriter';

function App() {
    const { t, i18n } = useTranslation('translation');
    const skills = t('skills', { returnObjects: true });
    const projects = t('projects', { returnObjects: true });
    const jobs = t('experience', { returnObjects: true });

    return (
        <>
            <nav>
                <div id="greeting-container" className="text-center p-8">
                    <GreetingTypewriter />
                    <p className="mt-4">{t('description')}</p>
                    <p className="mt-4">{t('disclaimer')}</p>

                    <div id="nav-btns">
                        <div>
                            <button onClick={() => i18n.changeLanguage('en')} className="mr-2">EN</button>
                            <button onClick={() => i18n.changeLanguage('fr')}>FR</button>
                        </div>
                        <div>
                            <button>{t('download')}</button>
                            <button>{t('contact')}</button>
                        </div>
                    </div>
                </div>
            </nav>
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
                            <h3 className="text-xl font-semibold text-blue-600 hover:cursor-pointer">
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
                            <p className="text-sm text-gray-400">{job.dates.start} – {job.dates.end}</p>
                            <p className="mt-2">{job.desc}</p>
                        </div>
                    ))}
                    </div>
                </section>
            </article>
        </>
    )
}

export default App
