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

const inattentiveQuestions = [
  "Does not pay attention to details or makes careless mistakes, such as in homework",
  "Has difficulty sustaining attention to tasks or activities",
  "Does not seem to listen when spoken to directly",
  "Does not follow through on instruction and fails to finish schoolwork (not due to oppositional behavior or failure to understand)",
  "Has difficulty organizing tasks and activities",
  "Avoids, dislikes, or is reluctant to engage in tasks that require sustained mental effort",
  "Loses things necessary for tasks or activities (school assignments, pencils, or books)",
  "Is easily distracted by extraneous stimuli",
  "Is forgetful in daily activities"
];

async function addInattentiveQuestions() {
  try {
    const questionsRef = collection(db, 'questions');
    
    for (const questionText of inattentiveQuestions) {
      const questionData = {
        text: questionText,
        category: 'adhd',
        subcategory: 'predominantly_inattentive',
        questionType: 'behavioral',
        options: DEFAULT_BEHAVIORAL_OPTIONS,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const docRef = await addDoc(questionsRef, questionData);
      console.log(`Added question with ID: ${docRef.id}`);
      console.log(`Question text: ${questionText}`);
    }
    console.log('Successfully added all Predominantly Inattentive behavioral questions');
  } catch (error) {
    console.error('Error adding questions:', error);
  }
}

addInattentiveQuestions(); 