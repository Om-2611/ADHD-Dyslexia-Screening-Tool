import { ADHDSubcategory } from './firebase';

interface ADHDAnswer {
  questionId: string;
  value: number;
  questionType: 'behavioral' | 'performance';
  subcategory: ADHDSubcategory;
}

export interface ADHDTestResult {
  inattentive: {
    behavioralCount: number;
    totalBehavioralQuestions: number;
    isPositive: boolean;
  };
  hyperactive: {
    behavioralCount: number;
    totalBehavioralQuestions: number;
    isPositive: boolean;
  };
  oppositionalDefiant: {
    behavioralCount: number;
    totalBehavioralQuestions: number;
    isPositive: boolean;
  };
  conductDisorder: {
    behavioralCount: number;
    totalBehavioralQuestions: number;
    isPositive: boolean;
  };
  anxiety: {
    behavioralCount: number;
    totalBehavioralQuestions: number;
    isPositive: boolean;
  };
  executiveFunction: {
    behavioralCount: number;
    totalBehavioralQuestions: number;
    isPositive: boolean;
  };
  socialSkills: {
    behavioralCount: number;
    totalBehavioralQuestions: number;
    isPositive: boolean;
  };
  emotionalRegulation: {
    behavioralCount: number;
    totalBehavioralQuestions: number;
    isPositive: boolean;
  };
  overallResult: string[];
}

export function calculateADHDResult(answers: ADHDAnswer[]): ADHDTestResult {
  const result: ADHDTestResult = {
    inattentive: { behavioralCount: 0, totalBehavioralQuestions: 0, isPositive: false },
    hyperactive: { behavioralCount: 0, totalBehavioralQuestions: 0, isPositive: false },
    oppositionalDefiant: { behavioralCount: 0, totalBehavioralQuestions: 0, isPositive: false },
    conductDisorder: { behavioralCount: 0, totalBehavioralQuestions: 0, isPositive: false },
    anxiety: { behavioralCount: 0, totalBehavioralQuestions: 0, isPositive: false },
    executiveFunction: { behavioralCount: 0, totalBehavioralQuestions: 0, isPositive: false },
    socialSkills: { behavioralCount: 0, totalBehavioralQuestions: 0, isPositive: false },
    emotionalRegulation: { behavioralCount: 0, totalBehavioralQuestions: 0, isPositive: false },
    overallResult: []
  };

  // Process behavioral questions only
  const behavioralAnswers = answers.filter(a => a.questionType === 'behavioral');

  // Count total questions and high scores for each subcategory
  behavioralAnswers.forEach(answer => {
    const isHighScore = answer.value >= 2; // "often" or "very often"
    
    switch (answer.subcategory) {
      case 'predominantly_inattentive':
        result.inattentive.totalBehavioralQuestions++;
        if (isHighScore) result.inattentive.behavioralCount++;
        break;
      case 'predominantly_hyperactive':
        result.hyperactive.totalBehavioralQuestions++;
        if (isHighScore) result.hyperactive.behavioralCount++;
        break;
      case 'oppositional_defiant_disorder':
        result.oppositionalDefiant.totalBehavioralQuestions++;
        if (isHighScore) result.oppositionalDefiant.behavioralCount++;
        break;
      case 'conduct_disorder':
        result.conductDisorder.totalBehavioralQuestions++;
        if (isHighScore) result.conductDisorder.behavioralCount++;
        break;
      case 'anxiety_disorder':
        result.anxiety.totalBehavioralQuestions++;
        if (isHighScore) result.anxiety.behavioralCount++;
        break;
      case 'executive_function':
        result.executiveFunction.totalBehavioralQuestions++;
        if (isHighScore) result.executiveFunction.behavioralCount++;
        break;
      case 'social_skills':
        result.socialSkills.totalBehavioralQuestions++;
        if (isHighScore) result.socialSkills.behavioralCount++;
        break;
      case 'emotional_regulation':
        result.emotionalRegulation.totalBehavioralQuestions++;
        if (isHighScore) result.emotionalRegulation.behavioralCount++;
        break;
    }
  });

  // Evaluate each subcategory based on behavioral criteria
  // Core ADHD symptoms
  if (result.inattentive.totalBehavioralQuestions > 0 && 
      (result.inattentive.behavioralCount / result.inattentive.totalBehavioralQuestions) >= 0.667) {
    result.inattentive.isPositive = true;
    result.overallResult.push("High indication of Inattentive ADHD symptoms");
  }

  if (result.hyperactive.totalBehavioralQuestions > 0 && 
      (result.hyperactive.behavioralCount / result.hyperactive.totalBehavioralQuestions) >= 0.667) {
    result.hyperactive.isPositive = true;
    result.overallResult.push("High indication of Hyperactive ADHD symptoms");
  }

  // Related conditions
  if (result.oppositionalDefiant.totalBehavioralQuestions > 0 && 
      (result.oppositionalDefiant.behavioralCount / result.oppositionalDefiant.totalBehavioralQuestions) >= 0.5) {
    result.oppositionalDefiant.isPositive = true;
    result.overallResult.push("High indication of Oppositional Defiant symptoms");
  }

  if (result.conductDisorder.totalBehavioralQuestions > 0 && 
      (result.conductDisorder.behavioralCount / result.conductDisorder.totalBehavioralQuestions) >= 0.214) {
    result.conductDisorder.isPositive = true;
    result.overallResult.push("High indication of Conduct Disorder symptoms");
  }

  if (result.anxiety.totalBehavioralQuestions > 0 && 
      (result.anxiety.behavioralCount / result.anxiety.totalBehavioralQuestions) >= 0.429) {
    result.anxiety.isPositive = true;
    result.overallResult.push("High indication of Anxiety symptoms");
  }

  // Additional domains
  if (result.executiveFunction.totalBehavioralQuestions > 0 && 
      (result.executiveFunction.behavioralCount / result.executiveFunction.totalBehavioralQuestions) >= 0.6) {
    result.executiveFunction.isPositive = true;
    result.overallResult.push("Significant difficulties with Executive Function");
  }

  if (result.socialSkills.totalBehavioralQuestions > 0 && 
      (result.socialSkills.behavioralCount / result.socialSkills.totalBehavioralQuestions) >= 0.6) {
    result.socialSkills.isPositive = true;
    result.overallResult.push("Significant difficulties with Social Skills");
  }

  if (result.emotionalRegulation.totalBehavioralQuestions > 0 && 
      (result.emotionalRegulation.behavioralCount / result.emotionalRegulation.totalBehavioralQuestions) >= 0.6) {
    result.emotionalRegulation.isPositive = true;
    result.overallResult.push("Significant difficulties with Emotional Regulation");
  }

  if (result.overallResult.length === 0) {
    result.overallResult.push("No significant ADHD or related symptoms detected");
  }

  return result;
}

