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
    const {id} = req.docFromId;
    return this.model.delete(id)
      .then(() => res.status(201).json(req.docFromId))
      .catch((error: Error) => next(error))
  }

  getOne(req: GenericRequest, res: Response, next: NextFunction) {
    return Promise.resolve(req.docFromId)
      .then(doc => res.status(200).json(doc))
      .catch(error => next(error))
  }

  async getAll(req: GenericRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const defaults = { page: 1, pageSize: 200 };
      const { page, pageSize } = {...defaults, ...req.query};
      const maxResults = (await this.model.find()).length;
      const questions =  await this.model.createQueryBuilder()
        .skip(pageSize * (page-1))
        .take(pageSize)
        .getMany();

      res.json({
        questions,
        pageInfo: {
          page,
          pageSize,
          maxResults,
        }
      });
    } catch(e) {
      next(e);
    }
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
