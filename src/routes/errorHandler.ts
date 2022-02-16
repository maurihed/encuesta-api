import { NextFunction, Request, Response } from "express";

export function errorHandler (err: any | string, _: Request, res: Response, __: NextFunction): void {
  if (typeof err === 'string') {
    res.status(500).json({ error: err });
  }
  if (typeof err === 'object') {
    res.status(500).json(err);
  }
  res.status(500).json({ error: err.message || err.toString() })
}