import { useCallback, useEffect, useState } from "react";
import { ICategory } from "../../models/interfaces";
import { ActionTypes } from "../../models/actions";
import { DIFFICULTIES, NUMBER_OF_QUESTIONS } from "../../models/constants";
import { QuizComponent } from "../_components/QuizComponent";
import { fetchCategories, fetchQuiz } from "../../api/fetchers";
import { useQuiz, useQuizDispatch } from "../../hooks/QuizContext";
import { Select } from "./_components/Select";

export const QuizPage = () => {
  const [categoryId, setCategoryId] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [categories, setCategories] = useState<ReadonlyArray<ICategory>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const quiz = useQuiz();
  const dispatch = useQuizDispatch();

  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
      .catch(() =>
        setError("Error retrieving categories. Please refresh the page."),
      );
  }, []);

  const handleSubmit = async () => {
    if (!categoryId || !difficulty) {
      setError("Please select a category and difficulty");
      return;
    }
    try {
      setIsLoading(true);
      setError("");

      const data = await fetchQuiz(NUMBER_OF_QUESTIONS, categoryId, difficulty);
      dispatch({ type: ActionTypes.SET_QUIZ, payload: data });
      setIsLoading(false);
    } catch (error: unknown) {
      if (error instanceof Error)
        setError(`An error occurred: ${error.message}`);
      else setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  const handleCategoryChange = useCallback((e: string) => {
    setCategoryId(e);
  }, []);

  const handleDifficultyChange = useCallback((e: string) => {
    setDifficulty(e);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-4">
      <h1 className="text-2xl">QUIZ MAKER</h1>

      <div className="flex items-center">
        <Select
          id="categorySelect"
          placeholder="Select a category"
          value={categoryId}
          handleChange={handleCategoryChange}
          options={categories}
          className="rounded-l-md"
        />
        <Select
          id="difficultySelect"
          placeholder="Select difficulty"
          value={difficulty}
          handleChange={handleDifficultyChange}
          options={DIFFICULTIES}
        />
        <button
          id="createBtn"
          onClick={handleSubmit}
          className="line-height-0 w-[100px] rounded-r-md border bg-white p-1.5"
        >
          {isLoading ? "Loading..." : "Create"}
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {quiz?.length > 0 && (
        <QuizComponent quiz={quiz} buttonLabel="Submit" redirectTo="/results" />
      )}
    </div>
  );
};
