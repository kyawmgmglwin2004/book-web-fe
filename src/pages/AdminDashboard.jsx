import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddBook from "../components/AddBook.jsx";
import EditBook from "../components/EditBook.jsx";
import OrderDetail from "../components/OrderDeatail.jsx";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("books");

  // ✅ Books
  const [books, setBooks] = useState([]);
  const [bookPage, setBookPage] = useState(1);
  const [bookTotalPages, setBookTotalPages] = useState(1);
  const [bookLimit] = useState(5);

  // ✅ Orders
  const [orders, setOrders] = useState([]);
  const [orderPage, setOrderPage] = useState(1);
  const [orderTotalPages, setOrderTotalPages] = useState(1);
  const [orderLimit] = useState(5);

  // Modals
  const [editBook, setEditBook] = useState(false);
  const [showAddBook, setShowAddBook] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [id, setId] = useState(null);
  const [odId, setOdId] = useState(null);
  const [odDetail, setOdDetail] = useState(false);

  const navigate = useNavigate();

  // 📚 Fetch Books with Pagination
  const bookList = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/books?page=${bookPage}&limit=${bookLimit}`
      );
      if (res.data.code === 200) {
        setBooks(res.data.data.data || res.data.data);
        setBookTotalPages(res.data.data.pagination?.totalPages || 1);
      } else {
        setBooks([]);
      }
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  // 🧾 Fetch Orders with Pagination
  const orderList = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/orderList/orders?page=${orderPage}&limit=${orderLimit}`
      );
      if (res.data.code === 200) {
        setOrders(res.data.data.data || res.data.data);
        setOrderTotalPages(res.data.data.pagination?.totalPages || 1);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    bookList();
  }, [bookPage]);

  useEffect(() => {
    orderList();
  }, [orderPage]);

  // ❌ Delete Book
  const handleDeleteBook = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/v1/books/${id}`);
      if (res.data.code === 200) {
        alert("Book deleted successfully");
        bookList();
      } else {
        alert("Failed to delete book");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // ❌ Delete Order
  const handleDeleteOrder = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/v1/orderList/orders/${id}`
      );
      if (res.data.code === 200) {
        alert("Order deleted successfully");
        orderList();
      } else {
        alert("Failed to delete order");
      }
    } catch (error) {
      console.error("Delete order error:", error);
    }
  };

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
        {/* ==================== BOOKS TAB ==================== */}
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
                      <td className="p-3 border-b">{book.title}</td>
                      <td className="p-3 border-b">{book.price}</td>
                      <td className="p-3 border-b">{book.stock}</td>
                      <td className="p-3 border-b">{book.remark}</td>
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

              {/* ✅ Pagination */}
              <div className="flex justify-center items-center mt-6 gap-4">
                <Button
                  onClick={() => setBookPage((p) => Math.max(p - 1, 1))}
                  disabled={bookPage === 1}
                  className="bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                  Previous
                </Button>
                <span className="text-gray-700 font-medium">
                  Page {bookPage} of {bookTotalPages}
                </span>
                <Button
                  onClick={() =>
                    setBookPage((p) => Math.min(p + 1, bookTotalPages))
                  }
                  disabled={bookPage === bookTotalPages}
                  className="bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                  Next
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* ==================== ORDERS TAB ==================== */}
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
                    <td colSpan="5" className="text-center py-6 text-gray-600">
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
                          className="bg-blue-500 text-white hover:bg-blue-700 mx-2"
                        >
                          View
                        </Button>
                        <Button
                          onClick={() => handleDeleteOrder(order.id)}
                          className="bg-red-500 text-white hover:bg-red-700 mx-2"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* ✅ Orders Pagination */}
            <div className="flex justify-center items-center mt-6 gap-4">
              <Button
                onClick={() => setOrderPage((p) => Math.max(p - 1, 1))}
                disabled={orderPage === 1}
                className="bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                Previous
              </Button>
              <span className="text-gray-700 font-medium">
                Page {orderPage} of {orderTotalPages}
              </span>
              <Button
                onClick={() =>
                  setOrderPage((p) => Math.min(p + 1, orderTotalPages))
                }
                disabled={orderPage === orderTotalPages}
                className="bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </Button>
            </div>

            {/* 🪟 Order Detail Modal */}
            {odDetail && (
              <div className=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-xl lg-w[50vw] relative">
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
