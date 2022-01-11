import { Request } from "express";
import { Role } from "./entity/Role";
import { User } from "./entity/User";

export enum ResourceType {
  DOCUMENT = 'DOCUMENT',
  VIDEO = 'VIDEO',
  MUSIC = 'MUSIC',
  PDF = 'PDF',
  COMPRESSED = 'COMPRESSED'
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
