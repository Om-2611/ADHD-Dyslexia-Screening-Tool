import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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

type ADHDSubcategory = 
  | 'predominantly_inattentive'
  | 'predominantly_hyperactive'
  | 'oppositional_defiant_disorder'
  | 'conduct_disorder'
  | 'anxiety_disorder';

interface QuestionCount {
  behavioral: number;
  performance: number;
  total: number;
  behavioralLimit: number;
  performanceLimit: number;
}

type SubcategoryStats = {
  [key in ADHDSubcategory]: QuestionCount;
};

const subcategoryLabels: Record<ADHDSubcategory, string> = {
  predominantly_inattentive: 'Predominantly Inattentive',
  predominantly_hyperactive: 'Predominantly Hyperactive',
  oppositional_defiant_disorder: 'Oppositional Defiant Disorder',
  conduct_disorder: 'Conduct Disorder',
  anxiety_disorder: 'Anxiety Disorder'
};

const ADHD_QUESTION_LIMITS = {
  predominantly_inattentive: {
    behavioral: 9,
    performance: 8
  },
  predominantly_hyperactive: {
    behavioral: 9,
    performance: 8
  },
  oppositional_defiant_disorder: {
    behavioral: 8,
    performance: 8
  },
  conduct_disorder: {
    behavioral: 14,
    performance: 8
  },
  anxiety_disorder: {
    behavioral: 7,
    performance: 8
  }
} as const;

async function getQuestionStats() {
  try {
    const questionsRef = collection(db, 'questions');
    const querySnapshot = await getDocs(questionsRef);
    
    // Initialize stats object
    const stats: SubcategoryStats = {
      predominantly_inattentive: { 
        behavioral: 0, 
        performance: 0, 
        total: 0, 
        behavioralLimit: ADHD_QUESTION_LIMITS.predominantly_inattentive.behavioral,
        performanceLimit: ADHD_QUESTION_LIMITS.predominantly_inattentive.performance
      },
      predominantly_hyperactive: { 
        behavioral: 0, 
        performance: 0, 
        total: 0, 
        behavioralLimit: ADHD_QUESTION_LIMITS.predominantly_hyperactive.behavioral,
        performanceLimit: ADHD_QUESTION_LIMITS.predominantly_hyperactive.performance
      },
      oppositional_defiant_disorder: { 
        behavioral: 0, 
        performance: 0, 
        total: 0, 
        behavioralLimit: ADHD_QUESTION_LIMITS.oppositional_defiant_disorder.behavioral,
        performanceLimit: ADHD_QUESTION_LIMITS.oppositional_defiant_disorder.performance
      },
      conduct_disorder: { 
        behavioral: 0, 
        performance: 0, 
        total: 0, 
        behavioralLimit: ADHD_QUESTION_LIMITS.conduct_disorder.behavioral,
        performanceLimit: ADHD_QUESTION_LIMITS.conduct_disorder.performance
      },
      anxiety_disorder: { 
        behavioral: 0, 
        performance: 0, 
        total: 0, 
        behavioralLimit: ADHD_QUESTION_LIMITS.anxiety_disorder.behavioral,
        performanceLimit: ADHD_QUESTION_LIMITS.anxiety_disorder.performance
      }
    };

    // Count questions
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.category === 'adhd' && data.subcategory in stats) {
        const subcategory = data.subcategory as ADHDSubcategory;
        if (data.questionType === 'behavioral') {
          stats[subcategory].behavioral++;
        } else if (data.questionType === 'performance') {
          stats[subcategory].performance++;
        }
        stats[subcategory].total++;
      }
    });

    // Print results in a formatted table
    console.log('\nADHD Question Statistics:\n');
    console.log('╔════════════════════════════════╦═══════════════╦════════════════╦═══════╗');
    console.log('║ Subcategory                    ║   Behavioral  ║  Performance   ║ Total ║');
    console.log('╠════════════════════════════════╬═══════════════╬════════════════╬═══════╣');

    for (const [subcategory, counts] of Object.entries(stats)) {
      const label = subcategoryLabels[subcategory as ADHDSubcategory];
      const behavioralStatus = `${counts.behavioral}/${counts.behavioralLimit}`;
      const performanceStatus = `${counts.performance}/${counts.performanceLimit}`;
      
      console.log(
        `║ ${label.padEnd(30)} ║ ${behavioralStatus.padStart(11)} ║ ${performanceStatus.padStart(12)} ║ ${String(counts.total).padStart(5)} ║`
      );
    }

    console.log('╚════════════════════════════════╩═══════════════╩════════════════╩═══════╝');

  } catch (error) {
    console.error('Error getting question statistics:', error);
  }
}

// Execute the function
getQuestionStats(); 