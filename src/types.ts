import { Request } from "express";
import { Role } from "./entity/Role.entity";
import { Survey } from "./entity/Survey.entity";
import { User } from "./entity/User.entity";

export enum ResourceType {
  DOCUMENT = 'DOCUMENT',
  VIDEO = 'VIDEO',
  MUSIC = 'MUSIC',
  PDF = 'PDF',
  COMPRESSED = 'COMPRESSED'
};

export enum DeviceType {
  MOBILE = 'MOBILE',
  TABLET = 'TABLET',
  LAPTOP = 'LAPTOP',
  DESKTOP = 'DESKTOP',
};

export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  MULTIPLE_ANSWER = 'MULTIPLE_ANSWER',
  FILL_THE_BLANK = 'FILL_THE_BLANK',
  OPEN = 'OPEN',
};

export interface AuthenticatedRequest extends Request {
  payload?: { userId: number };
};

export interface UserRequest extends AuthenticatedRequest {
  userFromId: User;
};

export interface RoleRequest extends AuthenticatedRequest {
  roleFromId: Role;
};

export interface SurveyRequest extends AuthenticatedRequest {
  surveyFromId: Survey;
};

export interface GenericRequest extends AuthenticatedRequest {
  [key: string]: any;
};
