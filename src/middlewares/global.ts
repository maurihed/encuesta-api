import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

const setGlobalMiddleware = (app: express.Application) => {
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))
  app.use(compression());
  app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));
  app.use(cookieParser());
}

export default setGlobalMiddleware
