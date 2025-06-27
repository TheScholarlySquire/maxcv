import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function formatDate(dateStr) {
    const [year, month] = dateStr.split('-');
    const date = new Date(`${dateStr}-01`);
    return date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
}

export default function Experience({ jobs }) {
    const { t } = useTranslation('translation');

    return (
        <div>
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
        </div>
    );
}
