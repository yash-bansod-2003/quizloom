import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Restaurant } from "./Restaurant";

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

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.users)
  restaurant: Restaurant;
}
