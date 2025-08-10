import { useTranslation } from 'react-i18next';
import adhdI18n from '../../i18n/adhdI18n';
import LanguageSwitcher from '../../components/ui/LanguageSwitcher';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Brain, Focus, Activity, Heart, AlertTriangle, ArrowRight } from 'lucide-react';
import { adhdCategories } from '../../data/adhdQuestions.js';

const ADHDSubcategorySelection: React.FC = () => {
  const { t } = useTranslation(undefined, { i18n: adhdI18n });
  // ...existing code...
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [questionCounts, setQuestionCounts] = useState<Record<string, number>>({});

  const subcategories = [
    {
      id: 'predominantly_inattentive',
      name: t('adhd.inattentive.title', 'Inattentive ADHD'),
      description: t('adhd.inattentive.description', 'Difficulty focusing, staying organized, and completing tasks'),
      icon: <Brain className="h-8 w-8 text-blue-600" />
    },
    {
      id: 'predominantly_hyperactive',
      name: t('adhd.hyperactive.title', 'Hyperactive ADHD'),
      description: t('adhd.hyperactive.description', 'Excessive movement, impulsivity, and difficulty staying still'),
      icon: <Activity className="h-8 w-8 text-blue-600" />
    },
    {
      id: 'oppositional_defiant_disorder',
      name: t('adhd.odd.title', 'Oppositional Defiant'),
      description: t('adhd.odd.description', 'Patterns of defiant behavior and difficulty with authority'),
      icon: <Focus className="h-8 w-8 text-blue-600" />
    },
    {
      id: 'conduct_disorder',
      name: t('adhd.conduct.title', 'Conduct'),
      description: t('adhd.conduct.description', 'Behavioral issues and rule-breaking patterns'),
      icon: <AlertTriangle className="h-8 w-8 text-blue-600" />
    },
    {
      id: 'anxiety_disorder',
      name: t('adhd.anxiety.title', 'Anxiety'),
      description: t('adhd.anxiety.description', 'Feelings of worry, nervousness, and anxiety'),
      icon: <Heart className="h-8 w-8 text-blue-600" />
    }
  ];

  useEffect(() => {
    // Directly count questions from adhdCategories
    const subcatMap: Record<string, string> = {
      'Predominantly Inattentive': 'predominantly_inattentive',
      'Predominantly Hyperactive': 'predominantly_hyperactive',
      'Oppositional Defiant Disorder': 'oppositional_defiant_disorder',
      'Conduct Disorder': 'conduct_disorder',
      'Anxiety Disorder': 'anxiety_disorder',
    };
    const counts: Record<string, number> = {};
    adhdCategories.forEach(cat => {
      const key = subcatMap[cat.name];
      counts[key] = (cat.behavioralQuestions?.length || 0) + (cat.performanceQuestions?.length || 0);
    });
    setQuestionCounts(counts);
    setLoading(false);
  }, []);

  const handleSubcategorySelect = (subcategoryId: string) => {
    navigate(`/test/adhd/${subcategoryId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-end mb-4">
        {/* Language Switcher for ADHD page */}
        <LanguageSwitcher />
      </div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('adhd.page.title', 'ADHD Assessment Areas')}</h1>
        <p className="text-lg text-gray-600">
          {t('adhd.page.description', 'Select an area to assess specific aspects of ADHD and related behaviors. Each assessment focuses on different symptoms and characteristics.')}
        </p>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 mb-8">
        <p className="text-sm text-blue-800">
          <strong>{t('adhd.page.noteLabel', 'Note:')}</strong> {t('adhd.page.note', 'These assessments are screening tools only and not diagnostic instruments. Results should be discussed with a qualified healthcare professional.')}
        </p>
      </div>

      <div className="grid gap-6">
        {subcategories.map((subcategory) => (
          <Card 
            key={subcategory.id} 
            className={`transition hover:shadow-md ${
              questionCounts[subcategory.id] ? 'cursor-pointer' : 'opacity-50'
            }`}
            onClick={() => questionCounts[subcategory.id] && handleSubcategorySelect(subcategory.id)}
          >
            <div className="flex items-start p-6">
              <div className="p-3 bg-blue-100 rounded-lg mr-4">
                {subcategory.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{subcategory.name}</h3>
                <p className="text-gray-600 mb-3">{subcategory.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {questionCounts[subcategory.id] 
                      ? t('adhd.page.questionsAvailable', { count: questionCounts[subcategory.id], defaultValue: `${questionCounts[subcategory.id]} questions available` })
                      : t('adhd.page.noQuestions', { defaultValue: 'No questions available' })}
                  </span>
                  {questionCounts[subcategory.id] > 0 && (
                    <Button variant="primary" className="flex items-center">
                      {t('adhd.page.startButton', 'Start Assessment')} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ADHDSubcategorySelection; 