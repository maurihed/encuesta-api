import { QuestionType } from "../types";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Answer } from "./Answer.entity";
import { LinkedSurvey } from "./LinkedSurvey.entity";
import { Survey } from "./Survey.entity";
import { SurveySurveyed } from "./SurveySurveyed.entity";
import { SurveyResponse } from "./SurverResponse.entity";

@Entity('questions')
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 2000 })
  description: string;

  @Column({ type: "varchar" })
  question_type: QuestionType;

  @ManyToOne(() => Survey, survey => survey.surveySurveyed)
  survey!: Survey;
  
  @OneToMany(() => LinkedSurvey, linkedSurvey => linkedSurvey.survey)
  linkedSurveys: LinkedSurvey[];
  
  @OneToMany(() => SurveySurveyed, surveySurveyed => surveySurveyed.survey)
  surveySurveyed: SurveySurveyed[];
  
  @OneToMany(() => Answer, answer => answer.question)
  answers: Answer[];

  @OneToMany(() => SurveyResponse, surveyResponse => surveyResponse.question)
  surveyResponses: SurveyResponse[];

  @Column()
  order: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updatedAt: Date;
}
