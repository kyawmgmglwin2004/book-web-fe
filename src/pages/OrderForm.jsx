import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext"; // <-- your CartContext hook
import axios from "axios";

export default function OrderForm() {
  const { cartBooks, setCartBooks } = useCart();
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    payment: "cash",
  });

  const total = cartBooks.reduce((sum, item) => sum + item.price * item.qty, 0);

  // 🧩 Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🧩 Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
     setIsSent(false);

    if (cartBooks.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const orderData = {
      customer: formData,
      items: cartBooks,
      total,
    };

    console.log("payload :", orderData)
    try {
      const res = await axios.post("http://localhost:5000/api/v1/orders/mail", orderData);
      if (res.data.code === 200) {
        console.log("res :", res)
        alert("✅ Order placed successfully! Email sent.");
        setCartBooks([]);
        setIsSent(true);
        setIsSending(false)
        // clear cart after success
      } else if(res.data.code === 429) {
        alert(res.data.message);
        setIsSending(false);
        setIsSent(false);
      }else {
        alert("Order failed. Please try again.");
        setIsSending(false);
        setIsSent(false);
      }
    } catch (error) {
      setIsSent(false);
      setIsSending(false);
      console.error("❌ Order submit error:", error);
      alert("Failed to place order. Please try again later.");
    }
  };

  // 🧩 Show if empty
  if (cartBooks.length === 0) {
    return (
      <div className="h-auto mt-[10vh] flex items-center justify-center text-gray-600">
        <h2>Your cart is empty 🛒</h2>
      </div>
    );
  }

  // useEffect(() => {

  // }, [cartBooks])

  // 🧩 UI
  return (
    <div className="min-h-screen bg-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-pink-600 mb-6">
          📝 Order Information
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-pink-200 rounded-lg p-3 focus:ring-2 focus:ring-pink-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-pink-200 rounded-lg p-3 focus:ring-2 focus:ring-pink-500"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border border-pink-200 rounded-lg p-3 focus:ring-2 focus:ring-pink-500"
          />

          <textarea
            name="address"
            placeholder="Delivery Address"
            value={formData.address}
            onChange={handleChange}
            required
            rows="3"
            className="w-full border border-pink-200 rounded-lg p-3 focus:ring-2 focus:ring-pink-500"
          ></textarea>

          <div className="flex items-center space-x-4">
            <label className="text-gray-700 font-medium">Payment:</label>
            <select
              name="payment"
              value={formData.payment}
              onChange={handleChange}
              className="border border-pink-200 rounded-lg p-2"
            >
              <option value="cash">💵 Cash on Delivery</option>
              <option value="card">💳 Credit / Debit Card</option>
            </select>
          </div>

          {/* Order Summary */}
          <div className="border-t border-gray-200 mt-6 pt-6">
            <h3 className="text-lg font-semibold text-pink-600 mb-3">
              Order Summary
            </h3>
            {cartBooks.map((book) => (
              <div
                key={book.id}
                className="flex justify-between text-gray-700 mb-2"
              >
                <span>
                  {book.title} x {book.qty}
                </span>
                <span>${(book.price * book.qty).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold text-pink-700 border-t pt-2 mt-2">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-semibold transition-all"
            disabled={isSending}
          >
            {isSending ? "Ordering..." : isSent ? "Order" : "Order"}
          </button>
        </form>
      </div>
    </div>
  );
}
