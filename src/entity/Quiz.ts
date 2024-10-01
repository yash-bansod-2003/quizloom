import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Question } from "./Question";
import { Submission } from "./Submission";
import { Result } from "./Result";

@Entity("quizzes")
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: number;

  @UpdateDateColumn()
  updated_at: number;

  @ManyToOne(() => User, (user) => user.quizzes)
  user: User;

  @OneToMany(() => Question, (question) => question.quiz)
  questions: Question[];

  @OneToMany(() => Submission, (submission) => submission.quiz)
  submissions: Submission[];

  @OneToMany(() => Result, (result) => result.user)
  results: Result[];
}
