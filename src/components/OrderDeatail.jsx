import React, { useEffect, useState } from "react";
import api from "../api";

export default function OrderDetail(id) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const odId = id.id;

  useEffect(() => {
    const fetchOrder = async () => {
      try {
           
        const res = await api.get(`/orderList/orders/${odId}`);

        setOrder(res.data);
        console.log("res ;", id) 
      } catch (err) {
        console.error("❌ Failed to fetch order:", err);
        alert("Failed to load order details.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [odId]);

  if (loading) return <p className="text-center mt-10">⏳ Loading order...</p>;
  if (!order) return <p className="text-center mt-10 text-red-500">❌ Order not found.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-pink-600 mb-4">
        🧾 Order Detail (ID: {order.id})
      </h2>

      {/* Customer Info */}
      <div className="border p-4 rounded-xl mb-6 bg-gray-50">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">👤 Customer Info</h3>
        <p><span className="font-medium">Name:</span> {order.name}</p>
        <p><span className="font-medium">Email:</span> {order.email}</p>
        <p><span className="font-medium">Phone:</span> {order.phone}</p>
        <p><span className="font-medium">Address:</span> {order.address}</p>
        <p className="font-bold text-pink-600 mt-2">
          💰 Total: {Number(order.total).toLocaleString()} Ks
        </p>
      </div>

      
<div className="space-y-3">
  <h3 className="text-lg font-semibold mb-3 text-gray-700">📦 Order Items</h3>
  {order.items && order.items.length > 0 ? (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
      {order.items.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center border rounded-xl p-3 shadow-sm hover:shadow-md transition"
        >
          <div>
            <p className="font-semibold text-gray-800">{item.name}</p>
            <p className="text-sm text-gray-500">
              Qty: {item.quantity} × {item.price.toLocaleString()} Ks
            </p>
          </div>
          <p className="font-bold text-pink-600">
            {item.subtotal.toLocaleString()} Ks
          </p>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500 italic">No items in this order.</p>
  )}
</div>


    </div>
  );
}
