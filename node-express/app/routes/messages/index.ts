import { Router } from "express";
import { MessagesController } from "../../controllers/messages/messages.controller";

class Messages {
  router = Router();
  controller = new MessagesController();
  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.get("/", this.controller.getAll);
    this.router.post("/", this.controller.postMessage);
  }
}

export const messagesRouter = new Messages().router;
