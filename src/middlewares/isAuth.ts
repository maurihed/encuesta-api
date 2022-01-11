import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";
import { AuthenticatedRequest } from "../types";

export const isAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // const authorization = req.headers['authorization'];
  const {lbId: token} = req.cookies;
  if (!token) {
    res.status(401).json({message: 'Not Authenticated'});
  }
  try {
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!) as { userId: number };
    req.payload = payload;
  } catch(err) {
    res.status(401).json({message: 'Not Authenticated'});
  }
  return next();
};
