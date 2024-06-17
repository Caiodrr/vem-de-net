import { Request, Response } from "express";
import { Order, orderModel } from "../model/order";

const insertOrder = (request: Request, response: Response) => {
  {
    const order = request.body;
    if (!order)
      response.status(400).json({
        message: "invalid order",
      });

    if (!order.user_id)
      response.status(400).json({
        message: "user_id is required",
      });

    if (!order.date)
      response.status(400).json({
        message: "date is required",
      });

    if (!order.shift)
      response.status(400).json({
        message: "shift is required",
      });

    if (!order.type)
      response.status(400).json({
        message: "type is required",
      });
  }

  const order = request.body as Order;

  return orderModel
    .insertOrder(order)
    .then((order) => {
      response.json(order);
    })
    .catch((err) => {
      response.status(500).json({
        message: err.message,
      });
    });
};

const listOrders = ({}: Request, response: Response) => {
  return orderModel
    .listActiveOrders()
    .then((orders) => {
      response.json(orders);
    })
    .catch((err) => {
      response.status(500).json({
        message: err.message,
      });
    });
};

const getOrder = (request: Request, response: Response) => {
  const id = parseInt(request.params.id) as any;
  {
    if (typeof id !== "number") {
      response.status(400).json({
        message: "invalid id",
      });
    }
  }

  return orderModel
    .getOrder(id)
    .then((order) => {
      if (order) return response.json(order);

      return response.sendStatus(404);
    })
    .catch((err) => {
      response.status(500).json({
        message: err.message,
      });
    });
};

export const orderController = {
  insertOrder,
  getOrder,
  listOrders,
};
