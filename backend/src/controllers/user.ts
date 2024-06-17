import { Request, Response } from "express";
import { User, usersModel } from "../model/users";

const insertUser = (request: Request, response: Response) => {
  {
    const user = request.body;
    if (!user)
      response.status(400).json({
        message: "invalid user",
      });
    if (!user.cpf)
      response.status(400).json({
        message: "cpf is required",
      });

    if (!user.username)
      response.status(400).json({
        message: "username is required",
      });
  }

  const user = request.body as User;

  return usersModel
    .insertUser(user)
    .then((user) => {
      response.json(user);
    })
    .catch((err) => {
      response.status(500).json({
        message: err.message,
      });
    });
};

const getUser = (request: Request, response: Response) => {
  const id = parseInt(request.params.id) as any;
  {
    if (typeof id !== "number") {
      response.status(400).json({
        message: "invalid id",
      });
    }
  }

  return usersModel
    .getUser(id)
    .then((user) => {
      if (user) return response.json(user);

      return response.sendStatus(404);
    })
    .catch((err) => {
      response.status(500).json({
        message: err.message,
      });
    });
};

const getUserCpf = (request: Request, response: Response) => {
  const id = request.params.cpf;

  return usersModel
    .getUserByCpf(id)
    .then((user) => {
      if (user) return response.json(user);

      return response.sendStatus(404);
    })
    .catch((err) => {
      response.status(500).json({
        message: err.message,
      });
    });
};

export const userController = {
  insertUser,
  getUser,
  getUserCpf,
};
