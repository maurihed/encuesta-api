import { NextFunction, Request, Response } from "express";

export function errorHandler (err: any | string, _: Request, res: Response, __: NextFunction) {
  if (typeof err === 'string') {
    res.status(500).json({ error: err });
  }
  res.status(500).json({ error: err.message || err.toString() })
}