import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import adhdI18n from '../i18n/adhdI18n';
import dyslexiaI18n from '../i18n/dyslexiaI18n';
import homeI18n from '../i18n/homeI18n';

const LANGUAGE_KEY = 'app-language';

export const useLanguageManager = () => {
  const { i18n } = useTranslation();

  // Function to update all i18n instances
  const updateAllI18nInstances = (languageCode: string) => {
    // Update main i18n instance
    i18n.changeLanguage(languageCode);
    
    // Update specific feature i18n instances
    adhdI18n.changeLanguage(languageCode);
    dyslexiaI18n.changeLanguage(languageCode);
    homeI18n.changeLanguage(languageCode);

    // Store in localStorage and dispatch event for other components
    localStorage.setItem(LANGUAGE_KEY, languageCode);
    window.dispatchEvent(new StorageEvent('storage', {
      key: LANGUAGE_KEY,
      newValue: languageCode
    }));
    
    // Log for debugging
    console.log('Language updated across all instances:', languageCode);
  };

  useEffect(() => {
    // Get saved language preference
    const savedLanguage = localStorage.getItem(LANGUAGE_KEY);
    
    if (savedLanguage) {
      // Apply saved language to all instances
      updateAllI18nInstances(savedLanguage);
    } else {
      // Set default language (English) if none saved
      updateAllI18nInstances('en');
    }
  }, []); // Run once on component mount

  const changeLanguage = (languageCode: string) => {
    updateAllI18nInstances(languageCode);
  };

  return {
    currentLanguage: localStorage.getItem(LANGUAGE_KEY) || 'en',
    changeLanguage,
    languages: [
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
      { code: 'te', name: 'తెలుగు', flag: '🇮🇳' }
    ]
  };
};
