import { Response, NextFunction } from "express";
import { GenericRequest } from "../types";
import { User } from "../entity/User.entity";
import { hash } from "bcryptjs";
import { Controller } from "./controller";

export class UserController extends Controller {
  model = User;
  relations = [{field: "role", table: "roles"}];
  searchAbles = ["email", "firstName", "lastName"];

  async createOne(req: GenericRequest, res: Response, next: NextFunction) {
    const hashedPassword = await hash(req.body.password, 12);
    const user = {...req.body, password: hashedPassword};
    User.insert(user)
      .then(() => res.status(201).json(req.body))
      .catch((e: Error) => next(e));
  }
}
