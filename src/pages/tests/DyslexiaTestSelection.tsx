import { useTranslation } from 'react-i18next';
import dyslexiaI18n from '../../i18n/dyslexiaI18n';
import LanguageSwitcher from '../../components/ui/LanguageSwitcher';
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import { FileText, BookOpen, ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';

const DyslexiaTests: React.FC = () => {
  const { t } = useTranslation(undefined, { i18n: dyslexiaI18n });

  const tests = [
    {
      id: 'basic',
      name: t('Basic Dyslexia Screening'),
      description: t('A quick screening test to identify potential dyslexia indicators.'),
      button: t('Start Screening'),
      icon: <FileText className="h-8 w-8 text-purple-600" />,
      time: '10-12 ' + t('minutes'),
      questions: '19 ' + t('questions')
    },
    {
      id: 'comprehensive',
      name: t('Comprehensive Dyslexia Assessment'),
      description: t('A detailed assessment covering multiple aspects of dyslexia.'),
      button: t('Start Assessment'),
      icon: <BookOpen className="h-8 w-8 text-purple-600" />,
      time: '20-25 ' + t('minutes'),
      questions: '50 ' + t('questions')
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-end mb-4">
        <LanguageSwitcher />
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('Dyslexia Assessment')}</h1>
        <p className="text-lg text-gray-600">
          {t('Choose a dyslexia assessment type to begin the evaluation process.')}
        </p>
      </div>

      <div className="bg-purple-50 rounded-lg p-4 mb-8">
        <p className="text-sm text-purple-800">
          <strong>{t('Note:')}</strong>{' '}
          {t('These assessments are screening tools only and not diagnostic instruments. Results should be discussed with a qualified healthcare professional.')}
        </p>
      </div>

      <div className="grid gap-6">
        {tests.map((test) => (
          <Card key={test.id} className="transition hover:shadow-md">
            <div className="flex items-start p-6">
              <div className="p-3 bg-purple-100 rounded-lg mr-4">
                {test.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{test.name}</h3>
                <p className="text-gray-600 mb-3">{test.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-4">{test.time}</span>
                    <span>{test.questions}</span>
                  </div>
                  <Link to={`/test/dyslexia/${test.id}`}>
                    <Button variant="primary" className="flex items-center">
                      {test.button} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          {t('About Dyslexia Assessment')}
        </h2>
        <p className="text-gray-600 mb-4">
          {t('Dyslexia is a specific learning disorder that primarily affects reading ability. Early detection through screening can help in providing appropriate support and interventions.')}
        </p>
        <p className="text-gray-600">
          {t('This assessment tool provides both a quick screening option and a comprehensive evaluation to help identify potential dyslexia indicators.')}
        </p>
      </div>
    </div>
  );
};

export default DyslexiaTests;
