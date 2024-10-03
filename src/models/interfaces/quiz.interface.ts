export interface IQuestion {
  id: string;
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: ReadonlyArray<string>;
  randomizeAnswers?: ReadonlyArray<string>;
  answer?: string;
}

export interface IQuestionsApiResponse {
  response_code: number;
  results: ReadonlyArray<Omit<IQuestion, "id">>;
}
