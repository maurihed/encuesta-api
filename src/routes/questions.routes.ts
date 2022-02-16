import { Router } from "express";
import { QuestionController } from "../controllers/question.controller";

export const questionRouter = Router();

const questionController = new QuestionController();

const bypass = {
  getAll: (...args: [any, any, any]) => {
    questionController.getAll(...args);
  },
  createOne: (...args: [any, any, any]) => {
    questionController.createOne(...args);
  },
  getOne: (...args: [any, any, any]) => {
    questionController.getOne(...args);
  },
  updateOne: (...args: [any, any, any]) => {
    questionController.updateOne(...args);
  },
  deleteOne: (...args: [any, any, any]) => {
    questionController.deleteOne(...args);
  },
  findByParam: (...args: [any, any, any, any]) => {
    questionController.findByParam(...args);
  },
};

questionRouter.route('/')
  .get(bypass.getAll)
  .post(bypass.createOne);

  
questionRouter.param('id', bypass.findByParam);
questionRouter.route('/:id')
  .get(bypass.getOne)
  .put(bypass.updateOne)
  .delete(bypass.deleteOne);
