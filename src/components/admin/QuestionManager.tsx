import React, { useState, useEffect } from 'react';
import { 
  Question, 
  getAllQuestions, 
  addQuestion, 
  deleteQuestion,
  ADHDSubcategory,
  DyslexiaSubcategory,
  QuestionType,
  ADHD_QUESTION_LIMITS,
  DEFAULT_BEHAVIORAL_OPTIONS,
  DEFAULT_PERFORMANCE_OPTIONS,
  BehavioralOptions,
  PerformanceOptions
} from '../../services/firebase';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Plus, Trash2, Filter } from 'lucide-react';

interface QuestionManagerProps {
  category: 'adhd' | 'dyslexia';
}

interface NewQuestion {
  text: string;
  category: 'adhd' | 'dyslexia';
  subcategory: ADHDSubcategory | DyslexiaSubcategory;
  questionType: QuestionType;
  options: BehavioralOptions | PerformanceOptions;
}

const subcategoryLabels: Record<ADHDSubcategory | DyslexiaSubcategory, string> = {
  // ADHD subcategories
  predominantly_inattentive: 'Predominantly Inattentive',
  predominantly_hyperactive: 'Predominantly Hyperactive',
  oppositional_defiant_disorder: 'Oppositional Defiant Disorder (ODD)',
  conduct_disorder: 'Conduct Disorder (CD)',
  anxiety_disorder: 'Anxiety Disorder',
  // Dyslexia subcategories
  phonological_awareness: 'Phonological Awareness',
  reading_fluency: 'Reading Fluency',
  comprehension: 'Reading Comprehension',
  spelling: 'Spelling',
  writing_skills: 'Writing Skills',
  visual_processing: 'Visual Processing'
};

