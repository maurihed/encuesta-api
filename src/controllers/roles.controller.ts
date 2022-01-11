import { Response, NextFunction } from "express";
import { AuthenticatedRequest, RoleRequest } from "../types";
import { Role } from "../entity/Role";

export const RoleController = {
  findByParam: (req: RoleRequest, _: Response, next: NextFunction, id: any): void => {
    Role.findOneOrFail(id)
    .then((role: Role) => {
      req.roleFromId = role;
      next();
    })
    .catch((error: Error) => next(error));
  },
  getAll: (_: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    Role.find()
    .then(roles => res.status(201).json(roles))
    .catch(error => next(error));
  },
  createOne: (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    // todo: validations
    Role.insert(req.body)
    .then(() => res.status(201).json(req.body))
    .catch((e: Error) => next(e));
  },
  getOne: (req: RoleRequest, res: Response) => {
    res.status(200).json(req.roleFromId);
  },
  updateOne: (req: RoleRequest, res: Response, next: NextFunction) => {
    const roleToUpdate = req.roleFromId;
    const update = req.body;
    Role.update(roleToUpdate.id, update)
    .then(() => res.status(201).json(update))
    .catch((e: Error) => next(e));
  },
  deleteOne: (req: RoleRequest, res: Response, next: NextFunction) => {
    Role.delete(req.roleFromId)
    .then(() => res.status(201).json(req.roleFromId))
    .catch((e: Error) => next(e));
  }
}
