import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  updateDoc, 
  doc, 
  serverTimestamp,
  DocumentData,
  QueryDocumentSnapshot,
  deleteDoc,
  orderBy,
  setDoc
} from 'firebase/firestore';
import { db } from '../config/firebase.ts';
import { User } from 'firebase/auth';

export interface UserData {
  uid: string;
  email: string;
  displayName?: string;
  role: 'user' | 'admin';
  createdAt: Date;
  lastLoginAt: Date;
  testsTaken: number;
  isActive: boolean;
}

export interface TestResult {
  id: string;
  userId: string;
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
  score?: number;
  result?: 'Positive' | 'Negative';
  completedAt?: Date;
}

export type ADHDSubcategory = 
  | 'predominantly_inattentive'
  | 'predominantly_hyperactive'
  | 'oppositional_defiant_disorder'
  | 'conduct_disorder'
  | 'anxiety_disorder';

export type DyslexiaSubcategory = 
  | 'phonological_awareness'
  | 'reading_fluency'
  | 'comprehension'
  | 'spelling'
  | 'writing_skills'
  | 'visual_processing';

export type QuestionType = 'behavioral' | 'performance';

export interface BehavioralOptions {
  never: number;
  occasionally: number;
  often: number;
  very_often: number;
}

export interface PerformanceOptions {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

export interface Question {
  id: string;
  text: string;
  category: 'adhd' | 'dyslexia';
  subcategory: ADHDSubcategory | DyslexiaSubcategory;
  questionType: QuestionType;
  options: BehavioralOptions | PerformanceOptions;
  createdAt: Date;
  updatedAt: Date;
}

export const ADHD_QUESTION_LIMITS = {
  predominantly_inattentive: {
    behavioral: 9,
    performance: 8
  },
  predominantly_hyperactive: {
    behavioral: 9,
    performance: 8
  },
  oppositional_defiant_disorder: {
    behavioral: 8,
    performance: 8
  },
  conduct_disorder: {
    behavioral: 14,
    performance: 8
  },
  anxiety_disorder: {
    behavioral: 7,
    performance: 8
  }
} as const;

export const DEFAULT_BEHAVIORAL_OPTIONS: BehavioralOptions = {
  never: 0,
  occasionally: 1,
  often: 2,
  very_often: 3
};

export const DEFAULT_PERFORMANCE_OPTIONS: PerformanceOptions = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5
};

export const createUserDocument = async (user: User): Promise<void> => {
  try {
    const userRef = collection(db, 'users');
    const q = query(userRef, where('uid', '==', user.uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // Create new user document with UID as document ID
      await setDoc(doc(userRef, user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || null,
        gender: null,
        age: null,
        role: user.email === 'admin@example.com' ? 'admin' : 'user',
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
        testsTaken: 0,
        isActive: true
      });
    } else {
      // Update last login (and ensure display name is updated if it was missing)
      const userDoc = querySnapshot.docs[0];
      await updateDoc(doc(db, 'users', userDoc.id), {
        lastLoginAt: serverTimestamp(),
        // Also update displayName here in case it wasn't set initially
        displayName: user.displayName || userDoc.data().displayName || null,
      });
    }
  } catch (error) {
    console.error('Error creating/updating user document:', error);
    throw error;
  }
};

export const getAllUsers = async (): Promise<UserData[]> => {
  try {
    const usersRef = collection(db, 'users');
    const querySnapshot = await getDocs(usersRef);
    
    return querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
      const data = doc.data();
      return {
        ...data,
        createdAt: data.createdAt?.toDate(),
        lastLoginAt: data.lastLoginAt?.toDate()
      } as UserData;
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getUsersByRole = async (role: 'user' | 'admin'): Promise<UserData[]> => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('role', '==', role));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
      const data = doc.data();
      return {
        ...data,
        createdAt: data.createdAt?.toDate(),
        lastLoginAt: data.lastLoginAt?.toDate()
      } as UserData;
    });
  } catch (error) {
    console.error('Error fetching users by role:', error);
    throw error;
  }
};

export const updateUserTestCount = async (uid: string): Promise<void> => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('uid', '==', uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      await updateDoc(doc(db, 'users', userDoc.id), {
        testsTaken: (userDoc.data().testsTaken || 0) + 1,
        lastUpdated: serverTimestamp()
      });
    }
  } catch (error) {
    console.error('Error updating user test count:', error);
    throw error;
  }
};

export const getAllQuestions = async (
  category?: 'adhd' | 'dyslexia',
  subcategory?: ADHDSubcategory | DyslexiaSubcategory
): Promise<Question[]> => {
  try {
    const questionsRef = collection(db, 'questions');
    let q;

    if (category && subcategory) {
      q = query(questionsRef, 
        where('category', '==', category),
        where('subcategory', '==', subcategory)
      );
    } else if (category) {
      q = query(questionsRef, where('category', '==', category));
    } else {
      q = query(questionsRef);
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as any),
      createdAt: (doc.data() as any).createdAt?.toDate(),
      updatedAt: (doc.data() as any).updatedAt?.toDate()
    })) as Question[];
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};

