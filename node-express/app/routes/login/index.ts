import { Router } from "express";
import { AuthController } from "../../controllers/login/login.controller";

class AuthRouter {
  router = Router();
  controller = new AuthController();

  constructor() {
    this.initRouter();
  }

  initRouter() {
    this.router.post("/login", this.controller.login);
  }
}

export const authRouter = new AuthRouter().router;
