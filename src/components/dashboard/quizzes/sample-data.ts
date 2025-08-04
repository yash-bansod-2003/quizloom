import type { Quiz } from "@/types";
import { QuizStatus } from "@/lib/constants";

// Sample quiz data for testing the table
export const sampleQuizzes: Quiz[] = [
  {
    id: "quiz_1",
    title: "JavaScript Fundamentals",
    description:
      "A comprehensive quiz covering JavaScript basics and advanced concepts.",
    status: QuizStatus.LIVE,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T14:45:00Z",
  },
  {
    id: "quiz_2",
    title: "React Components & Hooks",
    description:
      "Test your knowledge of React components, state management, and hooks.",
    status: QuizStatus.DRAFT,
    createdAt: "2024-01-18T09:15:00Z",
    updatedAt: "2024-01-18T16:20:00Z",
  },
  {
    id: "quiz_3",
    title: "CSS Grid & Flexbox",
    description: "Master modern CSS layout techniques with Grid and Flexbox.",
    status: QuizStatus.PAUSED,
    createdAt: "2024-01-10T11:00:00Z",
    updatedAt: "2024-01-25T13:30:00Z",
  },
  {
    id: "quiz_4",
    title: "Database Design Principles",
    description:
      "Learn about relational databases, normalization, and query optimization.",
    status: QuizStatus.SCHEDULED,
    createdAt: "2024-01-22T08:45:00Z",
    updatedAt: "2024-01-22T08:45:00Z",
  },
  {
    id: "quiz_5",
    title: "Node.js & Express",
    description:
      "Backend development with Node.js, Express framework, and middleware.",
    status: QuizStatus.CLOSED,
    createdAt: "2024-01-05T14:20:00Z",
    updatedAt: "2024-01-30T17:10:00Z",
  },
];
