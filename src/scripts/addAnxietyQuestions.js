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
const anxietyQuestions = [
    "Is fearful, anxious, or worried",
    "Is afraid to try new things for fear of making mistakes",
    "Feels worthless or inferior",
    "Blames self for problems, feels guilty",
    "Feels lonely, unwanted, or unloved; complains that \"no one loves\" him or her",
    "Is sad, unhappy, or depressed",
    "Is self-conscious or easily embarrassed"
];
async function deleteExistingAnxietyQuestions() {
    try {
        const questionsRef = collection(db, 'questions');
        const q = query(questionsRef, where('category', '==', 'adhd'), where('subcategory', '==', 'anxiety_disorder'));
        const querySnapshot = await getDocs(q);
        const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
        await Promise.all(deletePromises);
        console.log('Successfully deleted existing Anxiety Disorder questions');
    }
    catch (error) {
        console.error('Error deleting existing questions:', error);
        throw error;
    }
}
async function addAnxietyQuestions() {
    try {
        // First delete existing questions
        await deleteExistingAnxietyQuestions();
        const questionsRef = collection(db, 'questions');
        for (const questionText of anxietyQuestions) {
            const questionData = {
                text: questionText,
                category: 'adhd',
                subcategory: 'anxiety_disorder',
                questionType: 'behavioral',
                options: DEFAULT_BEHAVIORAL_OPTIONS,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            };
            const docRef = await addDoc(questionsRef, questionData);
            console.log(`Added question with ID: ${docRef.id}`);
            console.log(`Question text: ${questionText}`);
        }
        console.log('Successfully added all Anxiety Disorder behavioral questions');
    }
    catch (error) {
        console.error('Error adding questions:', error);
    }
}
// Execute the function
addAnxietyQuestions();
