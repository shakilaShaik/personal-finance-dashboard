import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import signupImg from "../assets/image.png"; // Make sure this image exists

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const BASE_URL_SIGNUP = import.meta.env.VITE_AUTH_BASE_URL

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    // Simple client-side validation
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL_SIGNUP}/auth/register`, formData);
      if (response.status === 200 || response.status === 201) {
        navigate("/signin");
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f7fa]">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-4 bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Left Side Image */}
        <div className="hidden md:block">
          <img
            src={signupImg}
            alt="Signup Visual"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side Form */}
        <div className="p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Create an Account
          </h2>

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-gray-600 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                autoFocus
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white py-2 rounded-md transition ${
                loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
