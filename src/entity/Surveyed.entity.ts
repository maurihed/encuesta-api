import { DeviceType } from "../types";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { LinkedSurvey } from "./LinkedSurvey.entity";
import { SurveySurveyed } from "./SurveySurveyed.entity";
import { SurveyResponse } from "./SurverResponse.entity";

@Entity('surveyed')
export class Surveyed extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  ip: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column()
  ip_hostname: string;

  @Column()
  ip_city: string;

  @Column()
  ip_region: string;

  @Column()
  ip_country: string;

  @Column()
  ip_zip: string;

  @Column()
  ip_org: string;

  @Column()
  zip: string;

  birthday: Date;

  @Column()
  agent: string;

  @Column()
  lat: string;

  @Column()
  lng: string;

  @Column()
  device: string;

  @Column({ type: "varchar", length: 255 })
  device_type: DeviceType;

  @OneToMany(() => SurveySurveyed, surveySurveyed => surveySurveyed.surveyed)
  surveySurveyed: SurveySurveyed[];

  @OneToMany(() => LinkedSurvey, linkedSurvey => linkedSurvey.surveyed)
  linkedSurveys: LinkedSurvey[];

  @OneToMany(() => SurveyResponse, surveyResponse => surveyResponse.question)
  surveyResponses: SurveyResponse[];

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updatedAt: Date;
}
