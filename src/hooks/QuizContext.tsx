import {
  Context,
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";
import { IQuestion } from "../models/interfaces";
import { ActionTypes, QuizActions } from "../models/actions";

const QuizContext = createContext<ReadonlyArray<IQuestion> | null>(null);
const QuizDispatchContext = createContext<Dispatch<QuizActions> | null>(null);

function useCtx<T>(ctx: Context<T>) {
  const context = useContext(ctx);
  if (!context) {
    throw new Error(`context must be used within a ${ctx.Provider}`);
  }
  return context;
}

export const useQuiz = () => useCtx(QuizContext);
export const useQuizDispatch = () => useCtx(QuizDispatchContext);

export const QuizProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={state}>
      <QuizDispatchContext.Provider value={dispatch}>
        {children}
      </QuizDispatchContext.Provider>
    </QuizContext.Provider>
  );
};

const quizReducer = (
  state: ReadonlyArray<IQuestion>,
  action: QuizActions,
): ReadonlyArray<IQuestion> => {
  switch (action.type) {
    case ActionTypes.SET_QUIZ:
      return action.payload;
    case ActionTypes.SET_ANSWER:
      return state.map((question) => {
        if (question.id === action.payload.questionId) {
          return { ...question, answer: action.payload.answer };
        }
        return question;
      });
    case ActionTypes.RESET_QUIZ:
      return initialState;
    default:
      return state;
  }
};

const initialState: ReadonlyArray<IQuestion> = [];
