import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Quiz } from "@/models/Quiz.js";
import { Submission } from "@/models/Submission.js";
import { Result } from "@/models/Result.js";
import { RefreshToken } from "@/models/RefreshToken.js";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  firstName: string;

  @Column({ type: "text" })
  lastName: string;

  @Column({ unique: true, type: "text" })
  email: string;

  @Column({ type: "text" })
  password: string;

  @Column({ type: "text", enum: ["user", "manager", "admin"], default: "user" })
  role: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Quiz, (quiz) => quiz.user)
  quizzes: Quiz[];

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];

  @OneToMany(() => Submission, (submission) => submission.user)
  submissions: Submission[];

  @OneToMany(() => Result, (result) => result.user)
  results: Result[];
}
