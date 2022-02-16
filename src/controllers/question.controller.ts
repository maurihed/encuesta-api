import { NextFunction, Response } from "express";
import { GenericRequest, QuestionType, ValidationError } from "../types";
import { Question } from "../entity/Question.entity";
import { Controller } from "./controller";
import { Survey } from "../entity/Survey.entity";

export class QuestionController extends Controller {
  model = Question;
  relations = [{field: "answers", table: "answers"}];
  searchAbles = ["description"];

  async validate(question: Question): Promise<ValidationError[]> {
    const { description, question_type, survey: surveyId } = question;
    const errors = [];
  
    if (!description) errors.push({ field: "description", message: "La descripción no puede estar vacia."});
    if (!Object.values(QuestionType).includes(question_type)) errors.push({
      field: "question_type",
      message: `El tipo de la pregunta es invalido, usa uno de los siguiente: [${Object.values(QuestionType)}].`
    });
    const [survey] = await Survey.findByIds([surveyId]);
    if (!survey) errors.push({ field: "survey", message: "La encuesta seleccionada no existe."});

    return Promise.resolve(errors);
  }

  async createOne(req: GenericRequest, res: Response, next: NextFunction) {
    try {
      const { description, question_type, survey } = req.body;
      let { order } = req.body;

      const errors = await this.validate(req.body);
      if (errors.length) return next(errors);

      if (!order) {
        const { max } = await Question.createQueryBuilder()
          .select('MAX(Question.order)', 'max')
          .where('Question.surveyId = :surveyId', { survey })
          .getRawOne();
        order = max + 1;
      }

      const { identifiers: [ { id } ] } = await Question.insert({ description, question_type, survey, order });
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
