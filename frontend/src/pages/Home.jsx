import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLogin } from "../redux/userSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
// import SideBar from '../components/SideBar'
import authApi from '../api/authApi'

const Home = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log("the user from redux", user);

  const handleFetchUser = async () => {
    try {
      console.log("the url is interceptor url", authApi.baseURL);
      
      const res = await authApi.get("/auth/me");


      dispatch(setLogin(res.data));
    } catch (error) {
      console.error("Error fetching user:", error);
      toast.error(error.response?.data?.message || "Failed to fetch user data");

      // If unauthorized and interceptor didn't handle it
      if (error.response?.status === 401 ) {
        localStorage.removeItem("access_token");
       
      }
    }
  };

  useEffect(() => {
    handleFetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center text-center px-4 py-12">
      {user ? (
        <>
          <h1>Hii {user.name}</h1>
          {/* <SideBar/> */}
        </>
      ) : (
        <>
          <h2 className="text-4xl font-bold text-teal-700 mb-6">
            Welcome to FinTrack
          </h2>
          <p className="text-gray-700 text-lg mb-6 max-w-xl">
            Take control of your money. Log your daily expenses, track your
            income, and visualize your financial health with smart analytics.
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
        </>
      )}
    </div>
  );
};

export default Home;
