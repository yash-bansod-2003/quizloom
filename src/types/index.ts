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

export type QuizStatus = "DRAFT" | "LIVE" | "PAUSED" | "SCHEDULED" | "CLOSED";

export interface Quiz {
  id: string;
  title: string;
  image?: string;
  bannerImage?: string;
  status: QuizStatus;
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
