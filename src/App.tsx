import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./app/layout";
import { Home } from "./app/page";
import { QuizPage } from "./app/play/page";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/play",
        element: <QuizPage />,
      },
      {
        path: "/results",
        async lazy() {
          const { ResultsPage } = await import("./app/results/page");
          return { Component: ResultsPage };
        },
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
