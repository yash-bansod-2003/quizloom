import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Quiz } from "./Quiz";

@Entity("questions")
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column({ enum: ["mcq", "true_false", "written"] })
  type: string;

  @CreateDateColumn()
  created_at: number;

  @UpdateDateColumn()
  updated_at: number;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  quiz: Quiz;
}
