import { Router } from "express";
import { SurveyedController } from "../controllers/surveyed.controller";
import { createBypass } from "../utils";

const bypass = createBypass(SurveyedController);

export const surveyedRouter = Router();

surveyedRouter.param('id', bypass.findByParam as any);

surveyedRouter.route('/')
  .get(bypass.getAll)
  .post(bypass.createOne);

  surveyedRouter.route('/:id')
  .get(bypass.getOne as any)
  .put(bypass.updateOne as any)
  .delete(bypass.deleteOne as any);
