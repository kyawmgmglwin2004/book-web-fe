import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import AddToCart from "./pages/AddToCart";
import BookDetail from "./pages/BookDetail";
import { CartProvider } from "./context/CartContext.jsx";
import OrderForm from "./pages/OrderForm.jsx";
import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import EditBook from "./pages/EditBookModel.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";

function App() {
  return (
    <CartProvider>
      <SearchProvider>
        <Router>
        <Routes>
          {/* 🏠 Main Layout Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="books/:id" element={<BookDetail />} />
            <Route path="addToCart" element={<AddToCart />} />
            <Route path="order" element={<OrderForm />} />
            <Route path="edit/:id" element={<EditBook />} />
          </Route>

          {/* 🔐 Admin Routes */}
          <Route path="/admin" element={<Login />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
      </SearchProvider>
    </CartProvider>
  );
}

export default App;
