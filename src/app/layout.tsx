import { Navbar } from "./_components/Navbar";
import { QuizProvider } from "../hooks/QuizContext";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <QuizProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="mx-auto w-full max-w-screen-xl flex-1 flex-grow px-4">
          <Outlet />
        </div>
      </div>
    </QuizProvider>
  );
};
