import { APIErrorCodes } from "../models/errors";
import {
  ICategoriesApiResponse,
  ICategory,
  IQuestion,
  IQuestionsApiResponse,
} from "../models/interfaces";
import { transformQuiz } from "./quiz-transformer";

export const fetchCategories = async (): Promise<ReadonlyArray<ICategory>> => {
  const response = await fetch("https://opentdb.com/api_category.php");
  const data: ICategoriesApiResponse = await response.json();
  return data.trivia_categories;
};

export const fetchQuiz = async (
  amount: number,
  categoryId: string,
  difficulty: string,
): Promise<ReadonlyArray<IQuestion>> => {
  const response = await fetch(
    `https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&difficulty=${difficulty}`,
  );
  const data: IQuestionsApiResponse = await response.json();
  if (data.response_code !== 0) {
    throw new Error(APIErrorCodes[data.response_code]);
  }
  return transformQuiz(data);
};
