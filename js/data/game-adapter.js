import DefaultAdapter from '../model';

const AnswerType = {
  PAINTING: `painting`,
  PHOTO: `photo`
};

const filterBy = (arr, value) => arr.filter((item) => item.type === value);

export default new class extends DefaultAdapter {
  preprocess(data) {
    const preprocessed = [];
    data.forEach((game, index) => {
      const [name, task] = [game.type, game.question];
      const answer = [];
      const question = [];
      game.answers.forEach((val) => {
        question.push(val.image.url);
        if (game.answers.length === 3) {
          return;
        }
        answer.push(val.type === AnswerType.PAINTING ? `paint` : val.type);
      });
      if (game.answers.length === 3) {
        const filtered = (filterBy(game.answers, AnswerType.PAINTING).length === 1)
          ? filterBy(game.answers, AnswerType.PAINTING)
          : filterBy(game.answers, AnswerType.PHOTO);
        answer.push(filtered[0].image.url);
      }
      preprocessed[index] = {name, task, question, answer};
    });
    return preprocessed;
  }
}();
