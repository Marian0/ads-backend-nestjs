import { Ad } from "src/ads/entities/ad.entity";
import { Entity, PrimaryGeneratedColumn, Column, BeforeUpdate, OneToMany } from "typeorm";
import { Role } from "./role.enum";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updated_at = new Date();
  }

  @Column({
    type: "enum",
    enum: Role,
    default: Role.USER,
  })
  public role: Role;

  @OneToMany((_type) => Ad, (ad: Ad) => ad.user, { eager: false })
  ads: Ad[];
}
