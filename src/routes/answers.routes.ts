import { Router } from "express";
import { AnswerController } from "../controllers/answer.controller";
import { createBypass } from "../utils";

const bypass = createBypass(AnswerController);

export const answerRouter = Router();

answerRouter.param('id', bypass.findByParam as any);

answerRouter.route('/')
  .get(bypass.getAll)
  .post(bypass.createOne);

  answerRouter.route('/:id')
  .get(bypass.getOne as any)
  .put(bypass.updateOne as any)
  .delete(bypass.deleteOne as any);
