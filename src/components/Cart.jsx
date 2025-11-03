// Cart.jsx
import { useState } from "react";
import { X } from "lucide-react";



export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "The Very Hungry Caterpillar",
      age: "2–4 years",
      price: 12.99,
      image:
        "https://images-na.ssl-images-amazon.com/images/I/81eB+7+CkUL.jpg",
      qty: 1,
    },
    {
      id: 2,
      title: "Goodnight Moon",
      age: "1–3 years",
      price: 10.5,
      image:
        "https://images-na.ssl-images-amazon.com/images/I/81n0c0A6XPL.jpg",
      qty: 2,
    },
  ]);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const removeItem = (id) =>
    setCartItems(cartItems.filter((item) => item.id !== id));

  const updateQty = (id, delta) =>
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item
      )
    );

  return (
    <div className="min-h-screen bg-pink-50 py-12 px-4 sm:px-6 lg:px-8 mt-[-40vh]">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-pink-200 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-pink-600">🛒 Your Cart</h1>
          <p className="text-gray-500 text-sm">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
          </p>
        </div>

        {/* Cart Items */}
        <div className="divide-y divide-gray-200">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center gap-4 p-6"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-28 h-28 object-cover rounded-lg border border-pink-100"
              />
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-500">{item.age}</p>
                <p className="text-pink-600 font-bold mt-1">
                  ${item.price.toFixed(2)}
                </p>
              </div>

              {/* Quantity controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQty(item.id, -1)}
                  className="w-8 h-8 rounded-md bg-pink-100 hover:bg-pink-200 text-pink-600 font-bold"
                >
                  −
                </button>
                <span className="w-6 text-center text-gray-700">
                  {item.qty}
                </span>
                <button
                  onClick={() => updateQty(item.id, 1)}
                  className="w-8 h-8 rounded-md bg-pink-100 hover:bg-pink-200 text-pink-600 font-bold"
                >
                  +
                </button>
              </div>

              {/* Remove button */}
              <button
                onClick={() => removeItem(item.id)}
                className="text-gray-400 hover:text-pink-600"
              >
                <X size={20} />
              </button>
            </div>
          ))}

          {cartItems.length === 0 && (
            <p className="text-center py-10 text-gray-500">
              Your cart is empty 😢
            </p>
          )}
        </div>

        {/* Summary Section */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-pink-50 border-t border-pink-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium text-gray-700">
                Subtotal
              </span>
              <span className="text-xl font-bold text-pink-600">
                ${total.toFixed(2)}
              </span>
            </div>
            <button className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-xl font-semibold transition-colors">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}