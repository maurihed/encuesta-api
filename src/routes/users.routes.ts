import { Router } from "express";
import { UserController } from "../controllers/users.controller";

export const userRouter = Router();

userRouter.param('id', UserController.findByParam as any);

userRouter.route('/')
  .get(UserController.getAll)
  .post(UserController.createOne);

  userRouter.route('/:id')
  .get(UserController.getOne as any)
  .put(UserController.updateOne as any)
  .delete(UserController.deleteOne as any);
