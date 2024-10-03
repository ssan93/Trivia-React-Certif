import { v4 as uuidv4 } from "uuid";
import { randomizeArray } from "../lib/utils";
import { IQuestion, IQuestionsApiResponse } from "../models/interfaces";
import { decode } from "html-entities";

export const transformQuiz = (
  quiz: IQuestionsApiResponse,
): ReadonlyArray<IQuestion> => {
  return quiz.results.map((q) => {
    const [decodedQuestion, decodedCorrectAnswer, ...decodedIncorrectAnswers] =
      [q.question, q.correct_answer, ...q.incorrect_answers].map((str) =>
        decode(str),
      );

    const answers = [decodedCorrectAnswer, ...decodedIncorrectAnswers];

    return {
      ...q,
      id: uuidv4(),
      question: decodedQuestion,
      correct_answer: decodedCorrectAnswer,
      randomizeAnswers:
        q.type === "boolean" ? answers : randomizeArray(answers),
    };
  });
};
