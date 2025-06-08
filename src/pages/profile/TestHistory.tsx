import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/auth/AuthContext';
import { getUserTestResults, TestResult, UserData } from '../../services/firebase';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Download, Filter, Calendar, Clock, Trophy, FileText, SortAsc, SortDesc } from 'lucide-react';
import { generateTestResultPDF, generateUserTestHistoryPDF } from '../../utils/pdfGenerator';

interface FilterOptions {
  testType: string;
  dateFrom: string;
  dateTo: string;
}

interface SortOptions {
  sortBy: 'date' | 'score' | 'duration';
  sortOrder: 'asc' | 'desc';
}

const TestHistory: React.FC = () => {
  const { currentUser } = useAuth();
  const [testHistory, setTestHistory] = useState<TestResult[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    testType: '',
    dateFrom: '',
    dateTo: ''
  });
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    sortBy: 'date',
    sortOrder: 'desc'
  });

  useEffect(() => {
    const fetchTestHistory = async () => {
      if (!currentUser) {
        console.log('No current user, skipping test history fetch.');
        setLoading(false);
        return;
      }

      console.log('Fetching test history for user:', currentUser.uid);
      try {
        const results = await getUserTestResults(
          currentUser.uid,
          {
            testType: filters.testType || undefined,
            dateFrom: filters.dateFrom ? new Date(filters.dateFrom) : undefined,
            dateTo: filters.dateTo ? new Date(filters.dateTo) : undefined,
          },
          sortOptions.sortBy,
          sortOptions.sortOrder
        );

        console.log('Processed Results:', results);
        setTestHistory(results);
        setFilteredHistory(results);
      } catch (error) {
        console.error('Error fetching test history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestHistory();
  }, [currentUser, filters, sortOptions]);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const getResultStatus = (result: TestResult) => {
    let totalScore = 0;
    Object.values(result.answers).forEach(answer => {
      totalScore += answer.value;
    });

    if (result.testType === 'adhd') {
      return totalScore >= 6 ? 'Positive' : 'Negative';
    } else if (result.testType === 'dyslexia') {
      return totalScore >= 10 ? 'Positive' : 'Negative';
    }
    return 'N/A';
  };

  const getTotalScore = (result: TestResult) => {
    let totalScore = 0;
    Object.values(result.answers).forEach(answer => {
      totalScore += answer.value;
    });
    return totalScore;
  };

  const handleDownloadPDF = (result: TestResult) => {
    const userData: UserData = {
      uid: currentUser?.uid || '',
      email: currentUser?.email || '',
      displayName: currentUser?.displayName || '',
      role: 'user',
      createdAt: new Date(),
      lastLoginAt: new Date(),
      testsTaken: testHistory.length,
      isActive: true
    };

    generateTestResultPDF(result, userData, {
      includeAnswers: true,
      includeQuestions: true,
      includeUserInfo: true
    });
  };

  const handleDownloadAllPDF = () => {
    if (!currentUser) return;

    const userData: UserData = {
      uid: currentUser.uid,
      email: currentUser.email || '',
      displayName: currentUser.displayName || '',
      role: 'user',
      createdAt: new Date(),
      lastLoginAt: new Date(),
      testsTaken: testHistory.length,
      isActive: true
    };

    generateUserTestHistoryPDF(userData, testHistory);
  };

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSortChange = (sortBy: 'date' | 'score' | 'duration') => {
    setSortOptions(prev => ({
      sortBy,
      sortOrder: prev.sortBy === sortBy && prev.sortOrder === 'desc' ? 'asc' : 'desc'
    }));
  };

  const clearFilters = () => {
    setFilters({
      testType: '',
      dateFrom: '',
      dateTo: ''
    });
  };

  const getTestTypeOptions = () => {
    const types = [...new Set(testHistory.map(test => test.testType))];
    return types;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Test History</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
          {testHistory.length > 0 && (
            <Button
              onClick={handleDownloadAllPDF}
              className="flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Download All</span>
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Test Type
              </label>
              <select
                value={filters.testType}
                onChange={(e) => handleFilterChange('testType', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Types</option>
                {getTestTypeOptions().map(type => (
                  <option key={type} value={type}>
                    {type.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From Date
              </label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To Date
              </label>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Sort Options */}
      <div className="flex space-x-2">
        <span className="text-sm font-medium text-gray-700 py-2">Sort by:</span>
        {(['date', 'score', 'duration'] as const).map((option) => (
          <Button
            key={option}
            variant={sortOptions.sortBy === option ? 'primary' : 'outline'}
            onClick={() => handleSortChange(option)}
            className="flex items-center space-x-1"
          >
            <span className="capitalize">{option}</span>
            {sortOptions.sortBy === option && (
              sortOptions.sortOrder === 'desc' ? 
                <SortDesc className="h-3 w-3" /> : 
                <SortAsc className="h-3 w-3" />
            )}
          </Button>
        ))}
      </div>

      {/* Test History List */}
      {filteredHistory.length === 0 ? (
        <Card className="p-6 text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">
            {testHistory.length === 0 ? 'No test history available.' : 'No tests match your filters.'}
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredHistory.map((result) => (
            <Card key={result.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{result.testTitle}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      result.testType === 'adhd' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {result.testType.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(result.timestamp)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{Math.floor(result.duration / 60)}:{(result.duration % 60).toString().padStart(2, '0')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Trophy className="h-4 w-4" />
                      <span>Score: {getTotalScore(result)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`font-medium ${
                        getResultStatus(result) === 'Positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        Result: {getResultStatus(result)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <Button
                    variant="outline"
                    onClick={() => window.open(`/results?testId=${result.id}`, '_blank')}
                    className="flex items-center space-x-2"
                  >
                    <FileText className="h-4 w-4" />
                    <span>View Details</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleDownloadPDF(result)}
                    className="flex items-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>PDF</span>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestHistory; 