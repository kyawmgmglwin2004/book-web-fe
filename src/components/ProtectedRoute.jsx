import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const [isExpired, setIsExpired] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return setIsExpired(true);

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      const timeLeft = decoded.exp - currentTime;

      if (timeLeft <= 0) {
        setIsExpired(true);
      } else {
        // Set timer to auto-expire when token time is up
        const timeout = setTimeout(() => setIsExpired(true), timeLeft * 1000);
        return () => clearTimeout(timeout);
      }
    } catch (err) {
      console.error("Invalid token:", err);
      setIsExpired(true);
    }
  }, [token]);

  if (!token || isExpired) {
    localStorage.removeItem("token");
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default ProtectedRoute;
