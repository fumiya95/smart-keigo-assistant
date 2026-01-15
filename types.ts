export type QuestionCategory = 'internal' | 'three-party' | 'client' | 'terms' | 'verbs';

export interface Question {
  id: number;
  category: QuestionCategory;
  questionText: string;
  context?: string; // Optional context description
  options: string[];
  correctAnswer: string;
  reason: string; // The explanation from the database
  visualCue: {
    direction: 'up' | 'down' | 'flat';
    target: string; // Who is being raised/lowered
  };
}

export type AppMode = 'menu' | 'learn' | 'drill' | 'test' | 'result';

export interface TestResult {
  score: number;
  total: number;
  passed: boolean;
  history: {
    question: Question;
    isCorrect: boolean;
    userAnswer: string;
  }[];
}