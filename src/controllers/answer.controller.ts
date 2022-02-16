import { Response, NextFunction } from "express";
import { Controller } from "./controller";
import { GenericRequest, ValidationError } from "../types";
import { Answer } from "../entity/Answer.entity";
import { Question } from "../entity/Question.entity";

export class AnswerController extends Controller {
  model = Answer;
  relations = [{field: "question", table: "questions"}];
  searchAbles = ["description"];

  async validate(answer: Answer): Promise<ValidationError[]> {
    const errors: ValidationError[] = [];
    const {description, question: questionId} = answer;

    if (!description) errors.push({field: "description", message: "La descripción es requerida."});
    const [question] = await Question.findByIds([questionId]);
    if (!question) errors.push({field: "question", message: "Pregunta no encontrada."});

    return Promise.resolve(errors);
  }

  async createOne(req: GenericRequest, res: Response, next: NextFunction) {
    try {
      const errors = await this.validate(req.body);
      if (errors.length) {
        return next(errors);
      }
      const {description, value, question} = req.body;
      const { identifiers: [ { id } ] } = await this.model.insert({
        description,
        value: (value || 1),
        question
      });
      return res.status(201).json(await this.model.findOne(id));
    } catch(e) {
      next(e);
    }
  }

  async updateOne(req: GenericRequest, res: Response, next: NextFunction): Promise<any> {
    try {
      const data = req.body;
      //TODO: clean req.body up to only have answers properties
      const errors = await (await this.validate(req.body))
        .filter((error) => Object.keys(data).includes(error.field));
      if (errors.length) {
        return next(errors);
      }

      const { id } = req.docFromId;
      await Answer.update(id, data);
      const answer = await Answer.findOne(id);
      return res.status(201).json(answer);
    } catch (e) {
      next(e);
    }
  }
}
