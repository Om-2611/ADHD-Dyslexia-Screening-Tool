import { adhdCategories } from '../data/adhdQuestions.js';
import { addQuestion } from '../services/firebase';

export const importADHDQuestions = async () => {
  for (const category of adhdCategories) {
    // Add behavioral questions
    for (const question of category.behavioralQuestions) {
      await addQuestion({
        text: question.text,
        category: 'adhd',
        subcategory: question.subcategory.toLowerCase().replace(/ /g, '_') as any,
        questionType: 'behavioral',
        options: {
          never: 0,
          occasionally: 1,
          often: 2,
          very_often: 3
        }
      });
    }

    // Add performance questions
    for (const question of category.performanceQuestions) {
      await addQuestion({
        text: question.text,
        category: 'adhd',
        subcategory: question.subcategory.toLowerCase().replace(/ /g, '_') as any,
        questionType: 'performance',
        options: {
          1: 1,
          2: 2,
          3: 3,
          4: 4,
          5: 5
        }
      });
    }
  }
};