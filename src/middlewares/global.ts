import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import requestIp from 'request-ip';

const setGlobalMiddleware = (app: express.Application) => {
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))
  app.use(compression());
  app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));
  app.use(cookieParser());
  app.use(requestIp.mw());
}

export default setGlobalMiddleware
