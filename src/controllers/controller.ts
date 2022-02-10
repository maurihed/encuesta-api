import { Response, NextFunction } from "express";
import { GenericRequest } from "../types";

export class Controller {
  protected model: any;

  createOne(req: GenericRequest, res: Response, next: NextFunction) {
    return this.model.insert(req.body)
      .then((doc: any) => res.status(201).json(doc))
      .catch((error: Error) => next(error))
  }

  updateOne(req: GenericRequest, res: Response, next: NextFunction) {
    const docToUpdate = req.docFromId
    const update = req.body
    return this.model.update(docToUpdate, update)
      .then((doc: any) => res.status(201).json(doc))
      .catch((error: Error) => next(error))
  }

  deleteOne(req: GenericRequest, res: Response, next: NextFunction) {
    const docToDelete = req.docFromId;
    return this.model.delete(docToDelete)
      .then((doc: any) => res.status(201).json(doc))
      .catch((error: Error) => next(error))
  }

  getOne(req: GenericRequest, res: Response, next: NextFunction) {
    return Promise.resolve(req.docFromId)
      .then(doc => res.status(200).json(doc))
      .catch(error => next(error))
  }

  getAll(_req: GenericRequest, res: Response, next: NextFunction) {
    return this.model.find()
      .then((docs: any[]) => res.json(docs))
      .catch((error: Error) => next(error))
  }

  findByParam(req: GenericRequest, _res: Response, next: NextFunction, id: number) {
    return this.model.findOneOrFail(id)
      .then((doc: any) => {
        if (!doc) {
          next(new Error('Not Found Error'))
        } else {
          req.docFromId = doc;
          next()
        }
      })
      .catch((error: Error) => {
        next(error)
      })
  }

}
