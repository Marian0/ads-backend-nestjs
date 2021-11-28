import { Entity, PrimaryGeneratedColumn, Column, BeforeUpdate } from "typeorm";
import { AdStatus } from "./ad-status.enum";

@Entity("ads")
export class Ad {
  @PrimaryGeneratedColumn("uuid")
  id: number;

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
}
