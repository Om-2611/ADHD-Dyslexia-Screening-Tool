import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import app from '../config/firebase.js';
import { createUserDocument } from '../services/firebase.js';

const emails = [
  'shruthi@adhd.com',
  'prakhar@adhd.com',
  'balakarthik@adhd.com',
  'srihith@adhd.com',
  'jeevansai@adhd.com',
  'saisrinivas@adhd.com',
  'abhivarshith@adhd.com',
  'vansh@adhd.com',
  'akshyasai@adhd.com',
  'abhirama@adhd.com',
  'oswinjacob@adhd.com',
  'aurel@adhd.com',
  'deekshith@adhd.com',
  'sahithreddy@adhd.com',
  'aravind@adhd.com',
  'bavithreddy@adhd.com',
  'aayushlahoti@adhd.com',
  'bhoomika@adhd.com',
  'prathiksh@adhd.com',
  'snehithreddy@adhd.com',
  'balasamhitha@adhd.com',
  'raventh@adhd.com',
  'joshikap@adhd.com',
  'ebenezer@adhd.com',
  'nayanaankam@adhd.com',
  'pravallikha@adhd.com',
  'girishkumar@adhd.com',
  'advaithpula@adhd.com',
  'jayeshagarwal@adhd.com',
  'abhiramp@adhd.com',
  'adithyasai@adhd.com',
  'james@adhd.com',
  'seantulli@adhd.com'
];

const password = '123456';

const createUsers = async () => {
  const auth = getAuth(app);
  
  for (const email of emails) {
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Create user document in Firestore
      await createUserDocument(user);
      
      console.log(`Successfully created user: ${email}`);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log(`User already exists: ${email}`);
      } else {
        console.error(`Error creating user ${email}:`, error.message);
      }
    }
  }
};

// Execute the function
createUsers().then(() => {
  console.log('Finished creating users');
}).catch((error) => {
  console.error('Error in main execution:', error);
}); 