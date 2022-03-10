import { Survey } from "../../models/Survey";

const surveysView = {
  render(survey: Survey) {
    return {
      id: survey.id,
      title: survey.title,
      description: survey.description,
      data_created: survey.created_at
    };
  },

  renderMany(surveys: Survey[]) {
    return surveys.map(survey => this.render(survey));
  }
}

export { surveysView };