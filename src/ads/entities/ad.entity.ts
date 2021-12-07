import { User } from "src/auth/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, BeforeUpdate, ManyToOne } from "typeorm";
import { AdStatus } from "./ad-status.enum";

@Entity("ads")
export class Ad {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  slug: string;

  @Column()
  title: string;

  @Column({ default: "" })
  description: string;

  @Column({
    type: "enum",
    enum: AdStatus,
    default: AdStatus.PENDING,
  })
  status: AdStatus;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updated_at = new Date();
  }

  @ManyToOne((_type) => User, (user: User) => user.ads, { eager: false })
  user: User;
}
