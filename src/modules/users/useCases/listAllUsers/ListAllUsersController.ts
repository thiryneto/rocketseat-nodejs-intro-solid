import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      const user_id = request.header("user_id");

      if (!user_id) {
        throw new Error("O id do usuário admin não foi informado!");
      }

      const users = this.listAllUsersUseCase.execute({ user_id });

      return response.status(200).json(users).send();
    } catch (error) {
      return response.status(400).json({ error: error.message }).send();
    }
  }
}

export { ListAllUsersController };
