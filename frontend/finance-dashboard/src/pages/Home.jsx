// src/pages/Home.jsx
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center text-center px-4 py-12">
      <h2 className="text-4xl font-bold text-teal-700 mb-6">
        Welcome to FinTrack
      </h2>
      <p className="text-gray-700 text-lg mb-6 max-w-xl">
        Take control of your money. Log your daily expenses, track your income,
        and visualize your financial health with smart analytics.
      </p>
      <div className="flex gap-4">
        <Link
          to="/signup"
          className="px-6 py-3 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700"
        >
          Get Started
        </Link>
        <Link
          to="/signin"
          className="px-6 py-3 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Home;
