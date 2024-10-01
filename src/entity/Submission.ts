import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Question } from "./Question";
import { Quiz } from "./Quiz";
import { Answer } from "./Answer";

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
