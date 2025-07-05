import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../components/auth/AuthContext';
import { BrainCircuit, BookOpen, Users, FileText } from 'lucide-react';
import QuestionManager from '../../components/admin/QuestionManager';
import UserManager from '../../components/admin/UserManager';
import UserTestHistory from './UserTestHistory';

type ActiveTab = 'adhd' | 'dyslexia' | 'users' | 'test-history';

const AdminDashboard: React.FC = () => {
  const { currentUser, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<ActiveTab>('users');
  const [error, setError] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Check if user is admin
  if (!currentUser || currentUser.email !== 'admin@example.com') {
    return <Navigate to="/" />;
  }

  const handleTabChange = (tab: ActiveTab) => {
    setError(null);
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 right-4 z-20">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md bg-white shadow-md"
        >
          <svg
            className="h-6 w-6 text-gray-600"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar - Hidden on mobile unless menu is open */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      } z-10`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1">
            <button
              onClick={() => handleTabChange('users')}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === 'users'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Users className="mr-3 h-5 w-5" />
              User Management
            </button>
            <button
              onClick={() => handleTabChange('test-history')}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === 'test-history'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <FileText className="mr-3 h-5 w-5" />
              Test History
            </button>
            <button
              onClick={() => handleTabChange('adhd')}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === 'adhd'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <BrainCircuit className="mr-3 h-5 w-5" />
              ADHD Questions
            </button>
            <button
              onClick={() => handleTabChange('dyslexia')}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === 'dyslexia'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <BookOpen className="mr-3 h-5 w-5" />
              Dyslexia Questions
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:pl-64">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {activeTab === 'users'
                ? 'User Management'
                : activeTab === 'adhd'
                ? 'ADHD Screening Questions'
                : activeTab === 'dyslexia'
                ? 'Dyslexia Screening Questions'
                : 'Test History'}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {activeTab === 'users'
                ? 'View and manage user information and test history'
                : activeTab === 'test-history'
                ? 'View all users\' test results and history'
                : `Manage screening questions for ${activeTab === 'adhd' ? 'ADHD' : 'Dyslexia'} assessment`}
            </p>
          </div>

          <div className="relative">
            {activeTab === 'users' ? (
              <UserManager />
            ) : activeTab === 'test-history' ? (
              <UserTestHistory />
            ) : (
              <ErrorBoundary onError={(error) => setError(error.message)}>
                <QuestionManager key={activeTab} category={activeTab} />
              </ErrorBoundary>
            )}
          </div>
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; onError: (error: Error) => void },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; onError: (error: Error) => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    this.props.onError(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center py-12">
          <p className="text-red-600">Something went wrong. Please try again.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AdminDashboard;