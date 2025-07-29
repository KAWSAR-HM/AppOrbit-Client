import { Link } from "react-router-dom";
import Error from "../assets/Error 404 Page.gif"; // তোমার লোকাল gif

const Error404 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex items-center justify-center px-4">
      <div className="text-center text-white max-w-md bg-white/5 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-white/10">
        <img
          src={Error}
          alt="404"
          className="w-64 mx-auto mb-6 rounded-xl shadow-md"
        />

        <h1 className="text-5xl font-extrabold mb-3 text-orange-500 drop-shadow">
          Oops!
        </h1>
        <h2 className="text-xl font-semibold mb-4 text-white">
          Error 404 - Page Not Found
        </h2>
        <p className="mb-6 text-white/80 text-sm leading-relaxed">
          আপনার খোঁজা পৃষ্ঠা খুঁজে পাওয়া যায়নি।
          <br />
          আমরা সমাধানে কাজ করছি 😊
        </p>

        <Link
          to="/"
          className="inline-block hover:bg-indigo-700 text-white font-semibold px-6 py-2  shadow-md transition border border-white/40"
        >
          Back To Home
        </Link>
      </div>
    </div>
  );
};

export default Error404;
