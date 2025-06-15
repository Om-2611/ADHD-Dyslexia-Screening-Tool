import { collection, doc, writeBatch } from 'firebase/firestore';
import { db } from '../config/firebase';

const initializeFirestore = async () => {
  const batch = writeBatch(db);

  // ADHD Complete Assessment Questions
  const adhdQuestions = [
    {
      id: 'q1',
      text: 'How often do you have difficulty getting things in order when you have to do a task that requires organization?',
      options: [
        { value: 0, text: 'Never' },
        { value: 1, text: 'Rarely' },
        { value: 2, text: 'Sometimes' },
        { value: 3, text: 'Often' },
        { value: 4, text: 'Very Often' }
      ],
      testType: 'adhd',
      testId: 'complete',
      active: true
    },
    {
      id: 'q2',
      text: 'How often do you have difficulty concentrating on what people say to you, even when they are speaking to you directly?',
      options: [
        { value: 0, text: 'Never' },
        { value: 1, text: 'Rarely' },
        { value: 2, text: 'Sometimes' },
        { value: 3, text: 'Often' },
        { value: 4, text: 'Very Often' }
      ],
      testType: 'adhd',
      testId: 'complete',
      active: true
    },
    {
      id: 'q3',
      text: 'How often do you feel restless or fidgety?',
      options: [
        { value: 0, text: 'Never' },
        { value: 1, text: 'Rarely' },
        { value: 2, text: 'Sometimes' },
        { value: 3, text: 'Often' },
        { value: 4, text: 'Very Often' }
      ],
      testType: 'adhd',
      testId: 'complete',
      active: true
    }
  ];

  // Dyslexia Basic Screening Questions
  const dyslexiaQuestions = [
    {
      id: 'q1',
      text: 'Do you find it difficult to sound out unfamiliar words when reading?',
      options: [
        { value: 0, text: 'Never' },
        { value: 1, text: 'Rarely' },
        { value: 2, text: 'Sometimes' },
        { value: 3, text: 'Often' },
        { value: 4, text: 'Very Often' }
      ],
      testType: 'dyslexia',
      testId: 'basic',
      active: true
    },
    {
      id: 'q2',
      text: 'Do you struggle with spelling common words?',
      options: [
        { value: 0, text: 'Never' },
        { value: 1, text: 'Rarely' },
        { value: 2, text: 'Sometimes' },
        { value: 3, text: 'Often' },
        { value: 4, text: 'Very Often' }
      ],
      testType: 'dyslexia',
      testId: 'basic',
      active: true
    }
  ];

  // Add ADHD questions
  for (const question of adhdQuestions) {
    const questionRef = doc(collection(db, 'questions'));
    batch.set(questionRef, question);
  }

  // Add Dyslexia questions
  for (const question of dyslexiaQuestions) {
    const questionRef = doc(collection(db, 'questions'));
    batch.set(questionRef, question);
  }

  // Commit the batch
  await batch.commit();
  console.log('Firestore initialized with test questions');
};

export default initializeFirestore;