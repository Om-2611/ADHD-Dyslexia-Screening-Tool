import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n';
import adhdI18n from './i18n/adhdI18n';
import dyslexiaI18n from './i18n/dyslexiaI18n';
import homeI18n from './i18n/homeI18n';

// Initialize language from localStorage
const savedLanguage = localStorage.getItem('app-language') || 'en';
[adhdI18n, dyslexiaI18n, homeI18n].forEach(i18nInstance => {
  i18nInstance.changeLanguage(savedLanguage);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
