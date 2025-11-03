import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import { useState } from "react";
import AddToCart from "./pages/AddToCart";

function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Layout cartCount={cartCount} setCartCount={setCartCount} />}
        >
          <Route path="/" element={<Home cartCount={cartCount} setCartCount={setCartCount} />} />
          <Route path="/addToCart" element={<AddToCart/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
