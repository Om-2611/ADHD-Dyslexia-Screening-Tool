import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/auth/AuthContext';
import { Brain, FileText, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import homeI18n from '../i18n/homeI18n';
import { I18nextProvider } from 'react-i18next';

// Create a custom hook for using the home i18n instance
const useHomeTranslation = () => {
  return useTranslation(undefined, { i18n: homeI18n });
};

// Create a language switcher specifically for the home page
export const HomeLanguageSwitcher: React.FC = () => {
  const { i18n } = useHomeTranslation();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' }
  ];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  // Ensure we have a valid language
  const currentLanguage = i18n.language || 'en';

  return (
    <div className="flex flex-col md:flex-row items-center gap-2 mb-6" title="Change Language">
      <div className="flex items-center">
        <span className="text-sm font-medium text-gray-700 mr-2">Home Page Language:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`flex items-center px-4 py-2 rounded-md transition-colors ${currentLanguage === language.code 
              ? 'bg-blue-500 text-white font-medium shadow-sm' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
            aria-label={`Switch to ${language.name}`}
          >
            <span className="text-lg mr-2">{language.flag}</span>
            <span className="text-base font-medium">{language.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Home component with separate i18n
const HomeWithSeparateI18n: React.FC = () => {
  const { currentUser } = useAuth();
  const { t, i18n } = useHomeTranslation();

  // Log the current language for debugging
  useEffect(() => {
    console.log('Current language in Home (separate i18n):', i18n.language);
  }, [i18n.language]);

  return (
    <I18nextProvider i18n={homeI18n}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end items-center pt-4 pr-4">
          <HomeLanguageSwitcher />
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="transition-transform hover:shadow-lg hover:-translate-y-1">
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-blue-100 rounded-full mb-4">
                <Brain className="h-10 w-10 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('adhd.title')}</h2>
              <p className="text-gray-600 mb-6">
                {t('adhd.description')}
              </p>
              <Link to={currentUser ? "/adhd" : "/login"}>
                <Button className="flex items-center">
                  {t('adhd.button')} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="transition-transform hover:shadow-lg hover:-translate-y-1">
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-purple-100 rounded-full mb-4">
                <FileText className="h-10 w-10 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('dyslexia.title')}</h2>
              <p className="text-gray-600 mb-6">
                {t('dyslexia.description')}
              </p>
              <Link to={currentUser ? "/dyslexia" : "/login"}>
                <Button variant="secondary" className="flex items-center">
                  {t('dyslexia.button')} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        <div className="bg-blue-50 rounded-xl p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('whyUse.title')}</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">{t('whyUse.confidential.title')}</h3>
              <p className="text-gray-600">{t('whyUse.confidential.description')}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">{t('whyUse.evidenceBased.title')}</h3>
              <p className="text-gray-600">{t('whyUse.evidenceBased.description')}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">{t('whyUse.freeAccess.title')}</h3>
              <p className="text-gray-600">{t('whyUse.freeAccess.description')}</p>
            </div>
          </div>
        </div>

        <div className="text-center bg-gray-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('importantNotice.title')}</h2>
          <p className="text-gray-600 mb-4">
            {t('importantNotice.description')}
          </p>
          {!currentUser && (
            <div className="mt-6">
              <p className="font-medium text-gray-900 mb-4">
                {t('importantNotice.signupMessage')}
              </p>
              <Link to="/signup">
                <Button variant="primary" size="lg">
                  {t('importantNotice.signupButton')}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </I18nextProvider>
  );
};

export default HomeWithSeparateI18n;