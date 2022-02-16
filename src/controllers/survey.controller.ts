import { Survey } from "../entity/Survey.entity";
import { Controller } from "./controller";

export class SurveyController extends Controller {
  protected model = Survey;
  protected relations = [ { field: "questions", table: "questions"} ];
  protected searchAbles = [ "name" ];
}
