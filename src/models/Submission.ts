import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "@/models/User.js";
import { Question } from "@/models/Question.js";
import { Quiz } from "@/models/Quiz.js";
import { Answer } from "@/models/Answer.js";

@Entity("submissions")
export class Submission {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: number;

  @UpdateDateColumn()
  updated_at: number;

  @ManyToOne(() => User, (user) => user.submissions)
  user: User;

  @ManyToOne(() => Quiz, (quiz) => quiz.submissions)
  quiz: Quiz;

  @ManyToOne(() => Question, (question) => question.submissions)
  question: Question;

  @ManyToOne(() => Answer, (answer) => answer.submissions)
  answer: Answer;
}
