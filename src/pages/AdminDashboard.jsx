import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddBook from "../components/AddBook.jsx";
import EditBook from "../components/EditBook.jsx";
import OrderDetail from "../components/OrderDeatail.jsx";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("books");
  const [books, setBooks] = useState([]);
  const [editBook, setEditBook] = useState(false);
  const [showAddBook, setShowAddBook] = useState(false);
  const [id, setId] = useState(null);
  const [odId, setOdId] = useState(null);
  const [odDetail, setOdDetail] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [orders, setOrders] = useState([]);

  // ✅ Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(8);
  const [totalBooks, setTotalBooks] = useState(0);

  const navigate = useNavigate();

  // 📚 Fetch books (with pagination)
  const bookList = async (page = 1) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/books?page=${page}&limit=${booksPerPage}`);
      if (res.data.code === 200) {
        setBooks(res.data.data.books || res.data.data);
        setTotalBooks(res.data.data.total || res.data.data.length); // backend က total ရှိရင် သုံးမယ်
      } else {
        setBooks([]);
      }
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  // 🧾 Fetch Orders
  const orderList = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/orderList/orders");
      if (res.data.code === 200) setOrders(res.data.data);
      else setOrders([]);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    bookList(currentPage);
    orderList();
  }, [currentPage]);

  // ❌ Delete book
  const handleDeleteBook = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/v1/books/${id}`);
      if (res.data.code === 200) {
        alert("Deleted successfully");
        await bookList(currentPage);
      } else {
        alert("Failed to delete");
      }
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
  };

  // ❌ Delete order
  const handleDeleteOrder = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/v1/orderList/orders/${id}`);
      if (res.data.code === 200) {
        alert("Delete this order successfully");
        await orderList();
      } else {
        alert("Fail delete this order");
      }
    } catch (error) {
      console.error("Failed to delete order:", error);
    }
  };

  // 🎨 UI Components
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

  // ✅ Pagination Buttons
  const totalPages = Math.ceil(totalBooks / booksPerPage);

  const Pagination = () => (
    <div className="flex justify-center items-center mt-4 gap-2">
      <Button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
        className={`bg-gray-300 text-gray-800 hover:bg-gray-400 ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        ◀ Prev
      </Button>

      <span className="font-semibold text-gray-700">
        Page {currentPage} of {totalPages || 1}
      </span>

      <Button
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className={`bg-gray-300 text-gray-800 hover:bg-gray-400 ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Next ▶
      </Button>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
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

      {/* Main Content */}
      <main className="flex-1 p-8">
        {activeTab === "books" && (
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-pink-700">
                📘 Book Management
              </h2>
              <Button
                onClick={() => setShowAddBook(true)}
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
                      <td className="p-3 border-b text-neutral-600">
                        {book.title}
                      </td>
                      <td className="p-3 border-b text-gray-600">{book.price}</td>
                      <td className="p-3 border-b text-neutral-600">
                        {book.stock}
                      </td>
                      <td className="p-3 border-b text-gray-600">
                        {book.remark}
                      </td>
                      <td className="p-3 border-b text-center">
                        <Button
                          onClick={() => {
                            setId(book.id);
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

            {/* ✅ Pagination here */}
            <Pagination />

            {/* AddBook Modal */}
            {showAddBook && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
                  <button
                    onClick={() => setShowAddBook(false)}
                    className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl"
                  >
                    ✖
                  </button>
                  <AddBook
                    onSuccess={() => {
                      setShowAddBook(false);
                      bookList(currentPage);
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
                      setId(null);
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
                  <th className="p-3 border-b">Phone</th>
                  <th className="p-3 border-b">Total ($)</th>
                  <th className="p-3 border-b text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-6 text-gray-600 text-lg"
                    >
                      😢 No orders available
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="hover:bg-pink-50">
                      <td className="p-3 border-b">{order.id}</td>
                      <td className="p-3 border-b">{order.name}</td>
                      <td className="p-3 border-b">{order.phone}</td>
                      <td className="p-3 border-b">${order.total}</td>
                      <td className="p-3 border-b text-center">
                        <Button
                          onClick={() => {
                            setOdDetail(true);
                            setOdId(order.id);
                          }}
                          className="bg-blue-500 text-white hover:bg-blue-700 mx-4"
                        >
                          View
                        </Button>
                        <Button
                          onClick={() => handleDeleteOrder(order.id)}
                          className="bg-red-500 text-white hover:bg-red-700"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {odDetail && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
                  <button
                    onClick={() => setOdDetail(false)}
                    className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl"
                  >
                    ✖
                  </button>
                  <OrderDetail id={odId} />
                </div>
              </div>
            )}
          </Card>
        )}
      </main>
    </div>
  );
}
