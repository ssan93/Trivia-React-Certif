import { useNavigate } from "react-router-dom";
import { useQuiz, useQuizDispatch } from "../../hooks/QuizContext";
import { ActionTypes } from "../../models/actions";
import { QuizComponent } from "../_components/QuizComponent";
import { useEffect } from "react";

export const ResultsPage = () => {
  const quiz = useQuiz();
  const dispatch = useQuizDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!quiz.length) {
      navigate("/play");
    }
  }, [quiz, navigate]);

  const handleButtonClick = () => {
    dispatch({ type: ActionTypes.RESET_QUIZ });
  };

  return (
    <div className="flex flex-col items-center space-y-4 py-4">
      <h1 className="text-2xl">Results</h1>
      <QuizComponent
        quiz={quiz}
        buttonLabel="Create a new quiz"
        redirectTo="/play"
        onButtonClick={handleButtonClick}
        showResults
      />
    </div>
  );
};
