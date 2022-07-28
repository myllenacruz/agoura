import { Router } from "express";
import userRouter from "@domains/users/routes/user.routes";

const routes = Router();

routes.use("/users", userRouter);

export default routes;
