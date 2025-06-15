import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAy32Hxrdsa3sWHQzdM_SjpKGx_NIDngZw",
  authDomain: "adhd-5e1f2.firebaseapp.com",
  projectId: "adhd-5e1f2",
  storageBucket: "adhd-5e1f2.firebasestorage.app",
  messagingSenderId: "752217867231",
  appId: "1:752217867231:web:5b4609c381b5f675617a6a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const DEFAULT_BEHAVIORAL_OPTIONS = {
  never: 0,
  occasionally: 1,
  often: 2,
  very_often: 3
};

const DEFAULT_PERFORMANCE_OPTIONS = {
  very_poor: 1,
  poor: 2,
  average: 3,
  good: 4,
  excellent: 5
};

const adhdQuestions = [
  {
    text: "Does not pay attention to details or makes careless mistakes",
    category: "adhd",
    subcategory: "predominantly_inattentive",
    questionType: "behavioral",
    options: DEFAULT_BEHAVIORAL_OPTIONS
  },
  {
    text: "Has difficulty sustaining attention",
    category: "adhd",
    subcategory: "predominantly_inattentive",
    questionType: "behavioral",
    options: DEFAULT_BEHAVIORAL_OPTIONS
  },
  {
    text: "Often fidgets with hands or feet",
    category: "adhd",
    subcategory: "predominantly_hyperactive",
    questionType: "behavioral",
    options: DEFAULT_BEHAVIORAL_OPTIONS
  }
];

const dyslexiaQuestions = [
  {
    text: "Difficulty recognizing and remembering sight words",
    category: "dyslexia",
    subcategory: "phonological_awareness",
    questionType: "behavioral",
    options: DEFAULT_BEHAVIORAL_OPTIONS
  },
  {
    text: "Struggles with reading fluency",
    category: "dyslexia",
    subcategory: "reading_fluency",
    questionType: "behavioral",
    options: DEFAULT_BEHAVIORAL_OPTIONS
  }
];

async function initializeDatabase() {
  try {
    console.log('Initializing database with sample questions...');
    
    // Add ADHD questions
    for (const question of adhdQuestions) {
      const docRef = await addDoc(collection(db, 'questions'), {
        ...question,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      console.log(`Added ADHD question with ID: ${docRef.id}`);
    }

    // Add Dyslexia questions
    for (const question of dyslexiaQuestions) {
      const docRef = await addDoc(collection(db, 'questions'), {
        ...question,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      console.log(`Added Dyslexia question with ID: ${docRef.id}`);
    }

    console.log('Database initialization completed successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Run the initialization
initializeDatabase(); 