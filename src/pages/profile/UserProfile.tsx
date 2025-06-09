import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/auth/AuthContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { 
  Calendar, 
  Clock, 
  FileText,
  LogOut,
  User as UserIcon
} from 'lucide-react';
import { db } from '../../config/firebase';
import { collection, query, where, orderBy, getDocs, doc, getDoc } from 'firebase/firestore';
import { generateTestPDF } from '../../utils/pdfGenerator';

interface TestResult {
  id: string;
  testType: string;
  testId: string;
  testTitle: string;
  duration: number;
  timestamp: any;
  answers: Record<string, {
    value: number;
    text: string;
    questionType: string;
    subcategory: string;
    questionText: string;
  }>;
  completedAt?: Date;
  userId: string;
}

interface UserProfileData {
  displayName: string;
  email: string;
  gender?: string;
  age?: number;
  createdAt?: Date;
}

const UserProfile: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfileData>({
    displayName: currentUser?.displayName || '',
    email: currentUser?.email || '',
    createdAt: currentUser?.metadata.creationTime ? new Date(currentUser.metadata.creationTime) : undefined,
  });
  const [personalDetailsError, setPersonalDetailsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setUserProfile(prev => ({
            ...prev,
            displayName: userData.displayName || currentUser.displayName || '',
            gender: userData.gender || '',
            age: userData.age || undefined,
          }));
        } else {
          setUserProfile(prev => ({
            ...prev,
            displayName: currentUser.displayName || '',
            email: currentUser.email || '',
            createdAt: currentUser.metadata.creationTime ? new Date(currentUser.metadata.creationTime) : undefined,
          }));
        }

        const testResultsRef = collection(db, 'testResults');
        const q = query(
          testResultsRef,
          where('userId', '==', currentUser.uid),
          orderBy('timestamp', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const results: TestResult[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          results.push({
            id: doc.id,
            ...data,
            timestamp: data.timestamp,
            completedAt: data.timestamp?.toDate ? data.timestamp.toDate() : undefined,
            userId: currentUser.uid,
          } as TestResult);
        });

        setTestResults(results);
        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching user data or test results:', error);
        setPersonalDetailsError(`Failed to load user data or test history. Error: ${error.message || error}`);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
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

    let resultText: string;
    let resultColor: string;

    if (testResult.testType === 'adhd') {
      if (totalScore >= 6) {
        resultText = 'Positive';
        resultColor = 'bg-red-100 text-red-800';
      } else {
        resultText = 'Negative';
        resultColor = 'bg-green-100 text-green-800';
      }
    } else if (testResult.testType === 'dyslexia') {
      if (totalScore >= 10) {
        resultText = 'Positive';
        resultColor = 'bg-red-100 text-red-800';
      } else {
        resultText = 'Negative';
        resultColor = 'bg-green-100 text-green-800';
      }
    } else {
      resultText = 'N/A';
      resultColor = 'bg-gray-100 text-gray-800';
    }

    return { text: resultText, color: resultColor };
  };

  const handleDownloadPDF = async (test: TestResult, user: UserProfileData) => {
    try {
      await generateTestPDF(test, {
        uid: currentUser?.uid || '',
        email: user.email,
        displayName: user.displayName,
        createdAt: user.createdAt || new Date(),
        role: 'user',
        lastLoginAt: new Date(),
        testsTaken: 0,
        isActive: true,
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      setPersonalDetailsError('Failed to generate PDF report.');
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
    <div className="max-w-4xl mx-auto space-y-6">
      {personalDetailsError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {personalDetailsError}
        </div>
      )}

      <Card className="mb-8">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 rounded-full p-4">
              <UserIcon className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{userProfile.displayName || userProfile.email}</h1>
              {userProfile.displayName && <p className="text-gray-600">{userProfile.email}</p>}
              <p className="text-gray-600">
                Member since {userProfile.createdAt?.toLocaleDateString('en-GB') || 'N/A'}
              </p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </Button>
        </div>
      </Card>

      {/* Test History */}
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Test History</h2>
          {testResults.length === 0 ? (
            <p className="text-gray-500">No test results found.</p>
          ) : (
            <div className="space-y-4">
              {testResults.map((test) => {
                const { text: resultText, color: resultColor } = getRiskLevel(test);
                return (
                  <div key={test.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{test.testTitle}</h3>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {test.completedAt?.toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {test.duration} minutes
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-sm ${resultColor}`}>
                          {resultText}
                        </span>
                        <Button
                          onClick={() => handleDownloadPDF(test, userProfile)}
                          variant="outline"
                          className="flex items-center space-x-1"
                        >
                          <FileText className="h-4 w-4" />
                          <span>PDF</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default UserProfile;