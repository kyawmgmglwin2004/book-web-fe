import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddBook from "../components/AddBook.jsx"; // ✅ our modal form component
import EditBook from "../components/EditBook.jsx";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("books");
  const [books, setBooks] = useState([]);
  const [editBook, setEditBook] = useState(false);
  const [showAddBook, setShowAddBook] = useState(false);
  const [id, setId] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null); // ✅ controls AddBook modal
  const [orders, setOrders] = useState([
    { id: 101, customer: "Alice", total: 35, status: "Pending" },
    { id: 102, customer: "Bob", total: 20, status: "Delivered" },
  ]);
  console.log("edit :", selectedBook)

  const navigate = useNavigate();

  // 📚 Fetch books
  const bookList = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/books");
      if (res?.data?.data && Array.isArray(res.data.data)) {
        setBooks(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  useEffect(() => {
    bookList();
  }, []);

  // ❌ Delete
  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/books/${id}`);
      await bookList();
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
  };

  // ✏️ Edit
  const handleEditBook = (book) => {
    navigate(`/edit/${book.id}`, { state: book });
  };

  // 🎨 Reusable components
  const Button = ({ children, className, ...props }) => (
    <button
      {...props}
      className={`px-4 py-2 rounded-lg font-semibold transition-all ${className}`}
    >
      {children}
    </button>
  );

  const Card = ({ children, className }) => (
    <div className={`bg-white shadow-md rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* 🧭 Sidebar */}
      <aside className="w-64 bg-pink-500 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-8 text-center">Admin Tools</h2>

        <nav className="flex flex-col gap-3">
          <button
            onClick={() => setActiveTab("books")}
            className={`text-left px-4 py-2 rounded-lg transition ${
              activeTab === "books"
                ? "bg-white text-pink-600 font-bold"
                : "hover:bg-pink-500"
            }`}
          >
            📚 Book Management
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`text-left px-4 py-2 rounded-lg transition ${
              activeTab === "orders"
                ? "bg-white text-pink-600 font-bold"
                : "hover:bg-pink-500"
            }`}
          >
            🧾 Order Management
          </button>
        </nav>

        <div className="mt-auto text-center text-sm text-pink-100">
          © 2025 Admin Panel
        </div>
      </aside>

      {/* 📄 Main Content */}
      <main className="flex-1 p-8">
        {activeTab === "books" && (
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-pink-700">
                📘 Book Management
              </h2>
              <Button
                onClick={() => setShowAddBook(true)} // ✅ open modal
                className="bg-pink-600 text-white hover:bg-pink-700"
              >
                ➕ Add New Book
              </Button>
            </div>

            {/* Book Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-pink-100 text-pink-700">
                    <th className="p-3 border-b">Title</th>
                    <th className="p-3 border-b">Price ($)</th>
                    <th className="p-3 border-b">Stock</th>
                    <th className="p-3 border-b">Remark</th>
                    <th className="p-3 border-b text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr key={book.id} className="hover:bg-pink-50">
                      <td className="p-3 border-b text-neutral-600">{book.title}</td>
                      <td className="p-3 border-b text-gray-600">{book.price}</td>
                      <td className="p-3 border-b text-neutral-600">{book.stock}</td>
                      <td className="p-3 border-b text-gray-600">{book.remark}</td>
                      <td className="p-3 border-b text-center">
                        <Button
                          onClick={() => {
                            setId(book.id)
                            setSelectedBook(book);
                            setEditBook(true); 
                          }}
                          className="bg-blue-500 text-white hover:bg-blue-700 mx-2"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDeleteBook(book.id)}
                          className="bg-red-500 text-white hover:bg-red-700 mx-2"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 🪟 AddBook Modal */}
            {showAddBook && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
                  <button
                    onClick={() => setShowAddBook(false)}
                    className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl"
                  >
                    ✖
                  </button>
                  {/* AddBook component with callbacks */}
                  <AddBook
                    onSuccess={() => {
                      setShowAddBook(false);
                      bookList(); // ✅ refresh after success
                    }}
                    onCancel={() => setShowAddBook(false)}
                  />
                </div>
              </div>
            )}
            {editBook && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
                  <button
                    onClick={() => setEditBook(false)}
                    className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl"
                  >
                    ✖
                  </button>
                  <EditBook
                    id={id}
                    book={selectedBook}
                    onSuccess={() => {
                      setEditBook(false);
                      {setId(null)};
                      setSelectedBook(null);
                      bookList();
                    }}
                    onCancel={() => {
                      setEditBook(false);
                      setId(null);
                      setSelectedBook(null);
                    }}
                  />
                </div>
              </div>
            )}
          </Card>
        )}

        {/* 🧾 Orders */}
        {activeTab === "orders" && (
          <Card>
            <h2 className="text-2xl font-semibold text-pink-700 mb-4">
              🧾 Order Management
            </h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-pink-100 text-pink-700">
                  <th className="p-3 border-b">Order ID</th>
                  <th className="p-3 border-b">Customer</th>
                  <th className="p-3 border-b">Total ($)</th>
                  <th className="p-3 border-b">Status</th>
                  <th className="p-3 border-b text-center">Action</th>
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
                          setOrders((prev) =>
                            prev.map((o) =>
                              o.id === order.id
                                ? { ...o, status: e.target.value }
                                : o
                            )
                          )
                        }
                        className="border border-pink-300 rounded-lg p-1"
                      >
                        <option>Pending</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                      </select>
                    </td>
                    <td className="p-3 border-b text-center">
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
      </main>
    </div>
  );
}
