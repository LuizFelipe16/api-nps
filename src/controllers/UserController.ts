import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';
import { UsersRepository } from '../repositories/UsersRepository';

class UsersController {
  async create(request: Request, response: Response) {
    const {
      name,
      email
    } = request.body;

    const schema = yup.object().shape({
      name: yup.string().required("Nome é obrigatório"),
      email: yup.string().email().required("Email é obrigatório"),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (err) {
      throw new AppError(err);
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const userAlreadyExists = await usersRepository.findOne({ email });

    if (userAlreadyExists) {
      throw new AppError("Esse email já está cadastrado.");
    }

    const user = usersRepository.create({
      name,
      email
    });

    await usersRepository.save(user);

    return response.status(201).json({
      message: "Usuário criado com sucesso.",
      user
    });
  }
}

export { UsersController };