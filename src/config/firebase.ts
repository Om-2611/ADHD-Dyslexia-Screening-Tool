import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAy32Hxrdsa3sWHQzdM_SjpKGx_NIDngZw",
  authDomain: "adhd-5e1f2.firebaseapp.com",
  projectId: "adhd-5e1f2",
  storageBucket: "adhd-5e1f2.firebaseapp.com",
  messagingSenderId: "752217867231",
  appId: "1:752217867231:web:5b4609c381b5f675617a6a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;