import { Application } from "express";
import Router from "express";
import { orderRouter } from "./order";
import { userRouter } from "./user";

export const useRoutes = (app: Application) => {
  const apiRouter = Router();

  apiRouter.use("/order", orderRouter);
  apiRouter.use("/user", userRouter);

  app.use("/api/v1", apiRouter);
};
