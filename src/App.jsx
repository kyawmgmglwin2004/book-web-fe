import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import AddToCart from "./pages/AddToCart";
import { CartProvider } from "./context/CartContext.jsx";
import OrderForm from "./pages/OrderForm.jsx";
import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import About from "./pages/About.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <SearchProvider>
          <Router>
            <Routes>
              {/* 🏠 Main Layout Routes */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="addToCart" element={<AddToCart />} />
                <Route path="about" element={<About />} />
                <Route path="privacy" element={<PrivacyPolicy />} />
                <Route path="order" element={<OrderForm />} />
              </Route>

              {/* 🔐 Admin Routes */}
              <Route path="/admin" element={<Login />} />

              <Route
                path="/adminDashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </SearchProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
