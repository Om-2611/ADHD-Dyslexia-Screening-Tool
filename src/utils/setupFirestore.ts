import { doc, writeBatch, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

/**
 * Sets up the Firestore database with the test structure
 * 
 * Structure:
 * tests
 *   └── adhd_focus
 *         ├── title: "Focus and Attention"
 *         ├── type: "adhd"
 *         └── questions
 *               ├── q1
 *               │     ├── text: "Do you find it hard to concentrate?"
 *               │     ├── options: ["Never", "Sometimes", "Often", "Always"]
 *               │     └── weight: [0, 1, 2, 3]
 *               └── q2 ...
 */
interface Question {
  text: string;
  options: string[];
  weight: number[];
}

interface Test {
  title: string;
  type: string;
  questions: { [key: string]: Question };
}

interface SetupResult {
  success: boolean;
  message: string;
}

const setupFirestore = async (): Promise<SetupResult> => {
  try {
    console.log('Setting up Firestore with test structure...');

    // Check if the test already exists to avoid duplicates
    const testRef = doc(db, 'tests', 'adhd_focus');
    const testDoc = await getDoc(testRef);

    if (testDoc.exists()) {
      console.log('Test structure already exists. Skipping setup.');
      return {
        success: true,
        message: 'Test structure already exists. No changes made.',
      };
    }

    // Create a batch for atomic operations
    const batch = writeBatch(db);

    // Define the ADHD Focus test
    const adhdFocusTest: Test = {
      title: "Focus and Attention",
      type: "adhd",
      questions: {
        q1: {
          text: "Do you find it hard to concentrate?",
          options: ["Never", "Sometimes", "Often", "Always"],
          weight: [0, 1, 2, 3],
        },
        q2: {
          text: "How often do you have difficulty focusing on what people say to you, even when they are speaking to you directly?",
          options: ["Never", "Sometimes", "Often", "Always"],
          weight: [0, 1, 2, 3],
        },
        // ... add more questions here
      },
    };

    // Add the test to the batch
    batch.set(testRef, adhdFocusTest);

    // Commit the batch
    await batch.commit();

    return {
      success: true,
      message: 'Test structure set up successfully.',
    };
  } catch (error: unknown) {
    console.error('Error setting up Firestore:', error);
    return {
      success: false,
      message: `Error: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
};

export default setupFirestore;