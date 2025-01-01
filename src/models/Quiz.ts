import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { User } from "@/models/User.js";
import { Question } from "@/models/Question.js";
import { Submission } from "@/models/Submission.js";
import { Result } from "@/models/Result.js";

@Entity("quizzes")
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text" })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.quizzes)
  user: User;

  @OneToMany(() => Question, (question) => question.quiz)
  questions: Question[];

  @OneToMany(() => Submission, (submission) => submission.quiz)
  submissions: Submission[];

  @OneToMany(() => Result, (result) => result.user)
  results: Result[];
}
