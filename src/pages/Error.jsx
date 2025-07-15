import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center">
      <img
        src="https://i.ibb.co/6t1KcJX/404.gif"
        alt="404 Not Found"
        className="w-80"
      />
      <h2 className="text-2xl font-bold my-4">Page Not Found</h2>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Error404;
