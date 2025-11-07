import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import AddToCart from "./pages/AddToCart";
import BookDetail from "./pages/BookDetail";
import { CartProvider } from "./context/CartContext.jsx";
import OrderForm from "./pages/OrderForm.jsx";
import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

function App() {
  return (
    <CartProvider>
      <Router>
      <Routes>
        <Route
          path="/"
          element={<Layout />}
        >
          <Route path="/" element={<Home />} />
          <Route path="/books/:id" element={<BookDetail/>} />
          <Route path="/addToCart" element={<AddToCart/>}/>
          <Route path="/order" element={<OrderForm/>} />
          <Route path="/admin" element={<Login/>} />
          <Route path="/adminDashboard" element={<AdminDashboard/>} />
        </Route>
      </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;
