import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import { FileText, BookOpen, ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import { dyslexiaCategories } from '../data/dyslexiaQuestions.js';

const DyslexiaTests: React.FC = () => {
  const tests = [
    {
      id: 'basic',
      name: 'Basic Dyslexia Screening',
      description: 'A quick assessment to identify key indicators of dyslexia and reading difficulties.',
      icon: <FileText className="h-8 w-8 text-purple-600" />,
      time: '10-12 minutes',
      questions: 19
    },
    {
      id: 'comprehensive',
      name: 'Comprehensive Dyslexia Assessment',
      description: 'An in-depth evaluation covering all aspects of reading, writing, and processing abilities.',
      icon: <BookOpen className="h-8 w-8 text-purple-600" />,
      time: '20-25 minutes',
      questions: 50
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Dyslexia Screening Tests</h1>
        <p className="text-lg text-gray-600">
          Select an assessment to evaluate reading skills, processing abilities, and potential 
          indicators of dyslexia. Choose based on the depth of screening you prefer.
        </p>
      </div>

      <div className="bg-purple-50 rounded-lg p-4 mb-8">
        <p className="text-sm text-purple-800">
          <strong>Note:</strong> These assessments are screening tools only and not diagnostic instruments.
          Results should be discussed with a qualified educational specialist or healthcare professional.
        </p>
      </div>

      <div className="grid gap-6">
        {tests.map((test) => (
          <Card key={test.id} className="transition hover:shadow-md">
            <div className="flex items-start">
              <div className="p-3 bg-purple-100 rounded-lg mr-4">
                {test.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{test.name}</h3>
                <p className="text-gray-600 mb-3">{test.description}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="mr-4">Time: {test.time}</span>
                  <span>Questions: {test.questions}</span>
                </div>
                <Link to={`/test/dyslexia/${test.id}`}>
                  <Button variant="secondary" className="flex items-center">
                    Start Assessment <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3">About Dyslexia Screening</h2>
        <p className="text-gray-600 mb-4">
          Dyslexia is a learning difference that primarily affects reading and related language-based
          processing skills. Early identification can lead to more effective support strategies.
        </p>
        <p className="text-gray-600">
          Our screening tests look at various indicators, including reading fluency, word recognition,
          phonological awareness, and processing speed to help identify potential signs of dyslexia.
        </p>
      </div>
    </div>
  );
};

export default DyslexiaTests;