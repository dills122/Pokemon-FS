const POSSIBLE_QUESTIONS = [
  "Something is rustling in the bushes, wanna go check it out?",
  "Nice! you found an item, wanna pick it up?",
  "Hmm nothing stuck out as interesting, wanna check again?",
];

export interface QuestionPromptDetails {
  name: string;
  type: string;
  message: string;
  choices: string[];
}

export default class Question {
  private question: string;
  constructor() {
    this.getQuestionTextByRandomIndex();
  }

  private generateRandomIndex() {
    const qLength = POSSIBLE_QUESTIONS.length - 1;
    return Math.floor(Math.random() * (qLength - 0 + 1) + 0);
  }
  private getQuestionTextByRandomIndex() {
    const randomIndex = this.generateRandomIndex();
    this.question = POSSIBLE_QUESTIONS[randomIndex];
    return this.question;
  }
  getQuestionPromptObject(): QuestionPromptDetails {
    return {
      name: "catch",
      type: "list",
      message: this.getQuestion(),
      choices: ["Hell yeah", "Sure", "Nah"],
    };
  }
  getQuestion(): string {
    return this.question;
  }
}
