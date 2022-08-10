import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const user = this.usersRepository.findById(user_id);

    if (!user) {
      throw new Error("Nenhum usuário foi encontrado!");
    }

    if (!user.admin) {
      throw new Error(
        "Somente usuários que são admin podem utilizar deste recurso!"
      );
    }

    return this.usersRepository.list();
  }
}

export { ListAllUsersUseCase };
