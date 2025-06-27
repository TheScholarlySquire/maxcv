import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function TechSkills({ title, skills, type, imgWidth = "3rem" }) {
    const filteredSkills = skills?.filter(skill => skill.type === type);
    
    return (
        <div id={type} className="skills-section my-2 md:my-0">
            <h2 className="text-2xl text-center font-semibold w-full">{title}</h2>
            {filteredSkills.map((skill, index) => {
                return (
                    <div
                        className={`${type}-item shadow-lg rounded-2xl`}
                        id={`skill-${index}`}
                        key={`skill-${index}`}
                    >
                        {skill.img && (
                            <img
                                style={{ width: imgWidth }}
                                src={skill.img}
                                alt={skill.alt}
                            />
                        )}
                        <h3 className="font-semibold">{skill.name}</h3>
                    </div>
                )
            })}
        </div>
    );
}
    // const { t, i18n } = useTranslation('translation');
    // const words = t('words', { returnObjects: true });