export const getQuestionCount = async (
  category: 'adhd',
  subcategory: ADHDSubcategory,
  questionType: QuestionType
): Promise<number> => {
  try {
    const questionsRef = collection(db, 'questions');
    const q = query(
      questionsRef,
      where('category', '==', category),
      where('subcategory', '==', subcategory),
      where('questionType', '==', questionType)
    );
    const snapshot = await getDocs(q);
    return snapshot.size;
  } catch (error) {
    console.error('Error getting question count:', error);
    throw error;
  }
};

export const addQuestion = async (
  question: Omit<Question, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> => {
  try {
    // Check question limit if it's an ADHD question
    if (question.category === 'adhd') {
      const currentCount = await getQuestionCount(
        'adhd',
        question.subcategory as ADHDSubcategory,
        question.questionType
      );
      const limit = ADHD_QUESTION_LIMITS[question.subcategory as ADHDSubcategory][
        question.questionType === 'behavioral' ? 'behavioral' : 'performance'
      ];

      if (currentCount >= limit) {
        throw new Error(
          `Cannot add more ${question.questionType} questions to ${question.subcategory}. Limit is ${limit}.`
        );
      }
    }

    const questionsRef = collection(db, 'questions');
    const docRef = await addDoc(questionsRef, {
      ...question,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding question:', error);
    throw error;
  }
};

export const updateQuestion = async (id: string, updates: Partial<Omit<Question, 'id' | 'createdAt' | 'updatedAt'>>): Promise<void> => {
  try {
    const questionRef = doc(db, 'questions', id);
    await updateDoc(questionRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating question:', error);
    throw error;
  }
};

export const deleteQuestion = async (id: string): Promise<void> => {
  try {
    const questionRef = doc(db, 'questions', id);
    await deleteDoc(questionRef);
  } catch (error) {
    console.error('Error deleting question:', error);
    throw error;
  }
};

export const deleteAllQuestions = async (): Promise<void> => {
  try {
    const questionsRef = collection(db, 'questions');
    const querySnapshot = await getDocs(questionsRef);
    
    const deletePromises = querySnapshot.docs.map(doc => 
      deleteDoc(doc.ref)
    );
    
    await Promise.all(deletePromises);
  } catch (error) {
    console.error('Error deleting all questions:', error);
    throw error;
  }
};

export const getUserWithTestHistory = async (userId: string): Promise<{ user: UserData; tests: TestResult[] } | null> => {
  try {
    // Get user document
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('uid', '==', userId));
    const userSnapshot = await getDocs(q);

    if (userSnapshot.empty) {
      return null;
    }

    const userData = userSnapshot.docs[0].data() as UserData;

    // Get user's test results
    const testsRef = collection(db, 'testResults');
    const testsQuery = query(testsRef, where('userId', '==', userId));
    const testsSnapshot = await getDocs(testsQuery);

    const tests = testsSnapshot.docs.map(doc => ({
      id: doc.id,
      userId: doc.data().userId,
      testType: doc.data().testType,
      testId: doc.data().testId,
      testTitle: doc.data().testTitle,
      duration: doc.data().duration,
      answers: doc.data().answers,
      timestamp: doc.data().timestamp
    })) as TestResult[];

    return {
      user: userData,
      tests: tests
    };
  } catch (error) {
    console.error('Error fetching user with test history:', error);
    throw error;
  }
};

export const getAllUsersWithTestHistory = async (): Promise<{ user: UserData; tests: TestResult[] }[]> => {
  try {
    // Get all users
    const usersRef = collection(db, 'users');
    const usersSnapshot = await getDocs(usersRef);
    
    // Get all test results
    const testsRef = collection(db, 'testResults');
    const testsSnapshot = await getDocs(testsRef);
    
    const testsByUser = testsSnapshot.docs.reduce((acc, doc) => {
      const data = doc.data();
      const test = {
        id: doc.id,
        userId: data.userId,
        testType: data.testType,
        testId: data.testId,
        testTitle: data.testTitle,
        duration: data.duration,
        answers: data.answers,
        timestamp: data.timestamp,
        score: data.score,
        result: data.result,
        completedAt: data.timestamp?.toDate()
      } as TestResult;
      
      if (!acc[test.userId]) {
        acc[test.userId] = [];
      }
      acc[test.userId].push(test);
      return acc;
    }, {} as Record<string, TestResult[]>);

    return usersSnapshot.docs.map(doc => {
      const userData = {
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        lastLoginAt: doc.data().lastLoginAt?.toDate()
      } as UserData;

      return {
        user: userData,
        tests: testsByUser[userData.uid] || []
      };
    });
  } catch (error) {
    console.error('Error fetching all users with test history:', error);
    throw error;
  }
};

// Get test results for a specific user with filtering and sorting
export const getUserTestResults = async (
  userId: string,
  filters?: {
    testType?: string;
    dateFrom?: Date;
    dateTo?: Date;
  },
  sortBy?: 'date' | 'score' | 'duration',
  sortOrder?: 'asc' | 'desc'
): Promise<TestResult[]> => {
  try {
    const testsRef = collection(db, 'testResults');
    let q = query(testsRef, where('userId', '==', userId));
    
    // Add date ordering for consistent results
    q = query(q, orderBy('timestamp', 'desc'));
    
    const querySnapshot = await getDocs(q);
    let results = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        userId: data.userId,
        testType: data.testType,
        testId: data.testId,
        testTitle: data.testTitle,
        duration: data.duration,
        answers: data.answers,
        timestamp: data.timestamp,
        score: data.score,
        result: data.result,
        completedAt: data.timestamp?.toDate()
      } as TestResult;
    });

    // Apply filters
    if (filters) {
      if (filters.testType) {
        results = results.filter(test => test.testType === filters.testType);
      }
      if (filters.dateFrom) {
        results = results.filter(test => 
          test.completedAt && test.completedAt >= filters.dateFrom!
        );
      }
      if (filters.dateTo) {
        results = results.filter(test => 
          test.completedAt && test.completedAt <= filters.dateTo!
        );
      }
    }

    // Apply sorting
    if (sortBy) {
      results.sort((a, b) => {
        let aValue: any, bValue: any;
        
        switch (sortBy) {
          case 'date':
            aValue = a.completedAt?.getTime() || 0;
            bValue = b.completedAt?.getTime() || 0;
            break;
          case 'score':
            aValue = a.score || 0;
            bValue = b.score || 0;
            break;
          case 'duration':
            aValue = a.duration || 0;
            bValue = b.duration || 0;
            break;
          default:
            return 0;
        }
        
        const comparison = aValue - bValue;
        return sortOrder === 'desc' ? -comparison : comparison;
      });
    }

    return results;
  } catch (error) {
    console.error('Error fetching user test results:', error);
    throw error;
  }
};

