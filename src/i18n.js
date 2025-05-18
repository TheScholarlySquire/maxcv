import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import homeEn from './locales/en/home.json'

import homeFr from './locales/fr/home.json'

// Define your translations here
const resources = {
    en: {
        home: homeEn,
    },
    fr: {
        home: homeFr,
    },
};

export default i18n;
