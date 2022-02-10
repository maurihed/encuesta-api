import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Question } from "./Question.entity";
import { SurveyResponse } from "./SurverResponse.entity";

@Entity('answers')
export class Answer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;
  
  @Column()
  value: string;

  @ManyToOne(() => Question, question => question.answers)
  question: Question;

  @OneToMany(() => SurveyResponse, surveyResponse => surveyResponse.answer)
  surveyResponses: SurveyResponse[];

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updatedAt: Date;
}