// Get all test results with filtering for admin
export const getAllTestResults = async (
  filters?: {
    userId?: string;
    testType?: string;
    dateFrom?: Date;
    dateTo?: Date;
  },
  sortBy?: 'date' | 'score' | 'duration' | 'user',
  sortOrder?: 'asc' | 'desc'
): Promise<TestResult[]> => {
  try {
    const testsRef = collection(db, 'testResults');
    let q = query(testsRef, orderBy('timestamp', 'desc'));
    
    const querySnapshot = await getDocs(q);
    let results = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        userId: data.userId,
        testType: data.testType,
        testId: data.testId,
        testTitle: data.testTitle,
        duration: data.duration,
        answers: data.answers,
        timestamp: data.timestamp,
        score: data.score,
        result: data.result,
        completedAt: data.timestamp?.toDate()
      } as TestResult;
    });

    // Apply filters
    if (filters) {
      if (filters.userId) {
        results = results.filter(test => test.userId === filters.userId);
      }
      if (filters.testType) {
        results = results.filter(test => test.testType === filters.testType);
      }
      if (filters.dateFrom) {
        results = results.filter(test => 
          test.completedAt && test.completedAt >= filters.dateFrom!
        );
      }
      if (filters.dateTo) {
        results = results.filter(test => 
          test.completedAt && test.completedAt <= filters.dateTo!
        );
      }
    }

    // Apply sorting
    if (sortBy && sortBy !== 'user') {
      results.sort((a, b) => {
        let aValue: any, bValue: any;
        
        switch (sortBy) {
          case 'date':
            aValue = a.completedAt?.getTime() || 0;
            bValue = b.completedAt?.getTime() || 0;
            break;
          case 'score':
            aValue = a.score || 0;
            bValue = b.score || 0;
            break;
          case 'duration':
            aValue = a.duration || 0;
            bValue = b.duration || 0;
            break;
          default:
            return 0;
        }
        
        const comparison = aValue - bValue;
        return sortOrder === 'desc' ? -comparison : comparison;
      });
    }

    return results;
  } catch (error) {
    console.error('Error fetching all test results:', error);
    throw error;
  }
};

// Get a specific test result by ID
export const getTestResultById = async (testId: string): Promise<TestResult | null> => {
  try {
    const testRef = doc(db, 'testResults', testId);
    const testDoc = await getDocs(query(collection(db, 'testResults'), where('__name__', '==', testId)));
    
    if (testDoc.empty) {
      return null;
    }

    const data = testDoc.docs[0].data();
    return {
      id: testDoc.docs[0].id,
      userId: data.userId,
      testType: data.testType,
      testId: data.testId,
      testTitle: data.testTitle,
      duration: data.duration,
      answers: data.answers,
      timestamp: data.timestamp,
      score: data.score,
      result: data.result,
      completedAt: data.timestamp?.toDate()
    } as TestResult;
  } catch (error) {
    console.error('Error fetching test result by ID:', error);
    throw error;
  }
}; 