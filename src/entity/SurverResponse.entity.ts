import {Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { Answer } from "./Answer.entity";
import { Question } from "./Question.entity";
import { Surveyed } from "./Surveyed.entity";

@Entity('survey_responses')
export class SurveyResponse extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Question, question => question.surveyResponses)
    question: Question;
  
    @ManyToOne(() => Surveyed, surveyed => surveyed.surveyResponses)
    surveyed: Surveyed[];

    @ManyToOne(() => Answer, answer => answer.surveyResponses)
    answer: Surveyed[];

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;
  
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;
}
