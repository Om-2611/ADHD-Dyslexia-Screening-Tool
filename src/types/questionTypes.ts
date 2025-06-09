export interface QuestionOption {
  text: string;
  score: number;
}

export interface Question {
  id: string;
  text: string;
  subcategory: string;
  options: QuestionOption[];
  type?: string; // Add type as it's present in some questions
}

export interface QuestionCategory {
  name: string;
  questions?: Question[];
  behavioralQuestions?: Question[];
  performanceQuestions?: Question[];
} 