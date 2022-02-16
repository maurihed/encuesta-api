import { Response, NextFunction } from "express";
import { GenericRequest } from "../types";

export class Controller {
  protected model: any;
  protected searchAbles: string[] = [];
  protected relations: {field: string, table: string}[] = [];

  createOne(req: GenericRequest, res: Response, next: NextFunction) {
    return this.model.insert(req.body)
      .then((doc: any) => res.status(201).json(doc))
      .catch((error: Error) => next(error))
  }

  async updateOne(req: GenericRequest, res: Response, next: NextFunction) {
    const { id } = req.docFromId
    const update = req.body
    await this.model.update(id, update);
    return this.model.findOne(id)
      .then((doc: any) => res.status(201).json(doc))
      .catch((error: Error) => next(error))
  }

  deleteOne(req: GenericRequest, res: Response, next: NextFunction) {
    const {id} = req.docFromId;
    this.model.delete(id)
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
      const { search } = req.query;
      let query = this.model.createQueryBuilder("t");

      this.relations.forEach(({field, table}) => {
        query = query.leftJoinAndSelect(`t.${field}`, table);
      });
      
      this.searchAbles.forEach((field) => {
        query = query.orWhere(`t.${field} LIKE :search`, { search: `%${(search || '')}%` })
      });
      const maxResults = (await query.getMany()).length;
      const results =  await query
        .skip(pageSize * (page-1))
        .take(pageSize)
        .getMany();

      res.json({
        results,
        pageInfo: {
          page: Number(page),
          pageSize: Number(pageSize),
          maxResults,
        }
      });
    } catch(e) {
      next(e);
    }
  }

  findByParam(req: GenericRequest, _res: Response, next: NextFunction, id: number) {
    const relations = this.relations.map((r) => r.field);
    return this.model.findOneOrFail(id, { relations })
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
