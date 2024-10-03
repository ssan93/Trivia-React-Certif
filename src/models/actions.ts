import { IQuestion } from "./interfaces";

export enum ActionTypes {
  SET_QUIZ = "SET_QUIZ",
  SET_ANSWER = "SET_ANSWER",
  RESET_QUIZ = "RESET_QUIZ",
}

type SetQuizAction = {
  type: ActionTypes.SET_QUIZ;
  payload: ReadonlyArray<IQuestion>;
};

type SetAnswerAction = {
  type: ActionTypes.SET_ANSWER;
  payload: { answer: string; questionId: string };
};

type ResetQuizAction = {
  type: ActionTypes.RESET_QUIZ;
};

export type QuizActions = SetQuizAction | SetAnswerAction | ResetQuizAction;
