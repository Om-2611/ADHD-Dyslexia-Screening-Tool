import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { ADHDSubcategory, getAllQuestions, Question } from '../../services/firebase';
import { adhdCategories } from '../../data/adhdQuestions';
import { dyslexiaCategories } from '../../data/dyslexiaQuestions';
import { db } from '../../config/firebase.ts';
import { useAuth } from '../../components/auth/AuthContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { updateUserTestCount } from '../../services/firebase';

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

  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!testType || !testId) {
        navigate('/');
        return;
      }

      try {
        let questions: TestQuestion[] = [];
        let title = '';
        let description = '';

        if (testType === 'adhd') {
          // Load questions from adhdQuestions.ts
          const subcatMap: Record<string, string> = {
            'predominantly_inattentive': 'Predominantly Inattentive',
            'predominantly_hyperactive': 'Predominantly Hyperactive',
            'oppositional_defiant_disorder': 'Oppositional Defiant Disorder',
            'conduct_disorder': 'Conduct Disorder',
            'anxiety_disorder': 'Anxiety Disorder',
          };
          const cat = adhdCategories.find(c => c.name === subcatMap[testId]);
          if (cat) {
            questions = [
              ...cat.behavioralQuestions,
              ...cat.performanceQuestions
            ].map(q => ({
              id: q.id,
              text: q.text,
              questionType: q.type as 'behavioral' | 'performance',
              subcategory: testId as ADHDSubcategory,
              options: q.options.map(opt => ({ value: opt.score, text: opt.text }))
            }));
          }

          // Set title and description based on subcategory
          switch (testId as ADHDSubcategory) {
            case 'predominantly_inattentive':
              title = 'Inattentive ADHD Assessment';
              description = 'Evaluate symptoms related to attention, focus, and organization';
              break;
            case 'predominantly_hyperactive':
              title = 'Hyperactive ADHD Assessment';
              description = 'Evaluate symptoms related to hyperactivity and impulsivity';
              break;
            case 'oppositional_defiant_disorder':
              title = 'Oppositional Defiant Assessment';
              description = 'Evaluate patterns of defiant behavior and authority relationships';
              break;
            case 'conduct_disorder':
              title = 'Conduct Assessment';
              description = 'Evaluate behavioral patterns and rule adherence';
              break;
            case 'anxiety_disorder':
              title = 'Anxiety Assessment';
              description = 'Evaluate anxiety symptoms and stress responses';
              break;
            default:
              title = 'ADHD Assessment';
              description = 'Comprehensive evaluation of ADHD symptoms';
          }
        } else if (testType === 'dyslexia') {
          // Load questions from dyslexiaQuestions.js
          const subcatMap: Record<string, string> = {
            'basic': 'Basic Dyslexia Screening',
            'comprehensive': 'Comprehensive Dyslexia Assessment',
          };
          const cat = dyslexiaCategories.find(c => c.name === subcatMap[testId]);
          if (cat) {
            questions = cat.questions.map(q => ({
              id: q.id,
              text: q.text,
              questionType: 'general', // Or determine a suitable type if needed later
              subcategory: cat.name, // Use category name as subcategory
              options: q.options.map(opt => ({ value: opt.score, text: opt.text }))
            }));
            title = cat.name;
            description = testId === 'basic' ? 'Basic screening questions for dyslexia.' : 'Comprehensive assessment questions for dyslexia.'; // Example descriptions
          }
        }

        if (questions.length === 0) {
          navigate('/');
          return;
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
  }, [testType, testId, navigate]);

  if (loading || !testData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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

    try {
      // Only attempt to save to Firebase if currentUser exists
      if (currentUser) {
        const testResultsCollectionRef = collection(db, 'testResults');
        await addDoc(testResultsCollectionRef, {
          userId: currentUser.uid,
          testType,
          testId,
          testTitle: testData.title,
          duration,
          answers,
          timestamp: serverTimestamp(),
          questionTexts: Object.fromEntries(
            Object.entries(answers).map(([key, answer]) => [
              key,
              {
                questionText: answer.questionText,
                answerText: answer.text,
                value: answer.value,
                subcategory: answer.subcategory,
                questionType: answer.questionType
              }
            ])
          )
        });

        // Update user's test count
        await updateUserTestCount(currentUser.uid);
      }

      // Navigate to results page
      navigate('/results', {
        state: {
          testType,
          testId,
          testTitle: testData.title,
          duration,
          answers,
        }
      });
    } catch (error) {
      console.error('Error saving test results:', error);
      // Still navigate to results page even if save fails
      navigate('/results', {
        state: {
          testType,
          testId,
          testTitle: testData.title,
          duration,
          answers,
          error: 'Failed to save results.'
        }
      });
    }
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