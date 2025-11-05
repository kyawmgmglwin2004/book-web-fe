import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartBooks, setCartBooks] = useState([]);

  // Add to cart function
  const addToCart = (book) => {
    setCartBooks((prev) => {
      const existing = prev.find((item) => item.id === book.id);
      if (existing) {
        // already in cart → increase quantity
        return prev.map((item) =>
          item.id === book.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        // new item
        return [...prev, { ...book, qty: 1 }];
      }
    });
  };

  // Remove item
  const removeFromCart = (id) => {
    setCartBooks((prev) => prev.filter((item) => item.id !== id));
  };

  // Update qty
  const updateQty = (id, delta) => {
    setCartBooks((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cartBooks, addToCart, removeFromCart, updateQty }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
