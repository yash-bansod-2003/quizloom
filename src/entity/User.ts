import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Quiz } from "./Quiz";
import { Submission } from "./Submission";
import { Result } from "./Result";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ enum: ["user", "manager", "admin"], default: "user" })
  role: string;

  @CreateDateColumn()
  created_at: number;

  @UpdateDateColumn()
  updated_at: number;

  @OneToMany(() => Quiz, (quiz) => quiz.user)
  quizzes: Quiz[];

  @OneToMany(() => Submission, (submission) => submission.user)
  submissions: Submission[];

  @OneToMany(() => Result, (result) => result.user)
  results: Result[];
}