// Temporary comment to trigger re-linting
export function getADHDRecommendations(result: ADHDTestResult): string[] {
  const recommendations: string[] = [];

  // Core ADHD recommendations
  if (result.inattentive.isPositive) {
    recommendations.push(
      "Consider consulting a mental health professional who specializes in ADHD evaluation.",
      "Implement organizational strategies and time management tools.",
      "Consider breaking tasks into smaller, manageable chunks.",
      "Create structured routines and use visual reminders."
    );
  }

  if (result.hyperactive.isPositive) {
    recommendations.push(
      "Consider regular physical activity to help manage hyperactivity.",
      "Implement movement breaks during long tasks.",
      "Create an environment that allows for productive movement.",
      "Consider stress-reduction techniques and mindfulness practices."
    );
  }

  // Related conditions recommendations
  if (result.oppositionalDefiant.isPositive) {
    recommendations.push(
      "Consider family therapy or parent management training.",
      "Work with a behavioral specialist to develop coping strategies.",
      "Establish clear, consistent rules and consequences.",
      "Focus on positive reinforcement for good behavior."
    );
  }

  if (result.conductDisorder.isPositive) {
    recommendations.push(
      "Seek immediate professional evaluation and intervention.",
      "Consider comprehensive behavioral therapy.",
      "Work with school counselors to develop support strategies.",
      "Establish a strong support network including family, school, and healthcare providers."
    );
  }

  if (result.anxiety.isPositive) {
    recommendations.push(
      "Consider anxiety-specific counseling or therapy.",
      "Learn and practice relaxation techniques.",
      "Develop stress management strategies.",
      "Consider mindfulness or meditation practices."
    );
  }

  // Additional domain recommendations
  if (result.executiveFunction.isPositive) {
    recommendations.push(
      "Work with an occupational therapist on executive function skills.",
      "Use planning tools and visual schedules.",
      "Practice task initiation and completion strategies.",
      "Implement organizational systems at home and work/school."
    );
  }

  if (result.socialSkills.isPositive) {
    recommendations.push(
      "Consider social skills training or group therapy.",
      "Practice reading and responding to social cues.",
      "Work on conversation skills and turn-taking.",
      "Join structured social activities or groups."
    );
  }

  if (result.emotionalRegulation.isPositive) {
    recommendations.push(
      "Learn and practice emotional regulation techniques.",
      "Consider cognitive behavioral therapy (CBT).",
      "Develop a toolkit of coping strategies.",
      "Practice identifying and expressing emotions appropriately."
    );
  }

  if (recommendations.length === 0) {
    recommendations.push(
      "Continue monitoring symptoms and maintain healthy lifestyle habits.",
      "Practice good sleep hygiene and regular exercise.",
      "Consider follow-up screening in 6-12 months if concerns persist."
    );
  }

  return recommendations;
} 