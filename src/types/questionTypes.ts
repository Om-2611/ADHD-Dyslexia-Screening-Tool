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
  id?: string; // Add id as it's present in some categories
  name: string;
  description?: string; // Add description as it's present in some categories
  questions?: Question[];
  behavioralQuestions?: Question[];
  performanceQuestions?: Question[];
} 