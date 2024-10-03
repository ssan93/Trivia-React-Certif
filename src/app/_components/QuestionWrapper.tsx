import { useCallback } from "react";
import { IQuestion } from "../../models/interfaces/quiz.interface";
import { Question } from "./Question";
import { ActionTypes } from "../../models/actions";
import { useQuizDispatch } from "../../hooks/QuizContext";

interface QuestionWrapperProps {
  question: IQuestion;
  showResults: boolean;
}
export const QuestionWrapper = ({
  question,
  showResults,
}: QuestionWrapperProps) => {
  const dispatch = useQuizDispatch();

  const onAnswer = useCallback(
    (answer: string) => {
      dispatch({
        type: ActionTypes.SET_ANSWER,
        payload: { answer, questionId: question.id },
      });
    },
    [dispatch, question.id],
  );

  return (
    <Question
      question={question}
      onAnswer={onAnswer}
      showResults={showResults}
    />
  );
};
