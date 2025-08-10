import React, { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import dyslexiaI18n from '../../i18n/dyslexiaI18n';
import DyslexiaTestSelection from './DyslexiaTestSelection';

const DyslexiaTests: React.FC = () => {
  useEffect(() => {
    // Sync with stored language preference
    const savedLanguage = localStorage.getItem('app-language');
    if (savedLanguage) {
      dyslexiaI18n.changeLanguage(savedLanguage);
    }
  }, []);

  return (
    <I18nextProvider i18n={dyslexiaI18n}>
      <DyslexiaTestSelection />
    </I18nextProvider>
  );
};

export default DyslexiaTests;