import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import api from "../api";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("success");


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const response = await api.post("/admin/login", formData );
        
      if (response.code === 200) {
        const token = response.data.token;
        localStorage.setItem('token', token);
        navigate("/adminDashboard")
        setFormData({ userName: "" , email: "", password: "" });
      } else if (response.code === 404) {
        setAlertMessage(response.message);
        setAlertType("error");
      }else if(response.code === 400) {
        setAlertMessage(response.message);
        setAlertType("error");
      }
    } catch (error) {
      console.error(error);
      setAlertMessage(String(error));
      setAlertType("error");
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-50 py-8 px-4">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-8 border border-pink-100">
          <h2 className="text-2xl font-bold text-pink-600 mb-6">Sign in to continue</h2>

          <form onSubmit={handleSubmit} className="space-y-4">

             <input
              id="userName"
              name="userName"
              type="userName"
              value={formData.userName}
              onChange={handleChange}
              required
              placeholder="userName"
              className="w-full border border-pink-200 rounded-lg p-3 focus:ring-2 focus:ring-pink-400 outline-none"
            />
            {/* Email */}
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full border border-pink-200 rounded-lg p-3 focus:ring-2 focus:ring-pink-400 outline-none"
            />

            {/* Password */}
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full border border-pink-200 rounded-lg p-3 pr-12 focus:ring-2 focus:ring-pink-400 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-2 flex items-center px-2 text-sm text-pink-500 hover:text-pink-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-semibold transition-all"
              disabled={isSending}
            >
              {isSending ? "Logging in..." : "Login"}
            </button>
          </form>

          {alertMessage && <Alert message={alertMessage} type={alertType} />}
        </div>
    </div>
  );
}
