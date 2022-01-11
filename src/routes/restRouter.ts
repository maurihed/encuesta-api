import express from "express";
import { userRouter } from "./users.routes";
import { roleRouter } from "./roles.routes";
import { loginRouter } from "./login.routes";
import { isAuth } from "../middlewares/isAuth";

export const restRouter = express.Router()

restRouter.use('/', loginRouter);
restRouter.use('/users', isAuth, userRouter);
restRouter.use('/role', isAuth, roleRouter);
