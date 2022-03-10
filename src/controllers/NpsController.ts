import { getCustomRepository, Not, IsNull } from 'typeorm';
import { Request, Response } from "express";
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

class NpsController {
  async execute(request: Request, response: Response) {
    const { survey_id } = request.params;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    try {
      const surveysUsers = await surveysUsersRepository.find({
        survey_id,
        value: Not(IsNull())
      });

      const detractors = surveysUsers.filter((survey) => {
        survey.value >= 0 && survey.value <= 6
      }).length;

      const promoters = surveysUsers.filter((survey) => {
        survey.value >= 9 && survey.value <= 10
      }).length;

      const passives = surveysUsers.filter((survey) => {
        survey.value >= 7 && survey.value <= 8
      }).length;

      const totalAnswers = surveysUsers.length;

      const calculateNps = Number((((promoters - detractors) / totalAnswers) * 100).toFixed(2));

      return response.status(200).json({
        totalAnswers: `Total de Respostas: ${totalAnswers}`,
        detractors: `Quantidade de Detratores: ${detractors}`,
        promoters: `Quantidade de Promotores: ${promoters}`,
        passives: `Quantidade de Passivos: ${passives}`,
        nps: `Seu NPS: ${calculateNps}%`
      });

    } catch (err) {
      return response.status(400).json({
        message: "Não foi possível calcular o NPS. Tente mais tarde."
      });
    }
  }
}

export { NpsController };