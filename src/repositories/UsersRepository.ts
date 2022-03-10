import { EntityRepository, Repository } from "typeorm";
import { User } from "../models/User";

// permite que temos todos os métodos do typeORM dentro dessa classe que criamos

// fala que essa classe vai ser um repositório da tabela user
@EntityRepository(User)
class UsersRepository extends Repository<User> {}

export { UsersRepository };