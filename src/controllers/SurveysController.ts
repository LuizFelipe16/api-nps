import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { surveysView } from '../views/tables/surveys_view';

class SurveysController {
  async create(request: Request, response: Response) {
    const {
      title,
      description
    } = request.body;

    const schema = yup.object().shape({
      title: yup.string().required("Título é obrigatório"),
      description: yup.string().required("Descrição é obrigatória"),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (err) {
      throw new AppError(err);
    }

    const surveysRepository = getCustomRepository(SurveysRepository);

    try {
      const survey = surveysRepository.create({
        title,
        description
      });

      await surveysRepository.save(survey);

      return response.status(201).json({
        message: "Pesquisa criada com sucesso.",
        survey: survey
      });

    } catch (err) {
      return response.status(400).json({
        error: "Infelizmente não foi possível criar à pesquisa. Tente mais Tarde."
      });
    }
  };

  async show(request: Request, response: Response) {
    const surveysRepository = getCustomRepository(SurveysRepository);

    try {
      const allSurveys = await surveysRepository.find();

      return response.status(200).json(surveysView.renderMany(allSurveys));

    } catch (err) {
      return response.status(400).json({
        error: "Infelizmente não foi possível obter às pesquisas. Tente mais Tarde."
      });
    }
  };
}

export { SurveysController };