import { Router } from "express";
import { orderController } from "../controllers/order";

const orderRouter = Router();

orderRouter.post("/", orderController.insertOrder);
orderRouter.get("/:id", orderController.getOrder);
orderRouter.get("/", orderController.listOrders);

export { orderRouter };
