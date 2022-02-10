import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Survey } from "./Survey.entity";
import { Surveyed } from "./Surveyed.entity";

@Entity('linked_survey')
export class LinkedSurvey extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Survey, survey => survey.linkedSurveys, {cascade: true, onDelete: 'SET NULL'})
  survey: Survey;

  @ManyToOne(() => Surveyed, surveyed => surveyed.linkedSurveys, {cascade: true, onDelete: 'SET NULL'})
  surveyed: Surveyed;

  @Column()
  password: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updatedAt: Date;
}
