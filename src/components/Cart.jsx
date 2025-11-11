// Cart.jsx
import { X } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cartBooks, removeFromCart, updateQty } = useCart();
  const navigate = useNavigate();

  const total = cartBooks.reduce((sum, item) => sum + item.price * item.qty, 0);

  const removeItem = (id) => removeFromCart(id);
  const changeQty = (id, delta) => updateQty(id, delta);

  return (
    <div className="min-h-screen bg-pink-50 py-12 px-4 sm:px-6 lg:px-8 mt-[-40vh]">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-pink-200 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-pink-600">🛒 Your Cart</h1>
          <p className="text-gray-500 text-sm">
            {cartBooks.length} {cartBooks.length === 1 ? "item" : "items"}
          </p>
        </div>

        {/* Cart Items */}
        <div className="divide-y divide-gray-200">
          {cartBooks.map((book) => (
            <div
              key={book.id}
              className="flex flex-col md:flex-row items-center justify-between p-5 gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-28 w-28 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-lg font-semibold">{book.title}</h3>
                  <p className="text-pink-600 font-bold">${book.price}</p>
                </div>
              </div>

              {/* Qty Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => changeQty(book.id, -1)}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold"
                  disabled={book.qty <= 1}
                >
                  –
                </button>
                <span className="text-lg font-semibold">{book.qty}</span>
                <button
                  onClick={() => changeQty(book.id, 1)}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold"
                >
                  +
                </button>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeItem(book.id)}
                className="text-gray-400 hover:text-red-500 transition"
              >
                <X />
              </button>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        {cartBooks.length > 0 && (
          <div className="p-6 bg-pink-50 border-t border-pink-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium text-gray-700">Subtotal</span>
              <span className="text-xl font-bold text-pink-600">
                ${total.toFixed(2)}
              </span>
            </div>
            <button
              onClick={() => navigate("/order")}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-xl font-semibold transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