const QuestionManager: React.FC<QuestionManagerProps> = ({ category }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [selectedQuestionType, setSelectedQuestionType] = useState<QuestionType>('behavioral');
  const [newQuestion, setNewQuestion] = useState<NewQuestion>({
    text: '',
    category: category,
    subcategory: category === 'adhd' ? 'predominantly_inattentive' : 'phonological_awareness',
    questionType: 'behavioral',
    options: DEFAULT_BEHAVIORAL_OPTIONS
  });

  // Remove duplicate declarations and keep only one implementation
  // Remove duplicate declarations and keep only one implementation
  // Remove duplicate declarations and use DEFAULT_PERFORMANCE_OPTIONS
  // Remove duplicate declarations and use DEFAULT_PERFORMANCE_OPTIONS
  const handleQuestionTypeChange = (type: QuestionType) => {
    setSelectedQuestionType(type);
    setNewQuestion({
      ...newQuestion,
      questionType: type,
      options: type === 'behavioral' ? DEFAULT_BEHAVIORAL_OPTIONS : {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5
      }
    });
  };

  const subcategories = category === 'adhd' 
    ? ['predominantly_inattentive', 'predominantly_hyperactive', 'oppositional_defiant_disorder', 'conduct_disorder', 'anxiety_disorder'] as ADHDSubcategory[]
    : ['phonological_awareness', 'reading_fluency', 'comprehension', 'spelling', 'writing_skills', 'visual_processing'] as DyslexiaSubcategory[];

  useEffect(() => {
    loadQuestions();
  }, [category]);

  useEffect(() => {
    setNewQuestion(prev => ({
      ...prev,
      category: category,
      subcategory: category === 'adhd' ? 'predominantly_inattentive' : 'phonological_awareness'
    }));
  }, [category]);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedQuestions = await getAllQuestions(category);
      setQuestions(fetchedQuestions);
    } catch (err) {
      setError('Error loading questions. Please try again.');
      console.error('Error loading questions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setError(null);
      await deleteQuestion(id);
      await loadQuestions();
    } catch (err) {
      setError('Error deleting question. Please try again.');
      console.error('Error deleting question:', err);
    }
  };

  // Remove all other declarations and keep only this one
  const handleQuestionTypeChange = (type: QuestionType) => {
    setSelectedQuestionType(type);
    setNewQuestion({
      ...newQuestion,
      questionType: type,
      options: type === 'behavioral' ? DEFAULT_BEHAVIORAL_OPTIONS : DEFAULT_PERFORMANCE_OPTIONS
    });
  };

  const handleSubcategoryChange = (value: string) => {
    setNewQuestion({ 
      ...newQuestion, 
      subcategory: value as ADHDSubcategory | DyslexiaSubcategory 
    });
  };

  const handleAddQuestion = async () => {
    try {
      setError(null);
      if (!newQuestion.text) {
        setError('Please fill in the question text');
        return;
      }

      const questionToAdd = {
        ...newQuestion,
        options: newQuestion.questionType === 'behavioral' ? {
          never: 0,
          occasionally: 1,
          often: 2,
          very_often: 3
        } : {
          1: 1,
          2: 2,
          3: 3,
          4: 4,
          5: 5
        }
      };

      await addQuestion(questionToAdd);
      setNewQuestion({
        ...newQuestion,
        text: ''
      });
      await loadQuestions();
    } catch (err) {
      setError('Failed to add question. Please try again.');
      console.error('Error adding question:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {/* Question Type Toggle */}
      <Card>
        <div className="p-4">
          <div className="flex space-x-4">
            <button
              onClick={() => handleQuestionTypeChange('behavioral')}
              className={`px-4 py-2 rounded-md ${
                selectedQuestionType === 'behavioral'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Behavioral Questions
            </button>
            <button
              onClick={() => handleQuestionTypeChange('performance')}
              className={`px-4 py-2 rounded-md ${
                selectedQuestionType === 'performance'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Performance Questions
            </button>
          </div>
        </div>
      </Card>

      {/* Subcategory Filter */}
      <Card>
        <div className="p-4">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={selectedSubcategory}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
            >
              <option value="all">All Subcategories</option>
              {subcategories.map((subcat) => (
                <option key={subcat} value={subcat}>
                  {subcat.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Add New Question Form */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Add New {selectedQuestionType === 'behavioral' ? 'Behavioral' : 'Performance'} Question
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Subcategory</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={newQuestion.subcategory}
                onChange={(e) => handleSubcategoryChange(e.target.value)}
              >
                {subcategories.map((subcat) => (
                  <option key={subcat} value={subcat}>
                    {subcat.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Question Text</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={newQuestion.text}
                onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
              />
            </div>
            <Button
              onClick={handleAddQuestion}
              className="flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          </div>
        </div>
      </Card>

      {/* Question List */}
      <div className="space-y-4">
        {questions
          .filter(q => {
            const matchesSubcategory = selectedSubcategory === 'all' || q.subcategory === selectedSubcategory;
            const matchesType = q.questionType === selectedQuestionType;
            return matchesSubcategory && matchesType;
          })
          .map((question) => (
            <Card key={question.id}>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      {question.subcategory.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                    <h4 className="text-lg font-medium text-gray-900">{question.text}</h4>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDelete(question.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {question.questionType === 'behavioral' ? (
                    // Render behavioral options
                    Object.entries(question.options).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center text-sm text-gray-600 bg-gray-50 p-2 rounded">
                        <span className="font-medium">{key}</span>
                        <span>Weight: {value}</span>
                      </div>
                    ))
                  ) : (
                    // Render performance options
                    Object.entries(question.options as PerformanceOptions).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center text-sm text-gray-600 bg-gray-50 p-2 rounded">
                        <span className="font-medium">
                          {key === '1' ? 'Very Poor' :
                           key === '2' ? 'Poor' :
                           key === '3' ? 'Average' :
                           key === '4' ? 'Good' :
                           'Excellent'}
                        </span>
                        <span>Weight: {value}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default QuestionManager;