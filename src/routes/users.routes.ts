import { Router } from "express";
// import { createBypass } from "../utils";
import { UserController } from "../controllers/users.controller";

export const userRouter = Router();
const userController = new UserController();

const bypass = {
  getAll: (...args: [any, any, any]) => {
    userController.getAll(...args);
  },
  createOne: (...args: [any, any, any]) => {
    userController.createOne(...args);
  },
  getOne: (...args: [any, any, any]) => {
    userController.getOne(...args);
  },
  updateOne: (...args: [any, any, any]) => {
    userController.updateOne(...args);
  },
  deleteOne: (...args: [any, any, any]) => {
    userController.deleteOne(...args);
  },
  findByParam: (...args: [any, any, any, any]) => {
    userController.findByParam(...args);
  },
};

// const bypass = createBypass(UserController);

userRouter.param('id', bypass.findByParam as any);

userRouter.route('/')
  .get(bypass.getAll)
  .post(bypass.createOne);

  userRouter.route('/:id')
  .get(bypass.getOne as any)
  .put(bypass.updateOne as any)
  .delete(bypass.deleteOne as any);
