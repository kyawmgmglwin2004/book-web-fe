import React, { useEffect, useState } from "react";
// import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import axios from "axios";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
//   const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

//   const [captchaToken, setCaptchaToken] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [login, setLogin] = useState(true);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("success");


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("token:", captchaToken);

    // if (!captchaToken) {
    //   setAlertType("error");
    //   setAlertMessage("Please verify robot test.");
    //   return;
    // }

    setIsSending(true);
    setIsSent(false);

    try {
      const response = await axios.post("http://localhost:5000/api/v1/admin/login", formData );
        
      if (response.data.code === 200) {
        setIsSent(true);
        navigate("/adminDashboard")
        setFormData({ userName: "" , email: "", password: "" });
        setAlertMessage("✅ Successfully logged in.");
        setAlertType("success");
      } else if (response.data.code === 404) {
        setIsSent(false);
        setAlertMessage(response.data.message);
        setAlertType("error");
      }else if(response.data.code === 400) {
        setIsSent(false);
        setAlertMessage(response.data.message);
        setAlertType("error");
      }
    } catch (error) {
      console.error(error);
      setIsSent(false);
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
      {/* --- LOGIN FORM --- */}
      {login && (
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

            {/* <ReCAPTCHA
              sitekey="6Lc6MNArAAAAAIhziVkoUSV4qz5FZo4cvUhsVNcM"
              onChange={(token) => setCaptchaToken(token)}
            /> */}

            <button
              type="submit"
              className="w-full mt-4 bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-semibold transition-all"
              disabled={isSending}
            >
              {isSending ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="flex justify-between mt-5 text-sm text-gray-600">
            <button
              onClick={() => navigate("/forgotpsw")}
              className="hover:text-pink-500"
            >
              Forgot password?
            </button>
            {/* <button
              onClick={signUpForm}
              className="hover:text-pink-500 underline"
            >
              Sign Up
            </button> */}
          </div>

          {alertMessage && <Alert message={alertMessage} type={alertType} />}
        </div>
      )}
    </div>
  );
}
