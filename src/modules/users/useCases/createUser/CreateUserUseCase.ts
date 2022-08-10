import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    if (!email || !name) {
      throw new Error("Verificar os dados postados!");
    }

    const userAlreadyExists = this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error("Informe outro e-mail, este já está sendo utilizado!");
    }

    return this.usersRepository.create({ name, email });
  }
}

export { CreateUserUseCase };
