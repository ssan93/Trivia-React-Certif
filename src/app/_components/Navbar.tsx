import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="bg-gray-800 p-4 text-white">
      <Link to="/" className="">
        Home
      </Link>
      <Link to="/play" className="ml-4">
        Play
      </Link>
    </div>
  );
};
