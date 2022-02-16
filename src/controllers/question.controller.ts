import { NextFunction, Response } from "express";
import { GenericRequest, QuestionType } from "../types";
import { Question } from "../entity/Question.entity";
import { Controller } from "./controller";
import { Survey } from "../entity/Survey.entity";

export class QuestionController extends Controller {
  model = Question;

  async validate(question: any): Promise<any[]> {
    const { description, question_type, surveyId } = question;
    const errors = [];
    if (!description) errors.push({ field: "description", message: "La descripción no puede estar vacia."});
    if (!Object.values(QuestionType).includes(question_type)) errors.push({
      field: "question_type",
      message: `El tipo de la pregunta es invalido, usa uno de los siguiente: [${Object.values(QuestionType)}].`
    });
    let survey = null;
    if (surveyId) {
      survey = await Survey.findOne(surveyId);
    }
    if (!survey) errors.push({ field: "surveyId", message: "La encuesta seleccionada no existe."});
    return Promise.resolve(errors);
  }

  async createOne(req: GenericRequest, res: Response, next: NextFunction) {
    try {
      const { description, question_type, surveyId } = req.body;
      let { order } = req.body;

      const errors = await this.validate(req.body);
      if (errors.length) return next(errors);

      if (!order) {
        const { max } = await Question.createQueryBuilder()
          .select('MAX(Question.order)', 'max')
          .where('Question.surveyId = :surveyId', { surveyId })
          .getRawOne();
        order = max + 1;
      }

      const { identifiers: [ { id } ] } = await Question.insert({ description, question_type, survey: surveyId, order });
      const question = await Question.findOne(id);
      return res.status(201).json(question);
    } catch (e) {
      next(e);
    }
  }

  async updateOne(req: GenericRequest, res: Response, next: NextFunction) {
    try {
      const cols = Object.keys(req.body);
      const errors = (await this.validate(req.body))
        .filter((error) => cols.includes(error.field));
      if (errors.length) return next(errors);

      const { id } = req.docFromId;
      await Question.update(id, req.body);
      const question = await Question.findOne(id);
      return res.status(201).json(question);
    } catch (e) {
      next(e)
    }
  }
}
