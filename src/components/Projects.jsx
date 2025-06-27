import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Projects({ projects }) {
    const { t } = useTranslation('translation');

    return (
        <div>
            <h2 className="text-2xl font-semibold">{t('projectsTitle')}</h2>
            <div>
                {projects.map((project, index) => (
                    <div
                        id={`project-${index}`}
                        key={`project-${index}`}
                        className="project-item p-4 sm:w-full text-left"
                    >
                        <div className="project-img">
                            <img src={project.img} alt={project.title} />
                        </div>
                        <div className="project-details lg:px-10 sm:px-7">
                            <span>
                                <a href={project.url}><h3 className="text-xl font-semibold text-blue-600 hover:text-blue-400 transition hover:cursor-pointer">
                                    {project.title}
                                </h3></a>
                                <a className="repo-link" href={project.repo}>{t('projectsRepo')}</a>
                            </span>
                            <p className="mt-2">{project.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
