import i18n, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import en from '../locales/adhd/en.json';
import hi from '../locales/adhd/hi.json';
import te from '../locales/adhd/te.json';

// Create a separate i18n instance for the ADHD page
const adhdI18n = i18n.createInstance();

const resources: Resource = {
  en: { translation: en },
  hi: { translation: hi },
  te: { translation: te }
};

adhdI18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,

    interpolation: {
      escapeValue: false
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'adhd_i18nextLng'
    },
  });

export default adhdI18n;
