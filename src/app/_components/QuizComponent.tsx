import { Link } from "react-router-dom";
import { IQuestion } from "../../models/interfaces/quiz.interface";
import { QuestionWrapper } from "./QuestionWrapper";
import { cn } from "../../lib/utils";

interface QuizComponentProps {
  quiz: ReadonlyArray<IQuestion>;
  buttonLabel: string;
  redirectTo: string;
  onButtonClick?: () => void;
  showResults?: boolean;
}
export const QuizComponent = ({
  quiz,
  buttonLabel,
  redirectTo,
  onButtonClick,
  showResults = false,
}: QuizComponentProps) => {
  if (!quiz.length) return null;

  const isButtonVisible =
    showResults || quiz.every(({ answer }) => answer !== undefined);

  const correctAnswers = showResults
    ? quiz.filter((question) => question.answer === question.correct_answer)
        .length
    : 0;

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="flex flex-col space-y-4">
        {quiz.map((question) => (
          <QuestionWrapper
            key={question.id}
            question={question}
            showResults={showResults}
          />
        ))}
      </div>
      {showResults && (
        <div
          className={cn(
            "flex w-1/3 flex-col items-center space-y-4",
            correctAnswers <= 1
              ? "bg-red-500"
              : correctAnswers <= 3
                ? "bg-yellow-500"
                : "bg-green-500",
          )}
        >
          <h2>
            You scored {correctAnswers} out of {quiz.length}
          </h2>
        </div>
      )}
      {isButtonVisible && (
        <Link
          to={redirectTo}
          onClick={onButtonClick}
          className="mx-auto my-4 w-1/2 rounded-md bg-gray-500 p-2 text-center text-white"
        >
          {buttonLabel}
        </Link>
      )}
    </div>
  );
};
