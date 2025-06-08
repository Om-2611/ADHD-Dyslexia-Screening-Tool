import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/auth/AuthContext';
import { Brain, FileText, ArrowRight } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Home: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Screening tool for ADHD and Dyslexia
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Free, confidential assessments for ADHD and Dyslexia to help you better
          understand your mental health and cognitive patterns.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card className="transition-transform hover:shadow-lg hover:-translate-y-1">
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-blue-100 rounded-full mb-4">
              <Brain className="h-10 w-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">ADHD Screening</h2>
            <p className="text-gray-600 mb-6">
              Evaluate attention, focus, activity levels, and behavior patterns that 
              may indicate Attention-Deficit/Hyperactivity Disorder.
            </p>
            <Link to={currentUser ? "/adhd" : "/login"}>
              <Button className="flex items-center">
                Take Assessment <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="transition-transform hover:shadow-lg hover:-translate-y-1">
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-purple-100 rounded-full mb-4">
              <FileText className="h-10 w-10 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Dyslexia Screening</h2>
            <p className="text-gray-600 mb-6">
              Assess reading, writing, and processing abilities to identify potential
              signs of Dyslexia and other learning differences.
            </p>
            <Link to={currentUser ? "/dyslexia" : "/login"}>
              <Button variant="secondary" className="flex items-center">
                Take Assessment <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      <div className="bg-blue-50 rounded-xl p-6 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Use Our Screening Tools?</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Confidential</h3>
            <p className="text-gray-600">Your information is private and secure</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Evidence-Based</h3>
            <p className="text-gray-600">Assessments built on clinical research</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Free Access</h3>
            <p className="text-gray-600">No cost to use our screening tools</p>
          </div>
        </div>
      </div>

      <div className="text-center bg-gray-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Important Notice</h2>
        <p className="text-gray-600 mb-4">
          These screening tools are not meant to replace professional evaluation and diagnosis.
          If you're concerned about your mental health, please consult with a healthcare professional.
        </p>
        {!currentUser && (
          <div className="mt-6">
            <p className="font-medium text-gray-900 mb-4">
              Create an account to save your results and track your progress over time.
            </p>
            <Link to="/signup">
              <Button variant="primary" size="lg">
                Sign Up Now
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;