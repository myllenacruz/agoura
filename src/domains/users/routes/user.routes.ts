import { Router } from "express";
import { UserController } from "@domains/users/controllers/UserController";
import { ensureAuthentication } from "@shared/main/middlewares/ensureAuthentication";

const routes = Router();
const userController = new UserController();

routes.get("/show/:id", ensureAuthentication, userController.show);

export default routes;
