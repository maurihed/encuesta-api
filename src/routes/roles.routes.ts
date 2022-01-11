import { Router } from "express";
import { RoleController } from "../controllers/roles.controller";

export const roleRouter = Router();

roleRouter.param('id', RoleController.findByParam as any);

roleRouter.route('/')
  .get(RoleController.getAll)
  .post(RoleController.createOne);

  roleRouter.route('/:id')
  .get(RoleController.getOne as any)
  .put(RoleController.updateOne as any)
  .delete(RoleController.deleteOne as any);
