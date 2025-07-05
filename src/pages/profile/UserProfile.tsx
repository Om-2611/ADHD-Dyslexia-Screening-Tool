import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/auth/AuthContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { 
  Calendar, 
  Clock, 
  LogOut, 
  User as UserIcon, 
  Edit, 
  Save, 
  FileText
} from 'lucide-react';
import { db } from '../../config/firebase.ts';
import { collection, query, where, orderBy, getDocs, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { generateTestPDF } from '../../utils/pdfGenerator';
import { createUserDocument } from '../../services/firebase';

interface TestResult {
  id: string;
  testType: string;
  testId: string;
  testTitle: string;
  duration: number;
  timestamp: any; // Firestore Timestamp
  answers: Record<string, {
    value: number;
    text: string;
    questionType: string;
    subcategory: string;
    questionText: string;
  }>;
  completedAt?: Date; // Added for better date handling
  userId: string; // Added userId based on the error
}

interface UserProfileData {
  displayName: string;
  email: string;
  gender?: string;
  age?: number;
  createdAt?: Date; // Assuming this is available from Firebase Auth or UserData
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
  const [isEditingPersonalDetails, setIsEditingPersonalDetails] = useState(false);
  const [personalDetailsError, setPersonalDetailsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        // Fetch user profile data from Firestore
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setUserProfile(prev => ({
            ...prev,
            displayName: userData.displayName || currentUser.displayName || '',
            email: userData.email || currentUser.email || '',
            gender: userData.gender || '',
            age: userData.age || undefined,
            createdAt: userData.createdAt?.toDate() || (currentUser.metadata.creationTime ? new Date(currentUser.metadata.creationTime) : undefined),
          }));
        } else {
          // If user document doesn't exist, create it
          await createUserDocument(currentUser);
          setUserProfile(prev => ({
            ...prev,
            displayName: currentUser.displayName || '',
            email: currentUser.email || '',
            createdAt: currentUser.metadata.creationTime ? new Date(currentUser.metadata.creationTime) : undefined,
          }));
        }

        // Fetch test results
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

  const handleUpdatePersonalDetails = async () => {
    if (!currentUser) return;
    setPersonalDetailsError(null);
    try {
      const userDocRef = doc(db, 'users', currentUser.uid);

      await setDoc(userDocRef, {
        displayName: userProfile.displayName || null,
        gender: userProfile.gender || null,
        age: userProfile.age || null,
        email: userProfile.email,
        uid: currentUser.uid,
        updatedAt: serverTimestamp(),
      }, { merge: true });

      setIsEditingPersonalDetails(false);
    } catch (error: any) {
      console.error('Error updating personal details:', error);
      setPersonalDetailsError(`Failed to update personal details. Please try again. Error: ${error.message || error}`);
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
        resultColor = 'bg-red-100 text-red-800'; // Indicating positive for ADHD (higher risk)
      } else {
        resultText = 'Negative';
        resultColor = 'bg-green-100 text-green-800'; // Indicating negative for ADHD (lower risk)
      }
    } else if (testResult.testType === 'dyslexia') {
      if (totalScore >= 10) {
        resultText = 'Positive';
        resultColor = 'bg-red-100 text-red-800'; // Indicating positive for Dyslexia (higher risk)
      } else {
        resultText = 'Negative';
        resultColor = 'bg-green-100 text-green-800'; // Indicating negative for Dyslexia (lower risk)
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

      {/* User Info Header */}
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
      
      {/* Personal Details Section */}
      <Card>
        <h2 className="text-xl font-bold text-gray-900 p-6 border-b">Personal Details</h2>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">Display Name:</label>
            {isEditingPersonalDetails ? (
              <input
                type="text"
                className="mt-1 block w-2/3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={userProfile.displayName}
                onChange={(e) => setUserProfile(prev => ({ ...prev, displayName: e.target.value }))}
              />
            ) : (
              <p className="text-gray-900 w-2/3">{userProfile.displayName || 'N/A'}</p>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">Gender:</label>
            {isEditingPersonalDetails ? (
              <select
                className="mt-1 block w-2/3 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={userProfile.gender || ''}
                onChange={(e) => setUserProfile(prev => ({ ...prev, gender: e.target.value }))}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </select>
            ) : (
              <p className="text-gray-900 w-2/3">{userProfile.gender || 'N/A'}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">Age:</label>
            {isEditingPersonalDetails ? (
              <input
                type="number"
                className="mt-1 block w-2/3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={userProfile.age || ''}
                onChange={(e) => setUserProfile(prev => ({ ...prev, age: e.target.value ? parseInt(e.target.value) : undefined }))}
              />
            ) : (
              <p className="text-gray-900 w-2/3">{userProfile.age || 'N/A'}</p>
            )}
          </div>

          <div className="pt-4 flex justify-end">
            {isEditingPersonalDetails ? (
              <Button 
                onClick={handleUpdatePersonalDetails} 
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </Button>
            ) : (
              <Button 
                onClick={() => setIsEditingPersonalDetails(true)} 
                variant="outline"
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <Edit className="h-4 w-4" />
                <span>Edit Details</span>
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Test History Section */}
      <Card>
        <h2 className="text-xl font-bold text-gray-900 p-6 border-b">Your Test History</h2>
        <div className="p-6">
          {!testResults.length ? (
            <p className="text-gray-500">You have not taken any tests yet.</p>
          ) : (
            <div className="space-y-4">
              {testResults.map((test) => (
                <div 
                  key={`${test.id}-${test.timestamp?.toDate()?.getTime() || Date.now()}`} 
                  className="bg-gray-50 rounded-lg p-4 text-sm"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        test.testType === 'adhd' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {((test.testType || 'unknown')).toUpperCase()}
                      </span>
                      <div className="mt-1">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskLevel(test).color}`}>
                          {getRiskLevel(test).text}
                        </span>
                      </div>
                      {/* Display category, subcategory, and result */}
                      <div className="mt-2 text-gray-600">
                        <p className="text-xs">
                          {test.answers && Object.values(test.answers)[0]?.subcategory ? 
                            `${Object.values(test.answers)[0].subcategory.replace(/_/g, ' ').replace(/^[a-z]/, (char: string) => char.toUpperCase())} ${test.testType.toUpperCase()} - ${getRiskLevel(test).text}`
                            : `${test.testType.toUpperCase()} - ${getRiskLevel(test).text}`
                          }
                        </p>
                      </div>
                    </div>
                    <div className="text-right text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {test.completedAt?.toLocaleDateString('en-GB') ?? 'N/A'}
                      </div>
                      <div className="flex items-center mt-1">
                        <Clock className="h-4 w-4 mr-1" />
                        {(test.duration ? (test.duration / 60).toFixed(2) : 'N/A')} minutes
                      </div>
                      <button
                        onClick={() => handleDownloadPDF(test, userProfile)}
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
      </Card>
    </div>
  );
};

export default UserProfile;