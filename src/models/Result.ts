import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "@/models/User.js";
import { Quiz } from "@/models/Quiz.js";

@Entity("results")
export class Result {
  @PrimaryGeneratedColumn()
  resultId: number;

  @Column({ type: "int" })
  score: number;

  @Column({ type: "int", default: 1 })
  attempt: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.results)
  user: User;

  @ManyToOne(() => Quiz, (quiz) => quiz.results)
  quiz: Quiz;
}
