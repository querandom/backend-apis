import express, { Application, Request, Response } from "express";
import { authRouter } from "./login";
import { checkLoginMiddleware } from "../middlewares/check-login";
import { messagesRouter } from "./messages";

export default class Routes {
  constructor(app: Application) {
    const apiRouter = express.Router();
    apiRouter.use("/", authRouter);
    apiRouter.use("/messages", checkLoginMiddleware, messagesRouter);

    app.use("/api", apiRouter);
  }
}
