import { Router } from "express";
import { SurveyController } from "../controllers/survey.controller";

export const surveyRouter = Router();

const surveyController = new SurveyController();

surveyRouter.param('id', surveyController.findByParam);

const bypass = {
  getAll: (...args: [any, any, any]) => {
    surveyController.getAll(...args);
  },
  createOne: (...args: [any, any, any]) => {
    surveyController.createOne(...args);
  },
  getOne: (...args: [any, any, any]) => {
    surveyController.getOne(...args);
  },
  updateOne: (...args: [any, any, any]) => {
    surveyController.updateOne(...args);
  },
  deleteOne: (...args: [any, any, any]) => {
    surveyController.deleteOne(...args);
  },
};

surveyRouter.route('/')
  .get(bypass.getAll)
  .post(bypass.createOne);

  surveyRouter.route('/:id')
  .get(bypass.getOne)
  .put(bypass.updateOne)
  .delete(bypass.deleteOne);
