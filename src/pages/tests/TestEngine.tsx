import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ADHDSubcategory } from '../../services/firebase';
import adhdI18n from '../../i18n/adhdI18n';
import dyslexiaI18n from '../../i18n/dyslexiaI18n';

interface TestParams {
  [key: string]: string | undefined;
  testType: string;
  testId: string;
}

interface TestOption {
  value: number;
  text: string;
}

interface TestQuestion {
  id: string;
  text: string;
  questionType: 'behavioral' | 'performance' | 'general';
  subcategory: ADHDSubcategory | string;
  options: TestOption[];
}

interface TestData {
  title: string;
  description: string;
  questions: TestQuestion[];
}

const TestEngine: React.FC = () => {
  const { testType, testId } = useParams<TestParams>();
  const [currentLanguage, setCurrentLanguage] = useState((testType === 'adhd' ? adhdI18n : dyslexiaI18n).language || 'en');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [testData, setTestData] = useState<TestData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, {
    value: number;
    text: string;
    questionType: 'behavioral' | 'performance' | 'general';
    subcategory: ADHDSubcategory | string;
    questionText: string;
  }>>({});
  const [startTime] = useState<Date>(new Date());

  useEffect(() => {
    // Listen for language changes
    const handleLanguageChanged = (lng: string) => {
      setCurrentLanguage(lng);
    };
    const i18nInstance = testType === 'adhd' ? adhdI18n : dyslexiaI18n;
    i18nInstance.on('languageChanged', handleLanguageChanged);

    const fetchQuestions = async () => {
      if (!testType || !testId) {
        setTestData(null);
        setLoading(false);
        return;
      }

      try {
  let questions: TestQuestion[] = [];
  let title = '';
  let description = '';

        if (testType === 'adhd') {
          // Load questions from adhd language JSON using i18n
          const subcatMap: Record<string, string> = {
            'predominantly_inattentive': 'Predominantly Inattentive',
            'predominantly_hyperactive': 'Predominantly Hyperactive',
            'oppositional_defiant_disorder': 'Oppositional Defiant Disorder',
            'conduct_disorder': 'Conduct Disorder',
            'anxiety_disorder': 'Anxiety Disorder',
          };
          const subcategoryKey = subcatMap[testId];
          // Get translation resource for current language and subcategory
          const adhdResource = adhdI18n.getResource(currentLanguage, 'translation', subcategoryKey);
          if (adhdResource && adhdResource.behavioralQuestions) {
            questions = [
              ...adhdResource.behavioralQuestions,
              ...(adhdResource.performanceQuestions || [])
            ].map((q: any) => ({
              id: q.id,
              text: q.text,
              questionType: q.type || 'behavioral',
              subcategory: subcategoryKey,
              options: (q.options || []).map((opt: any, idx: number) => ({ value: typeof opt.value !== 'undefined' ? opt.value : idx, text: typeof opt === 'string' ? opt : opt.text }))
            }));
          }
          // If translation resource is missing or questions are truly empty, show message
          if (!adhdResource || ((!adhdResource.behavioralQuestions || adhdResource.behavioralQuestions.length === 0) && (!adhdResource.performanceQuestions || adhdResource.performanceQuestions.length === 0))) {
            setTestData({ title: '', description: '', questions: [] });
            setLoading(false);
            return;
          }

          // Set title and description based on subcategory
          switch (testId as ADHDSubcategory) {
            case 'predominantly_inattentive':
              title = currentLanguage === 'hi' ? 'अवधानहीन ADHD मूल्यांकन' : currentLanguage === 'te' ? 'అవధానహీన ADHD అంచనా' : 'Inattentive ADHD Assessment';
              description = currentLanguage === 'hi' ? 'ध्यान, फोकस और संगठन से संबंधित लक्षणों का मूल्यांकन करें' : currentLanguage === 'te' ? 'ధ్యానం, ఫోకస్ మరియు సంస్థతో సంబంధిత లక్షణాలను అంచనా వేయండి' : 'Evaluate symptoms related to attention, focus, and organization';
              break;
            case 'predominantly_hyperactive':
              title = currentLanguage === 'hi' ? 'अत्यधिक सक्रिय ADHD मूल्यांकन' : currentLanguage === 'te' ? 'హైపర్‌యాక్టివ్ ADHD అంచనా' : 'Hyperactive ADHD Assessment';
              description = currentLanguage === 'hi' ? 'अत्यधिक सक्रियता और आवेगशीलता से संबंधित लक्षणों का मूल्यांकन करें' : currentLanguage === 'te' ? 'హైపర్‌యాక్టివిటీ మరియు ఇంపల్సివిటీతో సంబంధిత లక్షణాలను అంచనా వేయండి' : 'Evaluate symptoms related to hyperactivity and impulsivity';
              break;
            case 'oppositional_defiant_disorder':
              title = currentLanguage === 'hi' ? 'विरोधी अवज्ञा मूल्यांकन' : currentLanguage === 'te' ? 'వ్యతిరేక డిఫియంట్ అంచనా' : 'Oppositional Defiant Assessment';
              description = currentLanguage === 'hi' ? 'विरोधी व्यवहार और अधिकार संबंधों के पैटर्न का मूल्यांकन करें' : currentLanguage === 'te' ? 'వ్యతిరేక ప్రవర్తన మరియు అధికార సంబంధాలను అంచనా వేయండి' : 'Evaluate patterns of defiant behavior and authority relationships';
              break;
            case 'conduct_disorder':
              title = currentLanguage === 'hi' ? 'आचरण मूल्यांकन' : currentLanguage === 'te' ? 'కండక్ట్ అంచనా' : 'Conduct Assessment';
              description = currentLanguage === 'hi' ? 'व्यवहार पैटर्न और नियम पालन का मूल्यांकन करें' : currentLanguage === 'te' ? 'ప్రవర్తనా నమూనాలు మరియు నియమాల పాటింపు అంచనా వేయండి' : 'Evaluate behavioral patterns and rule adherence';
              break;
            case 'anxiety_disorder':
              title = currentLanguage === 'hi' ? 'चिंता मूल्यांकन' : currentLanguage === 'te' ? 'ఆతంకం అంచనా' : 'Anxiety Assessment';
              description = currentLanguage === 'hi' ? 'चिंता के लक्षणों और तनाव प्रतिक्रियाओं का मूल्यांकन करें' : currentLanguage === 'te' ? 'ఆతంక లక్షణాలు మరియు ఒత్తిడి ప్రతిక్రియలను అంచనా వేయండి' : 'Evaluate anxiety symptoms and stress responses';
              break;
            default:
              title = currentLanguage === 'hi' ? 'ADHD मूल्यांकन' : currentLanguage === 'te' ? 'ADHD అంచనా' : 'ADHD Assessment';
              description = currentLanguage === 'hi' ? 'ADHD के लक्षणों का व्यापक मूल्यांकन' : currentLanguage === 'te' ? 'ADHD లక్షణాల సమగ్ర అంచనా' : 'Comprehensive evaluation of ADHD symptoms';
          }
        } else if (testType === 'dyslexia') {
          const subcatMap: Record<string, string> = {
            'basic': 'Basic Dyslexia Screening',
            'comprehensive': 'Comprehensive Dyslexia Assessment',
          };
          const subcategoryKey = subcatMap[testId];
          // Get translation resource for current language and subcategory
          const dyslexiaResource = dyslexiaI18n.getResource(currentLanguage, 'questions', subcategoryKey);
          if (dyslexiaResource && dyslexiaResource.questions) {
            questions = dyslexiaResource.questions.map((q: any) => ({
              id: q.id,
              text: q.text,
              questionType: 'general',
              subcategory: subcategoryKey,
              options: q.options.map((opt: any) => ({ value: opt.score, text: opt.text }))
            }));
          }

          title = subcategoryKey;
          description = testId === 'basic' ? 'Basic screening questions for dyslexia.' : 'Comprehensive assessment questions for dyslexia.';
        }

        setTestData({
          title,
          description,
          questions
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        navigate('/');
      }
    };

    fetchQuestions();

    // Cleanup listener on unmount
    return () => {
      const i18nInstance = testType === 'adhd' ? adhdI18n : dyslexiaI18n;
      i18nInstance.off('languageChanged', handleLanguageChanged);
    };
  }, [testType, testId, navigate, currentLanguage]);

  if (loading || !testData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (testData && testData.questions.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500 text-lg">No questions available for this category/language.</div>
      </div>
    );
  }

  const question = testData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / testData.questions.length) * 100;

  const handleOptionSelect = (option: TestOption, questionType: 'behavioral' | 'performance' | 'general') => {
    setAnswers(prev => ({
      ...prev,
      [question.id]: {
        value: option.value,
        text: option.text,
        questionType: questionType,
        subcategory: question.subcategory,
        questionText: question.text
      }
    }));
  };

  const handleNext = () => {
    if (currentQuestion < testData.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    const endTime = new Date();
    const duration = Math.floor((endTime.getTime() - startTime.getTime()) / 1000); // Duration in seconds

    // Log score to console
    const totalScore = Object.values(answers).reduce((sum, ans) => sum + ans.value, 0);
    console.log('Test submitted:', {
      testType,
      testId,
      testTitle: testData?.title,
      duration,
      answers,
      totalScore
    });

    // Navigate to results page
    navigate('/results', {
      state: {
        testType,
        testId,
        testTitle: testData?.title,
        duration,
        answers,
        totalScore
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{testData.title}</h1>
        <p className="text-gray-600 mb-4">{testData.description}</p>

        <div className="bg-gray-100 h-2 rounded-full mb-6">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="mb-4 flex justify-between text-sm text-gray-500">
          <span>Question {currentQuestion + 1} of {testData.questions.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-medium text-gray-800 mb-4">{question.text}</h2>

          <div className="space-y-3">
            {question.options.map((option, optionIndex) => (
              <Button
                key={optionIndex}
                variant={answers[question.id]?.text === option.text ? undefined : 'secondary'}
                onClick={() => handleOptionSelect(option, question.questionType)}
                className={`w-full mb-2 ${answers[question.id]?.text === option.text ? 'bg-green-500 text-white hover:bg-green-600' : ''}`}
              >
                {option.text}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>

          {currentQuestion === testData.questions.length - 1 ? (
            <Button
              onClick={handleSubmit}
              variant="primary"
              className="flex items-center"
              disabled={Object.keys(answers).length < testData.questions.length}
            >
              Submit Test
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              variant="primary"
              className="flex items-center"
              disabled={!answers[question.id]}
            >
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default TestEngine;