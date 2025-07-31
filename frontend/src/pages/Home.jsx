// src/pages/Home.jsx
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setLogin } from "../redux/userSlice";

import { baseUrl_auth } from "../api/apiCall";
import { api } from "../api/interceptor";
const Home = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log("user", user);
  const handleFetchUSer = async () => {
    try {
      const res = await api.request({
        url: `${baseUrl_auth}/auth/get-user`,
        method: "GET",
        withCredentials: true,
      });

      console.log("result from get user", res);
      dispatch(setLogin(res));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleFetchUSer();
  }, []);

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

        <input type="date" name="date" className="bg-red-500" />
      </div>
    </div>
  );
};

export default Home;
