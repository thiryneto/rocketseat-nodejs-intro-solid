import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    const user = this.usersRepository.findById(user_id);

    if (!user) {
      throw new Error("Nenhum usuário foi encontrado!");
    }

    if (user.admin === true) {
      throw new Error("Usuário já está marcado como admin!");
    }

    return this.usersRepository.turnAdmin(user);
  }
}

export { TurnUserAdminUseCase };
