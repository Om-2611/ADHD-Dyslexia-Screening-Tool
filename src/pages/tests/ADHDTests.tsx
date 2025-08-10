import { I18nextProvider, useTranslation } from 'react-i18next';
import adhdI18n from '../../i18n/adhdI18n';
import React from 'react';
import ADHDSubcategorySelection from './ADHDSubcategorySelection';

const ADHDTests: React.FC = () => {
  return (
    <I18nextProvider i18n={adhdI18n}>
      <ADHDSubcategorySelection />
    </I18nextProvider>
  );
};

export default ADHDTests;