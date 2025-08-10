import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import en from './locales/home/en.json';
import hi from './locales/home/hi.json';
import te from './locales/home/te.json';

// Create a separate i18n instance for the Home page
const homeI18n = i18n.createInstance();

const resources = {
  en: {
    translation: en
  },
  hi: {
    translation: hi
  },
  te: {
    translation: te
  }
};

homeI18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      // Use a different localStorage key to avoid conflicts with the main i18n instance
      lookupLocalStorage: 'home_i18nextLng',
    },
  });

export default homeI18n;