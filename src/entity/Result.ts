import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Quiz } from "./Quiz";

@Entity("results")
export class Result {
  @PrimaryGeneratedColumn()
  resultId: number;

  @ManyToOne(() => User, (user) => user.results)
  user: User;

  @ManyToOne(() => Quiz, (quiz) => quiz.results)
  quiz: Quiz;

  @Column()
  score: number;

  @CreateDateColumn()
  created_at: number;

  @UpdateDateColumn()
  updated_at: number;
}
