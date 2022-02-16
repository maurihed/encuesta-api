import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { LinkedSurvey } from "./LinkedSurvey.entity";
import { Question } from "./Question.entity";
import { SurveySurveyed } from "./SurveySurveyed.entity";

@Entity('surveys')
export class Survey extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => LinkedSurvey, linkedSurvey => linkedSurvey.survey)
  linkedSurveys: LinkedSurvey[];

  @OneToMany(() => Question, question => question.survey)
  questions: Question[];

  @OneToMany(() => SurveySurveyed, surveySurveyed => surveySurveyed.survey)
  surveySurveyed: SurveySurveyed[];

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updatedAt: Date;
}
