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

const hyperactiveQuestions = [
  "Fidgets with hands or feet or squirms in seat",
  "Leaves seat when remaining seated is expected",
  "Runs about or climbs excessively in situations when remaining seated is expected",
  "Has difficulty playing or engaging in leisure activities quietly",
  "Is \"on the go\" or often acts as if \"driven by a motor\"",
  "Talks too much",
  "Blurts out answers before questions have been completed",
  "Has difficulty waiting his or her turn",
  "Interrupts or intrudes on others (butts into conversations or games)"
];

async function addHyperactiveQuestions() {
  try {
    const questionsRef = collection(db, 'questions');
    
    for (const questionText of hyperactiveQuestions) {
      const questionData = {
        text: questionText,
        category: 'adhd',
        subcategory: 'predominantly_hyperactive',
        questionType: 'behavioral',
        options: DEFAULT_BEHAVIORAL_OPTIONS,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const docRef = await addDoc(questionsRef, questionData);
      console.log(`Added question with ID: ${docRef.id}`);
      console.log(`Question text: ${questionText}`);
    }
    console.log('Successfully added all Predominantly Hyperactive behavioral questions');
  } catch (error) {
    console.error('Error adding questions:', error);
  }
}

// Execute the function
addHyperactiveQuestions(); 