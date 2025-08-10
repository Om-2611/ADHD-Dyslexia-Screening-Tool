import i18n, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import en from '../locales/dyslexia/en.json';
import hi from '../locales/dyslexia/hi.json';
import te from '../locales/dyslexia/te.json';
import enQuestions from '../locales/dyslexia/questions/en.json';
import hiQuestions from '../locales/dyslexia/questions/hi.json';
import teQuestions from '../locales/dyslexia/questions/te.json';

// Create a separate i18n instance for the Dyslexia page
const dyslexiaI18n = i18n.createInstance();

const resources: Resource = {
  en: { 
    translation: en,
    questions: enQuestions
  },
  hi: { 
    translation: hi,
    questions: hiQuestions
  },
  te: { 
    translation: te,
    questions: teQuestions
  }
};

dyslexiaI18n
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
      lookupLocalStorage: 'dyslexia_i18nextLng'
    },
  });

export default dyslexiaI18n;
