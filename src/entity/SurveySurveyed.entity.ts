import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Survey } from "./Survey.entity";
import { Surveyed } from "./Surveyed.entity";

@Entity('survey_surveyed')
export class SurveySurveyed extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  password: string;

  surveyed_id: number;

  survey_id: number;

  @ManyToOne(() => Survey, survey => survey.surveySurveyed)
  survey!: Survey;

  @ManyToOne(() => Surveyed, surveyed => surveyed.surveySurveyed)
  surveyed!: Surveyed;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updatedAt: Date;
}
