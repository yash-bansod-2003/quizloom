import "reflect-metadata";
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Question } from "@/models/Question.js";
import { Submission } from "@/models/Submission.js";

@Entity("answers")
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  text: string;

  @Column({ default: false, type: "boolean" })
  is_correct: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question;

  @OneToMany(() => Submission, (submission) => submission.answer)
  submissions: Submission[];
}
