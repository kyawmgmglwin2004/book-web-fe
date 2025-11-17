import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddBook from "../components/AddBook.jsx";
import EditBook from "../components/EditBook.jsx";
import OrderDetail from "../components/OrderDeatail.jsx";
import Pagination from "../components/Paginate.jsx";
import Alert from "../components/Alert.jsx";
import api from "../api";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("books");
  const [books, setBooks] = useState([]);
  const [editBook, setEditBook] = useState(false);
  const [showAddBook, setShowAddBook] = useState(false);
  const [odDetail, setOdDetail] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [id, setId] = useState(null);
  const [odId, setOdId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [orderTotalPage, setOrderTotalPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderPage, setOrderPage] = useState(1);
  const [booksPerPage] = useState(10);
  const [ordersPerPage] = useState(10);
  const token = localStorage.getItem("token");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [orderStatus, setOrderStatus] = useState("Pending");
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);

  // Fetch books with pagination
  const bookList = async (page = 1) => {
    try {
      // const res = await axios.get(
      //   `http://localhost:5000/api/v1/books?page=${page}&limit=${booksPerPage}&title=${encodeURIComponent(
      //     searchQuery || ""
      //   )}`
      // );
      const res = await api.get(`/books?page=${page}&limit=${booksPerPage}&title=${encodeURIComponent(
        searchQuery || ""
      )}`); 
      if (res.code === 200) {
        setBooks(res.data.data);
        setTotalPage(res.data.pagination.totalPages);
      }else if(res.code === 404){
        setAlertMessage("No books found");
        setAlertType("error");
        setBooks([]);
      } 
      else {
        setAlertMessage("Failed to fetch books");
        setAlertType("error");
        setBooks([]);
        setTotalPage(1);
      }
    } catch (error) {
      setAlertMessage("❌ Failed to fetch books");
      setAlertType("error");
      console.error(error);
      setBooks([]);
    }
  };

  const confirm = async (id) => {
    try {
      // Toggle status
      const newStatus = orderStatus === "Pending" ? "Confirm" : "Pending";

      const data = { status: newStatus };

      // const res = await axios.post(
      //   `http://localhost:5000/api/v1/orderList/orders/${id}`,
      //   data,
      //   {
      //     headers: { Authorization: `Bearer ${token}` },
      //   }
      // );
      const res = await api.post(`/orderList/orders/${id}`, data);

      if (res.code === 200) {
        setOrderStatus(newStatus);
        setAlertMessage(`Order status updated to ${newStatus} successfully!`);
        setAlertType("success");
        orderList();
      } else {
        setAlertMessage("Failed to update order status");
        setAlertType("error");
      }
    } catch (error) {
      console.error(error);
      setAlertMessage("❌ Failed to update order status");
      setAlertType("error");
    }
  };

  // Fetch orders
  const orderList = async (page = 1) => {
    try {
      // const res = await axios.get(
      //   `http://localhost:5000/api/v1/orderList/orders?page=${page}&limit=${ordersPerPage}`,
      //   {
      //     headers: { Authorization: `Bearer ${token}` },
      //   }
      // );
      const res = await api.get(`/orderList/orders?page=${page}&limit=${ordersPerPage}`);
      console.log("Orders fetched:", res);
      if (res.code === 200) {
        setOrders(res.data.data);
        setOrderTotalPage(res.data.pagination.totalPages);
      }else if(res.code === 404){
        setAlertMessage("No orders found");
        setAlertType("error");
        setOrders([]);
        setOrderTotalPage(1);
      } 
      else {
        setAlertMessage("Failed to fetch orders");
        setAlertType("error");
        setOrders([]);
        setOrderTotalPage(1);
      }
    } catch (error) {
      setAlertMessage("❌ Failed to fetch orders");
      setAlertType("error");
      setOrders([]);
      console.error(error);
    }
  };

  

  const handleDeleteBook = async (id) => {
    try {
      // const res = await axios.delete(
      //   `http://localhost:5000/api/v1/books/${id}`,
      //   {
      //     headers: { Authorization: `Bearer ${token}` },
      //   }
      // );
      const res = await api.delete(`/books/${id}`);
      
      if (res.code === 200) {
        setAlertMessage("Book deleted successfully!");
        setAlertType("success");
        bookList(currentPage);
      } else {
        setAlertMessage("Failed to delete book");
        setAlertType("error");
      }
    } catch (error) {
      console.error(error);
      setAlertMessage("❌ Failed to delete book");
      setAlertType("error");
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      // const res = await axios.delete(
      //   `http://localhost:5000/api/v1/orderList/orders/${id}`,
      //   {
      //     headers: { Authorization: `Bearer ${token}` },
      //   }
      // );
      const res = await api.delete(`/orderList/orders/${id}`);
      
      if (res.code === 200) {
        setAlertMessage("Order deleted successfully!");
        setAlertType("success");
        orderList();
      } else {
        setAlertMessage("Failed to delete order");
        setAlertType("error");
      }
    } catch (error) {
      console.error(error);
      setAlertMessage("❌ Failed to delete order");
      setAlertType("error");
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin");
  }

  useEffect(() => {
    if(alertMessage){
      const timer = setTimeout(() => {
        setAlertMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  useEffect(() => {
    bookList(currentPage);
  }, [currentPage, searchQuery]);
  useEffect(() => {
  if (activeTab === "orders") {
    orderList(orderPage);
  }
}, [activeTab, orderPage]);

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

  const isModalOpen = showAddBook || editBook || odDetail;

  return (
    <>
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
           <button
            onClick={() => navigate("/")}
            className={`text-left px-4 py-2 rounded-lg transition
                bg-pink-500 text-white 
                hover:bg-white hover:text-pink-600 hover:font-bold`}
          >
            <i className="fa-regular fa-hand-point-left me-4"></i>
          Go to User View
          </button>
          <button
            onClick={handleLogout}
            className={`text-left px-4 py-2 rounded-lg transition
                bg-pink-500 text-white 
                hover:bg-white hover:text-pink-600 hover:font-bold`}
          >
            <i class="fa-solid fa-right-from-bracket me-4"></i>
          Logout
          </button>

        </nav>
        <div className="mt-auto text-center text-sm text-pink-100">
          © 2025 Admin Panel
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 relative">
        {/* Blur only the dashboard content when modal is open */}
        <div
          className={`transition-all duration-300 ${
            isModalOpen ? "blur-sm" : ""
          }`}
        >
          {activeTab === "books" && (
            <Card>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-pink-700">
                  📘 Book Management
                </h2>
                <input
                  value={searchQuery}
                  type="search"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search books..."
                  className=" border border-pink-100 rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                />
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
                      <th className="p-3 border-b">Image</th>
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
                        <td>
                          <img
                            src={book.images[0]}
                            alt={book.title}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                        </td>
                        <td className="p-3 border-b text-gray-600">
                          {book.price}
                        </td>
                        <td className="p-3 border-b text-neutral-600">
                          {book.stock}
                        </td>
                        <td className="p-3 border-b text-gray-600">
                          {book.remark}
                        </td>
                        <td className="p-3 border-b text-center">
                          <Button
                            onClick={() => {
                              setEditBook(true);
                              setId(book.id);
                              setSelectedBook(book);
                            }}
                            className="bg-blue-500 text-white hover:bg-blue-700 mx-2 mb-2"
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
              <Pagination
                currentPage={currentPage}
                totalPage={totalPage}
                onPageChange={setCurrentPage}
              />
            </Card>
          )}

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
                    <th className="p-3 border-b">Date</th>
                    <th className="p-3 border-b">Status</th>
                    <th className="p-3 border-b text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
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
                        <td className="p-3 border-b">
                          {new Date(order.created_at).getFullYear()}-
                          {String(
                            new Date(order.created_at).getMonth() + 1
                          ).padStart(2, "0")}
                          -
                          {String(
                            new Date(order.created_at).getDate()
                          ).padStart(2, "0")}
                          ::
                          {String(
                            new Date(order.created_at).getHours()
                          ).padStart(2, "0")}
                          :
                          {String(
                            new Date(order.created_at).getMinutes()
                          ).padStart(2, "0")}
                        </td>
                        <td className="p-3 border-b">
                          <Button
                            onClick={() => confirm(order.id)}
                            className={`mx-2 mb-2 text-white 
      ${
        order.status === "Confirm"
          ? "bg-green-500 hover:bg-green-700"
          : "bg-red-500 hover:bg-red-700"
      }`}
                          >
                            {order.status}
                          </Button>
                        </td>
                        <td className="p-3 border-b text-center">
                          <Button
                            onClick={() => {
                              setOdDetail(true);
                              setOdId(order.id);
                            }}
                            className="bg-blue-500 text-white hover:bg-blue-700 mx-2 mb-2"
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
              <Pagination
                currentPage={orderPage}
                totalPage={orderTotalPage}
                onPageChange={setOrderPage}
              />
            </Card>
          )}
        </div>

        {/* Modals */}
        {showAddBook && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative z-10">
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
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative z-10">
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
                  bookList(currentPage);
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

        {odDetail && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative z-10">
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
      </main>
    </div>
    {alertMessage && <Alert message={alertMessage} type={alertType} />}
    </>
  );
}
