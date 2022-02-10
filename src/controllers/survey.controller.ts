import { Survey } from "../entity/Survey.entity";
import { Controller } from "./controller";

export class SurveyController extends Controller {
  model = Survey;
}


// export const SurveyController = {
//   findByParam: (req: SurveyRequest, _: Response, next: NextFunction, id: any): void => {
//     Survey.findOneOrFail(id)
//     .then((survey: Survey) => {
//       req.surveyFromId = survey;
//       next();
//     })
//     .catch((error: Error) => next(error));
//   },
//   getAll: (_: AuthenticatedRequest, res: Response, next: NextFunction): void => {
//     Survey.find()
//     .then(surveys => res.status(201).json(surveys))
//     .catch(error => next(error));
//   },
//   createOne: (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
//     // todo: validations
//     Survey.insert(req.body)
//     .then(() => res.status(201).json(req.body))
//     .catch((e: Error) => next(e));
//   },
//   getOne: (req: SurveyRequest, res: Response) => {
//     res.status(200).json(req.surveyFromId);
//   },
//   updateOne: (req: SurveyRequest, res: Response, next: NextFunction) => {
//     const surveyToUpdate = req.surveyFromId;
//     const update = req.body;
//     Survey.update(surveyToUpdate.id, update)
//     .then(() => res.status(201).json(update))
//     .catch((e: Error) => next(e));
//   },
//   deleteOne: (req: SurveyRequest, res: Response, next: NextFunction) => {
//     Survey.delete(req.surveyFromId)
//     .then(() => res.status(201).json(req.surveyFromId))
//     .catch((e: Error) => next(e));
//   }
// }
