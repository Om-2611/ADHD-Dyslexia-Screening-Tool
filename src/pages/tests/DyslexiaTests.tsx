import { I18nextProvider } from 'react-i18next';
import dyslexiaI18n from '../../i18n/dyslexiaI18n';
import React from 'react';
import DyslexiaTestSelection from './DyslexiaTestSelection';

const DyslexiaTests: React.FC = () => {
  return (
    <I18nextProvider i18n={dyslexiaI18n}>
      <DyslexiaTestSelection />
    </I18nextProvider>
  );
};

export default DyslexiaTests;