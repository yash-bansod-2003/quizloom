import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Quiz } from "@/models/Quiz.js";
import { Answer } from "@/models/Answer.js";
import { Submission } from "@/models/Submission.js";

@Entity("questions")
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  text: string;

  @Column({ enum: ["mcq", "true_false", "written"], type: "text" })
  type: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  quiz: Quiz;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];

  @OneToMany(() => Submission, (submission) => submission.question)
  submissions: Submission[];
}
