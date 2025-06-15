import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, where, deleteDoc, serverTimestamp } from 'firebase/firestore';

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

const conductDisorderQuestions = [
  "Bullies, threatens, or intimidates others",
  "Initiates physical fights",
  "Lies to obtain goods for favors or to avoid obligations (\"cons\" others)",
  "Is truant from school (skips school) without permission",
  "Is physically cruel to people",
  "Has stolen items of nontrivial value",
  "Deliberately destroys others' property",
  "Has used a weapon that can cause serious harm (bat, knife, brick, gun)",
  "Is physically cruel to animals",
  "Has deliberately set fires to cause damage",
  "Has broken into someone else's home, business, or car",
  "Has stayed out at night without permission",
  "Has run away from home overnight",
  "Has forced someone into sexual activity"
];

async function deleteExistingConductQuestions() {
  try {
    const questionsRef = collection(db, 'questions');
    const q = query(
      questionsRef, 
      where('category', '==', 'adhd'),
      where('subcategory', '==', 'conduct_disorder')
    );
    
    const querySnapshot = await getDocs(q);
    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
    
    console.log('Successfully deleted existing Conduct Disorder questions');
  } catch (error) {
    console.error('Error deleting existing questions:', error);
    throw error;
  }
}

async function addConductDisorderQuestions() {
  try {
    // First delete existing questions
    await deleteExistingConductQuestions();

    const questionsRef = collection(db, 'questions');
    
    for (const questionText of conductDisorderQuestions) {
      const questionData = {
        text: questionText,
        category: 'adhd',
        subcategory: 'conduct_disorder',
        questionType: 'behavioral',
        options: DEFAULT_BEHAVIORAL_OPTIONS,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const docRef = await addDoc(questionsRef, questionData);
      console.log(`Added question with ID: ${docRef.id}`);
      console.log(`Question text: ${questionText}`);
    }
    console.log('Successfully added all Conduct Disorder behavioral questions');
  } catch (error) {
    console.error('Error adding questions:', error);
  }
}

// Execute the function
addConductDisorderQuestions(); 