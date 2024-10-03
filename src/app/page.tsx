import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="flex flex-col items-center space-y-4 py-4">
      <h1 className="text-2xl">Welcome to the Mini Trivia App!</h1>
      <Link to="/play" className="w-fit rounded-md bg-blue-500 p-2 text-white">
        Start Playing
      </Link>
    </div>
  );
};
