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
const DEFAULT_BEHAVIORAL_OPTIONS = [
    { text: 'Never', score: 0 },
    { text: 'Occasionally', score: 0 },
    { text: 'Often', score: 1 },
    { text: 'Very Often', score: 1 }
];
const conductDisorderQuestions = [
    "Often bullies, threatens, or intimidates others",
    "Often initiates physical fights",
    "Has used a weapon that can cause serious physical harm to others",
    "Has been physically cruel to people",
    "Has been physically cruel to animals",
    "Has stolen while confronting a victim",
    "Has forced someone into sexual activity",
    "Has deliberately engaged in fire setting with the intention of causing serious damage",
    "Has deliberately destroyed others' property",
    "Has broken into someone else's house, building, or car",
    "Often lies to obtain goods or favors or to avoid obligations",
    "Has stolen items of nontrivial value without confronting a victim",
    "Often stays out at night despite parental prohibitions",
    "Has run away from home overnight at least twice",
    "Is often truant from school"
];
async function deleteExistingConductDisorderQuestions() {
    try {
        const questionsRef = collection(db, 'questions');
        const q = query(
            questionsRef, 
            where('category', '==', 'adhd'),
            where('subcategory', '==', 'Conduct Disorder')
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
        await deleteExistingConductDisorderQuestions();

        const questionsRef = collection(db, 'questions');
        
        for (const questionText of conductDisorderQuestions) {
            const questionData = {
                text: questionText,
                category: 'adhd',
                subcategory: 'Conduct Disorder',
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
