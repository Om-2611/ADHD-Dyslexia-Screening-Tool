import React, { useState, useEffect } from 'react';
import { getAllTestResults, getAllUsers, TestResult, UserData } from '../../services/firebase';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Download, Filter, Calendar, Clock, Trophy, FileText, SortAsc, SortDesc, User, Search } from 'lucide-react';
import { generateTestResultPDF, generateUserTestHistoryPDF } from '../../utils/pdfGenerator';

interface FilterOptions {
  userId: string;
  testType: string;
  dateFrom: string;
  dateTo: string;
  searchTerm: string;
}

interface SortOptions {
  sortBy: 'date' | 'score' | 'duration' | 'user';
  sortOrder: 'asc' | 'desc';
}

const UserTestHistory: React.FC = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<TestResult[]>([]);
  const [users, setUsers] = useState<Record<string, UserData>>({});
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    userId: '',
    testType: '',
    dateFrom: '',
    dateTo: '',
    searchTerm: ''
  });
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    sortBy: 'date',
    sortOrder: 'desc'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all users first
        const allUsers = await getAllUsers();
        const userMap: Record<string, UserData> = {};
        allUsers.forEach(user => {
          userMap[user.uid] = user;
        });
        setUsers(userMap);

        // Fetch all test results with filters
        const results = await getAllTestResults(
          {
            userId: filters.userId || undefined,
            testType: filters.testType || undefined,
            dateFrom: filters.dateFrom ? new Date(filters.dateFrom) : undefined,
            dateTo: filters.dateTo ? new Date(filters.dateTo) : undefined,
          },
          sortOptions.sortBy,
          sortOptions.sortOrder
        );

        setTestResults(results);
        
        // Apply search filter
        let filtered = results;
        if (filters.searchTerm) {
          filtered = results.filter(result => {
            const user = userMap[result.userId];
            const searchLower = filters.searchTerm.toLowerCase();
            return (
              result.testTitle.toLowerCase().includes(searchLower) ||
              result.testType.toLowerCase().includes(searchLower) ||
              user?.email.toLowerCase().includes(searchLower) ||
              user?.displayName?.toLowerCase().includes(searchLower)
            );
          });
        }
        
        setFilteredResults(filtered);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters, sortOptions]);

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
    const userData = users[result.userId];
    if (userData) {
      generateTestResultPDF(result, userData, {
        includeAnswers: true,
        includeQuestions: true,
        includeUserInfo: true
      });
    }
  };

  const handleDownloadUserHistory = (userId: string) => {
    const userData = users[userId];
    const userTests = testResults.filter(test => test.userId === userId);
    if (userData && userTests.length > 0) {
      generateUserTestHistoryPDF(userData, userTests);
    }
  };

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSortChange = (sortBy: 'date' | 'score' | 'duration' | 'user') => {
    setSortOptions(prev => ({
      sortBy,
      sortOrder: prev.sortBy === sortBy && prev.sortOrder === 'desc' ? 'asc' : 'desc'
    }));
  };

  const clearFilters = () => {
    setFilters({
      userId: '',
      testType: '',
      dateFrom: '',
      dateTo: '',
      searchTerm: ''
    });
  };

  const getTestTypeOptions = () => {
    const types = [...new Set(testResults.map(test => test.testType))];
    return types;
  };

  const getUsersWithTests = () => {
    const userIds = [...new Set(testResults.map(test => test.userId))];
    return userIds.map(id => users[id]).filter(Boolean);
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
        <h2 className="text-2xl font-bold text-gray-900">User Test Histories</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by user email, name, or test title..."
            value={filters.searchTerm}
            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </Card>

      {/* Filters */}
      {showFilters && (
        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                User
              </label>
              <select
                value={filters.userId}
                onChange={(e) => handleFilterChange('userId', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Users</option>
                {getUsersWithTests().map(user => (
                  <option key={user.uid} value={user.uid}>
                    {user.displayName || user.email}
                  </option>
                ))}
              </select>
            </div>
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
        {(['date', 'score', 'duration', 'user'] as const).map((option) => (
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

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-gray-600">Total Tests</p>
              <p className="text-2xl font-bold">{filteredResults.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm text-gray-600">Unique Users</p>
              <p className="text-2xl font-bold">{new Set(filteredResults.map(r => r.userId)).size}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <div>
              <p className="text-sm text-gray-600">Positive Results</p>
              <p className="text-2xl font-bold">
                {filteredResults.filter(r => getResultStatus(r) === 'Positive').length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-purple-500" />
            <div>
              <p className="text-sm text-gray-600">Avg Duration</p>
              <p className="text-2xl font-bold">
                {filteredResults.length > 0 
                  ? Math.round(filteredResults.reduce((sum, r) => sum + r.duration, 0) / filteredResults.length / 60)
                  : 0}m
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Test Results List */}
      {filteredResults.length === 0 ? (
        <Card className="p-6 text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">
            {testResults.length === 0 ? 'No test results available.' : 'No tests match your filters.'}
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredResults.map((result) => {
            const user = users[result.userId];
            return (
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
                    
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>{user?.displayName || user?.email || 'Unknown User'}</span>
                      </div>
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
                      <span>View</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleDownloadPDF(result)}
                      className="flex items-center space-x-2"
                    >
                      <Download className="h-4 w-4" />
                      <span>PDF</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleDownloadUserHistory(result.userId)}
                      className="flex items-center space-x-2"
                    >
                      <User className="h-4 w-4" />
                      <span>User History</span>
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserTestHistory; 