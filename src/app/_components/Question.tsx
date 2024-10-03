import { memo } from "react";
import { cn } from "../../lib/utils";
import { IQuestion } from "../../models/interfaces/quiz.interface";

interface IQuestionProps {
  question: IQuestion;
  onAnswer: (answer: string) => void;
  showResults?: boolean;
}

export const Question = memo(
  ({ question, onAnswer, showResults }: IQuestionProps) => {
    const {
      randomizeAnswers: answers,
      answer: selectedAnswer,
      correct_answer,
    } = question;

    const handleClick = (answer: string) => onAnswer(answer);

    return (
      <div className="space-y-2">
        <h3>{question.question}</h3>
        <ul className="flex gap-4">
          {answers?.map((answer, index) => {
            const isCorrectAnswer = answer === correct_answer;
            const isSelectedAnswer = answer === selectedAnswer;

            const answerClasses = cn({
              "hover:bg-green-500 hover:text-white": !showResults,
              "bg-green-500 text-white": isSelectedAnswer,
              "bg-red-500 text-white border-none":
                showResults && isCorrectAnswer && !isSelectedAnswer,
            });

            return (
              <li
                key={index}
                className={cn(
                  "flex rounded-md border-2 border-green-500 transition-colors duration-300 ease-in-out",
                  answerClasses,
                )}
              >
                <button
                  onClick={() => handleClick(answer)}
                  disabled={showResults}
                  className="px-2 py-1"
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  },
);
