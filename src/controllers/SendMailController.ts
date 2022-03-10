import { getCustomRepository } from 'typeorm';
import { Request, Response } from "express";
import path from 'path';
import * as yup from 'yup';

import { UsersRepository } from '../repositories/UsersRepository';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import SendMailService from '../services/SendMailService';
import { AppError } from '../errors/AppError';

class SendMailController {
  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body;

    const schema = yup.object().shape({
      email: yup.string().email().required("Email é obrigatório"),
      survey_id: yup.string().required("Id é obrigatório"),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (err) {
      throw new AppError(err);
    }

    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const user = await usersRepository.findOne({ email });

    if (!user) {
      throw new AppError("Esse usuário não existe.");
    }

    const survey = await surveysRepository.findOne({ id: survey_id });

    if (!survey) {
      throw new AppError("Essa pesquisa não existe.");
    }

    const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
      where: { user_id: user.id, value: null },
      // where: [{ user_id: user.id }, { value: null }], - Fazendo um OR
      relations: ["user", "survey"]
    });

    // Caminho do nosso custom template
    const npsMailPath = path.resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs');

    // Váriaveis para mandar no email
    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      id: "",
      link: process.env.URL_MAIL
    }

    if (surveyUserAlreadyExists) {
      variables.id = surveyUserAlreadyExists.id;

      await SendMailService.execute(email, survey.title, variables, npsMailPath);

      return response.status(200).json({
        message: 'Essa pesquisa apenas não foi respondida. Outro MAIL foi mandado.',
        surveyUserAlreadyExists
      });
    }

    const surveyUser = surveysUsersRepository.create({
      user_id: user.id,
      survey_id
    });

    await surveysUsersRepository.save(surveyUser);

    variables.id = surveyUser.id;

    // Send Mail
    await SendMailService.execute(
      email,
      survey.title,
      variables,
      npsMailPath
    );

    return response.status(200).json({
      message: 'Pesquisa cadastrada e o MAIL foi mandado com sucesso.',
      surveyUser
    });
  }
}

export { SendMailController };