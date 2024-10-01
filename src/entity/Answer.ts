import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Question } from "./Question";
import { Submission } from "./Submission";

@Entity("answers")
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column({ default: false })
  is_correct: boolean;

  @CreateDateColumn()
  created_at: number;

  @UpdateDateColumn()
  updated_at: number;

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question;

  @OneToMany(() => Submission, (submission) => submission.answer)
  submissions: Submission[];
}
