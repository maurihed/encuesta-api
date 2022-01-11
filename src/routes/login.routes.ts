import {Router} from "express";
import { LoginController } from "../controllers/login.controller";

export const loginRouter = Router();

loginRouter.route('/login')
  .post(LoginController.login);

loginRouter.route('/logged-user')
  .post(LoginController.loggedUser as any);

loginRouter.route('/logout')
  .post(LoginController.logout);
