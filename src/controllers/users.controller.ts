import { Response, NextFunction } from "express";
import { AuthenticatedRequest, UserRequest } from "../types";
import { User } from "../entity/User.entity";
import { hash } from "bcryptjs";

export const UserController = {
  findByParam: (req: UserRequest, _: Response, next: NextFunction, id: any): void => {
    User.findOneOrFail(id)
    .then((user: User) => {
      req.userFromId = user;
      next();
    })
    .catch((error: Error) => next(error));
  },
  getAll: (_: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    User.find({ select: ["id", "email", "firstName", "lastName", "role"], relations: ["role"] })
    .then(users => res.status(201).json(users))
    .catch(error => next(error));
  },
  createOne: async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    // todo: validations
    const hashedPassword = await hash(req.body.password, 12);
    const user = {...req.body, password: hashedPassword}
    User.insert(user)
    .then(() => res.status(201).json(req.body))
    .catch((e: Error) => next(e));
  },
  getOne: (req: UserRequest, res: Response) => {
    res.status(200).json(req.userFromId);
  },
  updateOne: (req: UserRequest, res: Response, next: NextFunction) => {
    const userToUpdate = req.userFromId;
    const update = req.body;
    User.update(userToUpdate.id, update)
    .then(() => res.status(201).json(update))
    .catch((e: Error) => next(e));
  },
  deleteOne: (req: UserRequest, res: Response, next: NextFunction) => {
    User.delete(req.userFromId)
    .then(() => res.status(201).json(req.userFromId))
    .catch((e: Error) => next(e));
  }
}
