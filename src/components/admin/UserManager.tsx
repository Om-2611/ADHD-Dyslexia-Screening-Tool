import React, { useState, useEffect } from 'react';
import { getAllUsersWithTestHistory, UserData, TestResult } from '../../services/firebase';
import Card from '../ui/Card';
import { Search, Calendar, Clock, Download, Filter, FileText } from 'lucide-react';
import { generateTestPDF } from '../../utils/pdfGenerator';

const UserManager: React.FC = () => {
  const [usersData, setUsersData] = useState<{ user: UserData; tests: TestResult[] }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'adhd' | 'dyslexia'>('all');
  const [filterResult, setFilterResult] = useState<'all' | 'positive' | 'negative'>('all');
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: '',
    end: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsersWithTestHistory();
      setUsersData(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load user data');
      setLoading(false);
    }
  };

  const getTestScore = (testResult: TestResult) => {
    let totalScore = 0;
    if (testResult?.answers) {
      Object.values(testResult.answers).forEach(answer => {
        if (answer?.value) {
          totalScore += answer.value;
        }
      });
    }
    return totalScore;
  };

  const getRiskLevel = (testResult: TestResult) => {
    const totalScore = getTestScore(testResult);
    let maxScore = 0;

    if (testResult?.testType === 'adhd') {
      maxScore = testResult?.answers ? Object.keys(testResult.answers).length * 4 : 60;
    } else if (testResult?.testType === 'dyslexia') {
      maxScore = testResult?.answers ? Object.keys(testResult.answers).length * 1 : 38;
    }

    const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

    if (percentage < 25) return { text: 'Low Risk', color: 'bg-green-100 text-green-800', isPositive: false };
    if (percentage < 50) return { text: 'Moderate Risk', color: 'bg-yellow-100 text-yellow-800', isPositive: false };
    if (percentage < 75) return { text: 'High Risk', color: 'bg-orange-100 text-orange-800', isPositive: true };
    return { text: 'Very High Risk', color: 'bg-red-100 text-red-800', isPositive: true };
  };

  const filteredUsers = usersData.filter(({ user }) =>
    user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user?.displayName && user.displayName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleExportUserData = (userId: string) => {
    const userData = usersData.find(data => data?.user?.uid === userId);
    if (!userData) return;

    const { user, tests } = userData;
    const csvContent = [
      ['Test Date', 'Category', 'Score', 'Risk Level', 'Duration (minutes)', 'Number of Questions'].join(','),
      ...tests.map(test => [
        test?.timestamp ? test.timestamp.toDate().toLocaleDateString() : 'N/A',
        test?.testType || 'N/A',
        getTestScore(test),
        getRiskLevel(test).text,
        (test?.duration / 60).toFixed(2),
        test?.answers ? Object.keys(test.answers).length : 0
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `test-history-${user?.email || 'unknown'}-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = async (test: TestResult, user: UserData) => {
    try {
      await generateTestPDF(test, user);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setError('Failed to generate PDF report');
    }
  };

  const filterTests = (tests: TestResult[]) => {
    return tests.filter(test => {
      const riskLevel = getRiskLevel(test);
      const testDate = test?.timestamp?.toDate();
      
      // Filter by test type
      if (filterType !== 'all' && test?.testType !== filterType) {
        return false;
      }

      // Filter by result
      if (filterResult !== 'all' && riskLevel.isPositive !== (filterResult === 'positive')) {
        return false;
      }

      // Filter by date range
      if (dateRange.start && testDate && testDate < new Date(dateRange.start)) {
        return false;
      }
      if (dateRange.end && testDate && testDate > new Date(dateRange.end)) {
        return false;
      }

      return true;
    });
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

      {/* Search and Filters */}
      <Card>
        <div className="p-4 space-y-4">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search users by email or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Test Type</label>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
              >
                <option value="all">All Types</option>
                <option value="adhd">ADHD</option>
                <option value="dyslexia">Dyslexia</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Result</label>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={filterResult}
                onChange={(e) => setFilterResult(e.target.value as any)}
              >
                <option value="all">All Results</option>
                <option value="positive">Positive</option>
                <option value="negative">Negative</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* User List */}
      <div className="space-y-4">
        {filteredUsers.map(({ user, tests }) => (
          <Card key={`${user?.uid || ''}-${user?.email || Date.now()}`}>
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {user?.displayName || user?.email || 'Unknown User'}
                  </h3>
                  {user?.displayName && user?.email && (
                    <p className="text-sm text-gray-500">{user.email}</p>
                  )}
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    Joined: {user?.createdAt?.toLocaleDateString() || 'N/A'}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleExportUserData(user?.uid || '')}
                    className="text-blue-600 hover:text-blue-800"
                    title="Export CSV"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => setSelectedUser(selectedUser === user?.uid ? null : user?.uid || null)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  {selectedUser === user?.uid ? 'Hide Test History' : 'Show Test History'}
                </button>
              </div>

              {selectedUser === user?.uid && (
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Test History</h4>
                  {!tests?.length ? (
                    <p className="text-sm text-gray-500">No tests taken yet</p>
                  ) : (
                    <div className="space-y-3">
                      {filterTests(tests).map((test) => (
                        <div
                          key={`${test?.id || ''}-${test?.timestamp?.toDate?.()?.getTime() || Date.now()}`}
                          className="bg-gray-50 rounded-lg p-3 text-sm"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                test?.testType === 'adhd' 
                                  ? 'bg-purple-100 text-purple-800' 
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {((test?.testType || 'unknown')).toUpperCase()}
                              </span>
                              <div className="mt-1 text-gray-900">
                                Score: {getTestScore(test)} / {test?.answers ? Object.keys(test.answers).length * (test?.testType === 'adhd' ? 4 : 1) : 'N/A'}
                              </div>
                              <div className="mt-1">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskLevel(test).color}`}>
                                  {getRiskLevel(test).text}
                                </span>
                              </div>
                              {test?.answers && (
                                <div className="mt-2 text-gray-600">
                                  <h5 className="font-medium">Detailed Answers:</h5>
                                  <ul className="mt-1 space-y-1">
                                    {Object.entries(test.answers).map(([key, answer]) => (
                                      <li key={key} className="text-xs">
                                        {answer.questionText}: {answer.value}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                            <div className="text-right text-gray-500">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {test?.timestamp?.toDate?.()?.toLocaleDateString() ?? 'N/A'}
                              </div>
                              <div className="flex items-center mt-1">
                                <Clock className="h-4 w-4 mr-1" />
                                {(test?.duration ? (test.duration / 60).toFixed(2) : 'N/A')} minutes
                              </div>
                              <button
                                onClick={() => handleDownloadPDF(test, user)}
                                className="mt-2 text-blue-600 hover:text-blue-800"
                                title="Download PDF Report"
                              >
                                <FileText className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserManager; 