import { expect } from "chai";
import { describe } from "mocha";
import Question from "../src/question-builder";

describe("Question Builder::", () => {
  it("Should generate a random question", () => {
    for (let i = 0; i < 20; i++) {
      const questionObj = new Question();
      const questionPromptObj = questionObj.getQuestionPromptObject();
      const question = questionObj.getQuestion();
      expect(questionPromptObj.message).to.equal(question);
    }
  });
});
