import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/auth/AuthContext';
import { Brain, FileText, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
// Remove this import if not needed elsewhere
// import LanguageSwitcher from '../components/ui/LanguageSwitcher';

const Home: React.FC = () => {
  const { currentUser } = useAuth();
  const { t } = useTranslation();

  // Near the top of your Home component, after const { t } = useTranslation();
  const { i18n } = useTranslation();
  console.log('Current language in Home:', i18n.language);
  
  // Then add this somewhere visible in your component's return statement:
  // <div className="bg-yellow-100 p-2 rounded-lg mb-4 text-center">
  //   Current Language: {i18n.language} - {i18n.language === 'en' ? 'English' : i18n.language === 'hi' ? 'हिंदी' : 'తెలుగు'}
  // </div>

  return (
    <div className="max-w-4xl mx-auto">
      {/* Remove this header section with language switcher since Layout already provides it */}
      {/* <div className="flex items-center justify-between py-4 border-b border-gray-200 mb-6">
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">ADHD & Dyslexia Tool</h2>
        </div>
        <LanguageSwitcher />
      </div> */}
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t('home.title')}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {t('home.description')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card className="transition-transform hover:shadow-lg hover:-translate-y-1">
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-blue-100 rounded-full mb-4">
              <Brain className="h-10 w-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('home.adhd.title')}</h2>
            <p className="text-gray-600 mb-6">
              {t('home.adhd.description')}
            </p>
            <Link to={currentUser ? "/adhd" : "/login"}>
              <Button className="flex items-center">
                {t('home.adhd.button')} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="transition-transform hover:shadow-lg hover:-translate-y-1">
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-purple-100 rounded-full mb-4">
              <FileText className="h-10 w-10 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('home.dyslexia.title')}</h2>
            <p className="text-gray-600 mb-6">
              {t('home.dyslexia.description')}
            </p>
            <Link to={currentUser ? "/dyslexia" : "/login"}>
              <Button variant="secondary" className="flex items-center">
                {t('home.dyslexia.button')} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      <div className="bg-blue-50 rounded-xl p-6 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('home.whyUse.title')}</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">{t('home.whyUse.confidential.title')}</h3>
            <p className="text-gray-600">{t('home.whyUse.confidential.description')}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">{t('home.whyUse.evidenceBased.title')}</h3>
            <p className="text-gray-600">{t('home.whyUse.evidenceBased.description')}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">{t('home.whyUse.freeAccess.title')}</h3>
            <p className="text-gray-600">{t('home.whyUse.freeAccess.description')}</p>
          </div>
        </div>
      </div>

      <div className="text-center bg-gray-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('home.importantNotice.title')}</h2>
        <p className="text-gray-600 mb-4">
          {t('home.importantNotice.description')}
        </p>
        {!currentUser && (
          <div className="mt-6">
            <p className="font-medium text-gray-900 mb-4">
              {t('home.importantNotice.signupMessage')}
            </p>
            <Link to="/signup">
              <Button variant="primary" size="lg">
                {t('home.importantNotice.signupButton')}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;