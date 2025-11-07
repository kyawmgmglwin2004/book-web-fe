import React, { useState } from "react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("books");
  const [books, setBooks] = useState([
    { id: 1, title: "The Bookworm’s Guide", author: "Jane Doe", price: 20 },
    { id: 2, title: "Baby Learns Colors", author: "John Smith", price: 15 },
  ]);

  const [orders, setOrders] = useState([
    { id: 101, customer: "Alice", total: 35, status: "Pending" },
    { id: 102, customer: "Bob", total: 20, status: "Delivered" },
  ]);

  const [newBook, setNewBook] = useState({ title: "", author: "", price: "" });

  // 📚 CRUD Handlers
  const handleAddBook = () => {
    if (!newBook.title || !newBook.author || !newBook.price) return alert("Fill all fields!");
    const newId = books.length + 1;
    setBooks([...books, { id: newId, ...newBook }]);
    setNewBook({ title: "", author: "", price: "" });
  };

  const handleDeleteBook = (id) => {
    setBooks(books.filter((b) => b.id !== id));
  };

  const handleEditBook = (id, field, value) => {
    setBooks(books.map((b) => (b.id === id ? { ...b, [field]: value } : b)));
  };

  // 📦 Order Management
  const handleOrderStatus = (id, newStatus) => {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));
  };

  // 🎨 Reusable inline UI elements
  const Button = ({ children, className, ...props }) => (
    <button
      {...props}
      className={`px-4 py-2 rounded-lg font-semibold transition-all ${className}`}
    >
      {children}
    </button>
  );

  const Card = ({ children, className }) => (
    <div className={`bg-white shadow-md rounded-2xl p-6 ${className}`}>{children}</div>
  );

  return (
    <div className="min-h-screen bg-pink-50 p-6">
      <h1 className="text-3xl font-bold text-pink-600 text-center mb-8">
        📚 Admin Dashboard
      </h1>

      {/* 🧭 Navigation Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        <Button
          onClick={() => setActiveTab("books")}
          className={`${
            activeTab === "books"
              ? "bg-pink-600 text-white"
              : "bg-white text-pink-600 border border-pink-300"
          }`}
        >
          Book Management
        </Button>
        <Button
          onClick={() => setActiveTab("orders")}
          className={`${
            activeTab === "orders"
              ? "bg-pink-600 text-white"
              : "bg-white text-pink-600 border border-pink-300"
          }`}
        >
          Order Management
        </Button>
      </div>

      {/* 📚 Book Management */}
      {activeTab === "books" && (
        <Card>
          <h2 className="text-xl font-semibold text-pink-700 mb-4">
            Add New Book
          </h2>
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <input
              type="text"
              placeholder="Title"
              value={newBook.title}
              onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
              className="border border-pink-200 rounded-lg p-2 w-full"
            />
            <input
              type="text"
              placeholder="Author"
              value={newBook.author}
              onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
              className="border border-pink-200 rounded-lg p-2 w-full"
            />
            <input
              type="number"
              placeholder="Price"
              value={newBook.price}
              onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
              className="border border-pink-200 rounded-lg p-2 w-full"
            />
            <Button
              onClick={handleAddBook}
              className="bg-pink-600 text-white hover:bg-pink-700"
            >
              ➕ Add
            </Button>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-pink-100 text-pink-700">
                <th className="p-3 border-b">Title</th>
                <th className="p-3 border-b">Author</th>
                <th className="p-3 border-b">Price ($)</th>
                <th className="p-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id} className="hover:bg-pink-50">
                  <td className="p-3 border-b">
                    <input
                      type="text"
                      value={book.title}
                      onChange={(e) => handleEditBook(book.id, "title", e.target.value)}
                      className="w-full bg-transparent"
                    />
                  </td>
                  <td className="p-3 border-b">
                    <input
                      type="text"
                      value={book.author}
                      onChange={(e) => handleEditBook(book.id, "author", e.target.value)}
                      className="w-full bg-transparent"
                    />
                  </td>
                  <td className="p-3 border-b">
                    <input
                      type="number"
                      value={book.price}
                      onChange={(e) => handleEditBook(book.id, "price", e.target.value)}
                      className="w-full bg-transparent"
                    />
                  </td>
                  <td className="p-3 border-b">
                    <Button
                      onClick={() => handleDeleteBook(book.id)}
                      className="bg-red-500 text-white hover:bg-red-600"
                    >
                      🗑 Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {/* 📦 Order Management */}
      {activeTab === "orders" && (
        <Card>
          <h2 className="text-xl font-semibold text-pink-700 mb-4">
            Orders Overview
          </h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-pink-100 text-pink-700">
                <th className="p-3 border-b">Order ID</th>
                <th className="p-3 border-b">Customer</th>
                <th className="p-3 border-b">Total ($)</th>
                <th className="p-3 border-b">Status</th>
                <th className="p-3 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-pink-50">
                  <td className="p-3 border-b">{order.id}</td>
                  <td className="p-3 border-b">{order.customer}</td>
                  <td className="p-3 border-b">${order.total}</td>
                  <td className="p-3 border-b">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleOrderStatus(order.id, e.target.value)
                      }
                      className="border border-pink-300 rounded-lg p-1"
                    >
                      <option>Pending</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>
                  </td>
                  <td className="p-3 border-b">
                    <Button className="bg-pink-600 text-white hover:bg-pink-700">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
