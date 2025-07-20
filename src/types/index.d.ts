interface ErrorDetail {
  message: string;
  path: string;
}

export interface ErrorResponse {
  name: string;
  code: number;
  errors: ErrorDetail[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  session: {
    id: string;
    expiresAt: string;
    token: string;
    createdAt: string;
    updatedAt: string;
    ipAddress: string;
    userAgent: string;
    userId: string;
  };
  user: User;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  id: string;
  text: string;
  // other fields...
}

export interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizSettings {
  timeLimit?: number;
  randomizeQuestions?: boolean;
  // other settings...
}

export interface QuizResults {
  averageScore: number;
  totalAttempts: number;
  // other result fields...
}
