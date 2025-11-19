// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import AddBook from "../components/AddBook.jsx";
// import EditBook from "../components/EditBook.jsx";
// import OrderDetail from "../components/OrderDeatail.jsx";
// import Pagination from "../components/Paginate.jsx";
// import Alert from "../components/Alert.jsx";
// import api from "../api";

// export default function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState("books");
//   const [books, setBooks] = useState([]);
//   const [editBook, setEditBook] = useState(false);
//   const [showAddBook, setShowAddBook] = useState(false);
//   const [odDetail, setOdDetail] = useState(false);
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [id, setId] = useState(null);
//   const [odId, setOdId] = useState(null);
//   const [orders, setOrders] = useState([]);
//   const [orderTotalPage, setOrderTotalPage] = useState(0);
//   const [totalPage, setTotalPage] = useState(1);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [orderPage, setOrderPage] = useState(1);
//   const [booksPerPage] = useState(10);
//   const [ordersPerPage] = useState(10);
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();
//   const [orderStatus, setOrderStatus] = useState("Pending");
//   const [alertMessage, setAlertMessage] = useState(null);
//   const [alertType, setAlertType] = useState(null);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const bookList = async (page = 1) => {
//     try {

//       const res = await api.get(`/books?page=${page}&limit=${booksPerPage}&title=${encodeURIComponent(
//         searchQuery || ""
//       )}`); 
//       console.log("Books fetched:", res);

//       if (res.code === 200) {
//         setBooks(res.data.data);
//         setTotalPage(res.data.pagination.totalPages);
//       }else if(res.code === 404){
//         setAlertMessage("No books found");
//         setAlertType("error");
//         setBooks([]);
//       } 
//       else {
//         setAlertMessage("Failed to fetch books");
//         setAlertType("error");
//         setBooks([]);
//         setTotalPage(1);
//       }

//     } catch (error) {
//       setAlertMessage("❌ Failed to fetch books");
//       setAlertType("error");
//       console.error(error);
//       setBooks([]);
//     }
//   };

//   const confirm = async (id) => {
//     try {

//       const newStatus = orderStatus === "Pending" ? "Confirm" : "Pending";

//       const data = { status: newStatus };
//       const res = await api.post(`/orderList/orders/${id}`, data);

//       if (res.code === 200) {
//         setOrderStatus(newStatus);
//         setAlertMessage(`Order status updated to ${newStatus} successfully!`);
//         setAlertType("success");
//         orderList();
//       } else {
//         setAlertMessage("Failed to update order status");
//         setAlertType("error");
//       }
//     } catch (error) {
//       console.error(error);
//       setAlertMessage("❌ Failed to update order status");
//       setAlertType("error");
//     }
//   };

//   // Fetch orders
//   const orderList = async (page = 1) => {
//     try {
      
//       const res = await api.get(`/orderList/orders?page=${page}&limit=${ordersPerPage}`);
//       console.log("Orders fetched:", res);
//       if (res.code === 200) {
//         setOrders(res.data.data);
//         setOrderTotalPage(res.data.pagination.totalPages);
//       }else if(res.code === 404){
//         setAlertMessage("No orders found");
//         setAlertType("error");
//         setOrders([]);
//         setOrderTotalPage(1);
//       } 
//       else {
//         setAlertMessage("Failed to fetch orders");
//         setAlertType("error");
//         setOrders([]);
//         setOrderTotalPage(1);
//       }
//     } catch (error) {
//       setAlertMessage("❌ Failed to fetch orders");
//       setAlertType("error");
//       setOrders([]);
//       console.error(error);
//     }
//   };

  
//   const handleDeleteBook = async (id) => {
//     try {
    
//       const res = await api.delete(`/books/${id}`);
      
//       if (res.code === 200) {
//         setAlertMessage("Book deleted successfully!");
//         setAlertType("success");
//         bookList(currentPage);
//       } else {
//         setAlertMessage("Failed to delete book");
//         setAlertType("error");
//       }
//     } catch (error) {
//       console.error(error);
//       setAlertMessage("❌ Failed to delete book");
//       setAlertType("error");
//     }
//   };

//   const handleDeleteOrder = async (id) => {
//     try {
     
//       const res = await api.delete(`/orderList/orders/${id}`);
      
//       if (res.code === 200) {
//         setAlertMessage("Order deleted successfully!");
//         setAlertType("success");
//         orderList();
//       } else {
//         setAlertMessage("Failed to delete order");
//         setAlertType("error");
//       }
//     } catch (error) {
//       console.error(error);
//       setAlertMessage("❌ Failed to delete order");
//       setAlertType("error");
//     }
//   };
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/admin");
//   }

//   useEffect(() => {
//     if(alertMessage){
//       const timer = setTimeout(() => {
//         setAlertMessage(null);
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [alertMessage]);

//   useEffect(() => {
//     bookList(currentPage);
//   }, [currentPage, searchQuery]);
//   useEffect(() => {
//   if (activeTab === "orders") {
//     orderList(orderPage);
//   }
// }, [activeTab, orderPage]);

//   const Button = ({ children, className, ...props }) => (
//     <button
//       {...props}
//       className={`px-4 py-2 rounded-lg font-semibold transition-all ${className}`}
//     >
//       {children}
//     </button>
//   );

//   const Card = ({ children, className }) => (
//     <div className={`bg-white shadow-md rounded-2xl p-6 ${className}`}>
//       {children}
//     </div>
//   );

//   const isModalOpen = showAddBook || editBook || odDetail;

//   return (
//     <>
//     <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">

//       {/* Mobile overlay when sidebar open */}
//       <AnimatePresence>
//         {sidebarOpen && (
//           <motion.div
//             className="fixed inset-0 z-30 bg-black/40 md:hidden"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setSidebarOpen(false)}
//           />
//         )}
//       </AnimatePresence>

//       {/* Mobile topbar */}
//       <div className="md:hidden w-full bg-white shadow-sm flex items-center justify-between px-3 py-2">
//         <button
//           onClick={() => setSidebarOpen(true)}
//           className="p-2 rounded-md text-secondary"
//           aria-label="Open menu"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//           </svg>
//         </button>
//         <div className="font-semibold text-lg text-secondary">Admin</div>
//         <div className="w-8" />
//       </div>
    
//       {/* Desktop sidebar (always visible on md+) */}
//       <aside className="hidden md:flex w-64 bg-secondary text-white flex-col p-6">
//         <h2 className="text-2xl font-bold mb-8 text-center md:text-left">Admin Tools</h2>
//         <nav className="flex flex-col gap-3">
//           <button
//             onClick={() => setActiveTab("books")}
//             className={`text-left px-4 py-2 rounded-lg transition ${
//               activeTab === "books"
//                 ? "bg-white text-secondary font-bold"
//                 : "hover:bg-secondary"
//             }`}
//           >
//             📚 Book Management
//           </button>
//           <button
//             onClick={() => setActiveTab("orders")}
//             className={`text-left px-4 py-2 rounded-lg transition ${
//               activeTab === "orders"
//                 ? "bg-white text-secondary font-bold"
//                 : "hover:bg-white hover:text-secondary hover:font-bold"
//             }`}
//           >
//             🧾 Order Management
//           </button>
//            <button
//             onClick={() => navigate("/")}
//             className={`text-left px-4 py-2 rounded-lg transition
//                 bg-secondary text-white 
//                 hover:bg-white hover:text-secondary hover:font-bold`}
//           >
//             <i className="fa-regular fa-hand-point-left me-4"></i>
//           Go to User View
//           </button>
//           <button
//             onClick={handleLogout}
//             className={`text-left px-4 py-2 rounded-lg transition
//                 bg-secondary text-white 
//                 hover:bg-white hover:text-secondary hover:font-bold`}
//           >
//             <i class="fa-solid fa-right-from-bracket me-4"></i>
//           Logout
//           </button>

//         </nav>
//         <div className="mt-auto text-center text-sm text-secondary">
//           © 2025 Admin Panel
//         </div>
//       </aside>

//       {/* Mobile sidebar (slide-in) */}
//       <AnimatePresence>
//         {sidebarOpen && (
//           <motion.aside
//             className="fixed z-40 inset-y-0 left-0 w-64 bg-secondary text-white flex flex-col p-6 md:hidden"
//             initial={{ x: -300 }}
//             animate={{ x: 0 }}
//             exit={{ x: -300 }}
//             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//           >
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-2xl font-bold">Admin Tools</h2>
//               <button onClick={() => setSidebarOpen(false)} className="p-2 text-white">✖</button>
//             </div>
//             <nav className="flex flex-col gap-3">
//               <button
//                 onClick={() => { setActiveTab("books"); setSidebarOpen(false); }}
//                 className={`text-left px-4 py-2 rounded-lg transition ${
//                   activeTab === "books"
//                     ? "bg-white text-secondary font-bold"
//                     : "hover:bg-secondary"
//                 }`}
//               >
//                 📚 Book Management
//               </button>
//               <button
//                 onClick={() => { setActiveTab("orders"); setSidebarOpen(false); }}
//                 className={`text-left px-4 py-2 rounded-lg transition ${
//                   activeTab === "orders"
//                     ? "bg-white text-secondary font-bold"
//                     : "hover:bg-white hover:text-secondary hover:font-bold"
//                 }`}
//               >
//                 🧾 Order Management
//               </button>
//               <button
//                 onClick={() => { navigate("/"); setSidebarOpen(false); }}
//                 className={`text-left px-4 py-2 rounded-lg transition bg-secondary text-white hover:bg-white hover:text-secondary hover:font-bold`}
//               >
//                 <i className="fa-regular fa-hand-point-left me-4"></i>
//               Go to User View
//               </button>
//               <button
//                 onClick={() => { handleLogout(); setSidebarOpen(false); }}
//                 className={`text-left px-4 py-2 rounded-lg transition bg-secondary text-white hover:bg-white hover:text-secondary hover:font-bold`}
//               >
//                 <i className="fa-solid fa-right-from-bracket me-4"></i>
//               Logout
//               </button>
//             </nav>
//             <div className="mt-auto text-center text-sm text-secondary">© 2025 Admin Panel</div>
//           </motion.aside>
//         )}
//       </AnimatePresence>

//       <main className="flex-1 p-8 relative">
       
//         <div
//           className={`transition-all duration-300 ${
//             isModalOpen ? "blur-sm" : ""
//           }`}
//         >
//           {activeTab === "books" && (
//             <Card>
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-2xl font-semibold text-secondary">
//                   📘 Book Management
//                 </h2>
//                 {/* <input
//                   value={searchQuery}
//                   type="search"
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Search books..."
//                   className=" border border-secondary rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
//                 /> */}
//                 <Button
//                   onClick={() => setShowAddBook(true)}
//                   className="bg-secondary text-white hover:bg-primary"
//                 >
//                   ➕ Add New Book
//                 </Button>
//               </div>
//               <div className="overflow-x-auto">
//                 <table className="hidden md:table w-full text-left border-collapse">
//                   <thead>
//                     <tr className="bg-blue-100 text-secondary">
//                       <th className="p-3 border-b">Title</th>
//                       <th className="p-3 border-b">Image</th>
//                       <th className="p-3 border-b">Price ($)</th>
//                       <th className="p-3 border-b">Stock</th>
//                       <th className="p-3 border-b">Remark</th>
//                       <th className="p-3 border-b text-center">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {books.map((book) => (
//                       <tr key={book.id} className="hover:bg-blue-100">
//                         <td className="p-3 border-b text-secondary">
//                           {book.title}
//                         </td>
//                         <td>
//                           <img
//                             src={book.images[0]}
//                             alt={book.title}
//                             className="w-16 h-16 object-cover rounded-md"
//                           />
//                         </td>
//                         <td className="p-3 border-b text-gray-600">
//                           {book.price}
//                         </td>
//                         <td className="p-3 border-b text-neutral-600">
//                           {book.stock}
//                         </td>
//                         <td className="p-3 border-b text-gray-600">
//                           {book.remark}
//                         </td>
//                         <td className="p-3 border-b text-center">
//                           <Button
//                             onClick={() => {
//                               setEditBook(true);
//                               setId(book.id);
//                               setSelectedBook(book);
//                             }}
//                             className="bg-blue-500 text-white hover:bg-blue-700 mx-2 mb-2"
//                           >
//                             Edit
//                           </Button>
//                           <Button
//                             onClick={() => handleDeleteBook(book.id)}
//                             className="bg-red-500 text-white hover:bg-red-700 mx-2"
//                           >
//                             Delete
//                           </Button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>

//                 {/* Mobile book cards */}
//                 <div className="md:hidden grid gap-4">
//                   {books.map((book) => (
//                     <div key={book.id} className="bg-white p-4 rounded-xl shadow-sm">
//                       <div className="flex gap-3">
//                         <img src={book.images[0]} alt={book.title} className="w-20 h-20 object-cover rounded-md" />
//                         <div className="flex-1">
//                           <div className="flex justify-between items-start">
//                             <h3 className="font-semibold text-secondary">{book.title}</h3>
//                             <div className="text-sm text-gray-600">${book.price}</div>
//                           </div>
//                           <p className="text-sm text-gray-500 mt-1">{book.remark}</p>
//                           <div className="mt-3 flex gap-2">
//                             <button onClick={() => { setEditBook(true); setId(book.id); setSelectedBook(book); }} className="flex-1 bg-blue-500 text-white px-3 py-2 rounded">Edit</button>
//                             <button onClick={() => handleDeleteBook(book.id)} className="flex-1 bg-red-500 text-white px-3 py-2 rounded">Delete</button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <Pagination
//                 currentPage={currentPage}
//                 totalPage={totalPage}
//                 onPageChange={setCurrentPage}
//               />
//             </Card>
//           )}

//           {activeTab === "orders" && (
//             <Card>
//               <h2 className="text-2xl font-semibold text-secondary mb-4">
//                 🧾 Order Management
//               </h2>
//               <div className="overflow-x-auto">
//                 <table className="hidden md:table w-full text-left border-collapse">
//                 <thead>
//                   <tr className="bg-blue-100 text-secondary">
//                     <th className="p-3 border-b">Order ID</th>
//                     <th className="p-3 border-b">Customer</th>
//                     <th className="p-3 border-b">Phone</th>
//                     <th className="p-3 border-b">Total ($)</th>
//                     <th className="p-3 border-b">Date</th>
//                     <th className="p-3 border-b">Status</th>
//                     <th className="p-3 border-b text-center">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {orders.length === 0 ? (
//                     <tr>
//                       <td
//                         colSpan="6"
//                         className="text-center py-6 text-gray-600 text-lg"
//                       >
//                         😢 No orders available
//                       </td>
//                     </tr>
//                   ) : (
//                     orders.map((order) => (
//                       <tr key={order.id} className="hover:bg-blue-100">
//                         <td className="p-3 border-b">{order.id}</td>
//                         <td className="p-3 border-b">{order.name}</td>
//                         <td className="p-3 border-b">{order.phone}</td>
//                         <td className="p-3 border-b">${order.total}</td>
//                         <td className="p-3 border-b">
//                           {new Date(order.created_at).getFullYear()}-
//                           {String(
//                             new Date(order.created_at).getMonth() + 1
//                           ).padStart(2, "0")}
//                           -
//                           {String(
//                             new Date(order.created_at).getDate()
//                           ).padStart(2, "0")}
//                           ::
//                           {String(
//                             new Date(order.created_at).getHours()
//                           ).padStart(2, "0")}
//                           :
//                           {String(
//                             new Date(order.created_at).getMinutes()
//                           ).padStart(2, "0")}
//                         </td>
//                         <td className="p-3 border-b">
//                           <Button
//                             onClick={() => confirm(order.id)}
//                             className={`mx-2 mb-2 text-white 
//       ${
//         order.status === "Confirm"
//           ? "bg-green-500 hover:bg-green-700"
//           : "bg-red-500 hover:bg-red-700"
//       }`}
//                           >
//                             {order.status}
//                           </Button>
//                         </td>
//                         <td className="p-3 border-b text-center">
//                           <Button
//                             onClick={() => {
//                               setOdDetail(true);
//                               setOdId(order.id);
//                             }}
//                             className="bg-blue-500 text-white hover:bg-blue-700 mx-2 mb-2"
//                           >
//                             View
//                           </Button>
//                           <Button
//                             onClick={() => handleDeleteOrder(order.id)}
//                             className="bg-red-500 text-white hover:bg-red-700 mx-2"
//                           >
//                             Delete
//                           </Button>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//               {/* Mobile order cards */}
//               <div className="md:hidden grid gap-4">
//                 {orders.map((order) => (
//                   <div key={order.id} className="bg-white p-4 rounded-xl shadow-sm">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <div className="font-semibold">Order #{order.id}</div>
//                         <div className="text-sm text-gray-600">{order.name} · {order.phone}</div>
//                       </div>
//                       <div className="text-right">
//                         <div className="font-semibold">${order.total}</div>
//                         <div className="text-xs text-gray-500">{new Date(order.created_at).toLocaleString()}</div>
//                       </div>
//                     </div>
//                     <div className="mt-3 flex gap-2">
//                       <button onClick={() => confirm(order.id)} className={`flex-1 ${order.status === 'Confirm' ? 'bg-green-500' : 'bg-red-500'} text-white px-3 py-2 rounded`}>{order.status}</button>
//                       <button onClick={() => { setOdDetail(true); setOdId(order.id); }} className="flex-1 bg-blue-500 text-white px-3 py-2 rounded">View</button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               </div>
//               <Pagination
//                 currentPage={orderPage}
//                 totalPage={orderTotalPage}
//                 onPageChange={setOrderPage}
//               />
//             </Card>
//           )}
//         </div>

//         {/* Modals */}
//         <AnimatePresence>
//           {showAddBook && (
//             <motion.div className="fixed inset-0 z-50 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//               <motion.div className="absolute inset-0 bg-black bg-opacity-30" initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} onClick={() => setShowAddBook(false)} />
//               <motion.div className="bg-white p-6 rounded-xl shadow-xl w-[90vw] max-w-md relative z-10" initial={{ y: 20, scale: 0.98, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 10, scale: 0.98, opacity: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 30 }}>
//                 <button
//                   onClick={() => setShowAddBook(false)}
//                   className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl"
//                 >
//                   ✖
//                 </button>
//                 <AddBook
//                   onSuccess={() => {
//                     setShowAddBook(false);
//                     bookList(currentPage);
//                   }}
//                   onCancel={() => setShowAddBook(false)}
//                 />
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <AnimatePresence>
//           {editBook && (
//             <motion.div className="fixed inset-0 z-50 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//               <motion.div className="absolute inset-0 bg-black bg-opacity-30" initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} onClick={() => setEditBook(false)} />
//               <motion.div className="bg-white p-6 rounded-xl shadow-xl w-[90vw] max-w-md relative z-10" initial={{ y: 20, scale: 0.98, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 10, scale: 0.98, opacity: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 30 }}>
//                 <button
//                   onClick={() => setEditBook(false)}
//                   className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl"
//                 >
//                   ✖
//                 </button>
//                 <EditBook
//                   id={id}
//                   book={selectedBook}
//                   onSuccess={() => {
//                     setEditBook(false);
//                     setId(null);
//                     setSelectedBook(null);
//                     bookList(currentPage);
//                   }}
//                   onCancel={() => {
//                     setEditBook(false);
//                     setId(null);
//                     setSelectedBook(null);
//                   }}
//                 />
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <AnimatePresence>
//           {odDetail && (
//             <motion.div className="fixed inset-0 z-50 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//               <motion.div className="absolute inset-0 bg-black bg-opacity-30" initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} onClick={() => setOdDetail(false)} />
//               <motion.div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative z-10" initial={{ y: 20, scale: 0.98, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 10, scale: 0.98, opacity: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 30 }}>
//                 <button
//                   onClick={() => setOdDetail(false)}
//                   className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl"
//                 >
//                   ✖
//                 </button>
//                 <OrderDetail id={odId} />
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </main>
//     </div>
//     {alertMessage && <Alert message={alertMessage} type={alertType} />}
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
// Icons
import {
  BookOpenIcon,
  ShoppingBagIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ArrowLeftOnRectangleIcon,
  PlusCircleIcon,
  XMarkIcon,
  Bars3Icon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleSolidIcon } from "@heroicons/react/24/solid";

// Import your components
import AddBook from "../components/AddBook.jsx";
import EditBook from "../components/EditBook.jsx";
import OrderDetail from "../components/OrderDeatail.jsx";
import Pagination from "../components/Paginate.jsx";
import Alert from "../components/Alert.jsx";
import api from "../api";

// --- Main Component ---
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
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // --- API Functions (no changes in logic) ---
  const bookList = async (page = 1) => {
    try {
      const res = await api.get(`/books?page=${page}&limit=${booksPerPage}&title=${encodeURIComponent(searchQuery || "")}`);
      if (res.code === 200) {
        setBooks(res.data.data);
        setTotalPage(res.data.pagination.totalPages);
      } else {
        setAlertMessage(res.message || "Failed to fetch books");
        setAlertType("error");
        setBooks([]);
        setTotalPage(1);
      }
    } catch (error) {
      setAlertMessage("❌ Failed to fetch books");
      setAlertType("error");
      setBooks([]);
    }
  };

  const confirm = async (id) => {
    try {
      const newStatus = orders.find(o => o.id === id).status === "Pending" ? "Confirm" : "Pending";
      const data = { status: newStatus };
      const res = await api.post(`/orderList/orders/${id}`, data);
      if (res.code === 200) {
        setAlertMessage(`Order status updated to ${newStatus}!`);
        setAlertType("success");
        orderList(orderPage);
      } else {
        setAlertMessage("Failed to update order status");
        setAlertType("error");
      }
    } catch (error) {
      setAlertMessage("❌ Failed to update order status");
      setAlertType("error");
    }
  };

  const orderList = async (page = 1) => {
    try {
      const res = await api.get(`/orderList/orders?page=${page}&limit=${ordersPerPage}`);
      if (res.code === 200) {
        setOrders(res.data.data);
        setOrderTotalPage(res.data.pagination.totalPages);
      } else {
        setAlertMessage(res.message || "Failed to fetch orders");
        setAlertType("error");
        setOrders([]);
        setOrderTotalPage(1);
      }
    } catch (error) {
      setAlertMessage("❌ Failed to fetch orders");
      setAlertType("error");
      setOrders([]);
    }
  };

  const handleDeleteBook = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
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
      setAlertMessage("❌ Failed to delete book");
      setAlertType("error");
    }
  };

  const handleDeleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      const res = await api.delete(`/orderList/orders/${id}`);
      if (res.code === 200) {
        setAlertMessage("Order deleted successfully!");
        setAlertType("success");
        orderList(orderPage);
      } else {
        setAlertMessage("Failed to delete order");
        setAlertType("error");
      }
    } catch (error) {
      setAlertMessage("❌ Failed to delete order");
      setAlertType("error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin");
  };

  // --- Effects ---
  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => setAlertMessage(null), 5000);
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

  // --- Sub-Components for better structure ---
  const Sidebar = ({ isMobile }) => (
    <aside className={`${isMobile ? 'fixed inset-y-0 left-0 z-40' : 'hidden md:flex'} w-64 bg-slate-900 text-slate-300 flex-col p-6 transform transition-transform duration-300 ease-in-out ${isMobile && !sidebarOpen ? '-translate-x-full' : ''}`}>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
        {isMobile && <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-md hover:bg-slate-700"><XMarkIcon className="h-6 w-6" /></button>}
      </div>
      <nav className="flex-1 flex flex-col gap-2">
        <NavItem icon={<BookOpenIcon />} label="Book Management" isActive={activeTab === "books"} onClick={() => { setActiveTab("books"); setSidebarOpen(false); }} />
        <NavItem icon={<ShoppingBagIcon />} label="Order Management" isActive={activeTab === "orders"} onClick={() => { setActiveTab("orders"); setSidebarOpen(false); }} />
      </nav>
      <div className="border-t border-slate-700 pt-4 mt-4">
        <NavItem icon={<ArrowLeftOnRectangleIcon />} label="Go to User View" onClick={() => { navigate("/"); setSidebarOpen(false); }} />
        <NavItem icon={<ArrowLeftOnRectangleIcon />} label="Logout" onClick={() => { handleLogout(); setSidebarOpen(false); }} />
      </div>
    </aside>
  );

  const NavItem = ({ icon, label, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
        ? "bg-indigo-600 text-white shadow-lg"
        : "text-slate-400 hover:bg-slate-800 hover:text-white"
      }`}
    >
      {React.cloneElement(icon, { className: "h-5 w-5" })}
      <span className="font-medium">{label}</span>
    </button>
  );

  const MobileTopBar = () => (
    <div className="md:hidden w-full bg-white/80 backdrop-blur-md shadow-sm flex items-center justify-between px-4 py-3 sticky top-0 z-30">
      <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-md text-slate-600 hover:bg-slate-100">
        <Bars3Icon className="h-6 w-6" />
      </button>
      <div className="font-semibold text-lg text-slate-800">Admin</div>
      <div className="w-8" />
    </div>
  );

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar for Desktop */}
      <Sidebar isMobile={false} />
      
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>{sidebarOpen && <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />}</AnimatePresence>
      
      {/* Sidebar for Mobile */}
      <AnimatePresence>{sidebarOpen && <motion.aside initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}><Sidebar isMobile={true} /></motion.aside>}</AnimatePresence>

      <div className="flex-1 flex flex-col overflow-hidden">
        <MobileTopBar />
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8 lg:p-12">
            <motion.div
              key={activeTab}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              {activeTab === "books" && <BooksManagement />}
              {activeTab === "orders" && <OrdersManagement />}
            </motion.div>
          </div>
        </main>
      </div>

      {/* Modals */}
      <Modal isOpen={showAddBook} onClose={() => setShowAddBook(false)}><AddBook onSuccess={() => { setShowAddBook(false); bookList(currentPage); }} onCancel={() => setShowAddBook(false)} /></Modal>
      <Modal isOpen={editBook} onClose={() => setEditBook(false)}><EditBook id={id} book={selectedBook} onSuccess={() => { setEditBook(false); bookList(currentPage); }} onCancel={() => setEditBook(false)} /></Modal>
      <Modal isOpen={odDetail} onClose={() => setOdDetail(false)}><OrderDetail id={odId} /></Modal>

      {alertMessage && <Alert message={alertMessage} type={alertType} />}
    </div>
  );

  // --- Books Management Sub-Component ---
  function BooksManagement() {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-3xl font-bold text-slate-800">📘 Book Management</h2>
          <button onClick={() => setShowAddBook(true)} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700 transition-colors">
            <PlusCircleIcon className="h-5 w-5" /> Add New Book
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full">
            <thead><tr className="border-b border-slate-200">
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Title</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Image</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Price</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Stock</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Remark</th>
              <th className="text-center py-3 px-4 font-semibold text-slate-700">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-200">
              {books.map((book) => (
                <tr key={book.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4 text-slate-800">{book.title}</td>
                  <td className="py-4 px-4"><img src={book.images[0]} alt={book.title} className="h-16 w-16 object-cover rounded-lg shadow-sm" /></td>
                  <td className="py-4 px-4 text-slate-600">${book.price}</td>
                  <td className="py-4 px-4 text-slate-600">{book.stock}</td>
                  <td className="py-4 px-4 text-slate-600 text-sm">{book.remark}</td>
                  <td className="py-4 px-4">
                    <div className="flex justify-center gap-2">
                      <ActionButton icon={<PencilIcon />} onClick={() => { setEditBook(true); setId(book.id); setSelectedBook(book); }} color="blue" />
                      <ActionButton icon={<TrashIcon />} onClick={() => handleDeleteBook(book.id)} color="red" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden grid gap-4">
          {books.map((book) => (
            <div key={book.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
              <div className="flex gap-4">
                <img src={book.images[0]} alt={book.title} className="h-20 w-20 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800">{book.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">{book.remark}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="font-bold text-indigo-600">${book.price}</span>
                    <div className="flex gap-2">
                      <ActionButton icon={<PencilIcon />} onClick={() => { setEditBook(true); setId(book.id); setSelectedBook(book); }} color="blue" />
                      <ActionButton icon={<TrashIcon />} onClick={() => handleDeleteBook(book.id)} color="red" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Pagination currentPage={currentPage} totalPage={totalPage} onPageChange={setCurrentPage} />
      </div>
    );
  }

  // --- Orders Management Sub-Component ---
  function OrdersManagement() {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-6">🧾 Order Management</h2>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full">
            <thead><tr className="border-b border-slate-200">
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Order ID</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Customer</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Total</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Date</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
              <th className="text-center py-3 px-4 font-semibold text-slate-700">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-200">
              {orders.length === 0 ? <tr><td colSpan="6" className="text-center py-8 text-slate-500">No orders available</td></tr> :
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4 font-mono text-slate-800">#{order.id}</td>
                    <td className="py-4 px-4"><div><p className="font-medium text-slate-800">{order.name}</p><p className="text-sm text-slate-500">{order.phone}</p></div></td>
                    <td className="py-4 px-4 font-semibold text-slate-800">${order.total}</td>
                    <td className="py-4 px-4 text-slate-600">{new Date(order.created_at).toLocaleDateString()}</td>
                    <td className="py-4 px-4">
                      <button onClick={() => confirm(order.id)} className={`px-3 py-1 rounded-full text-xs font-semibold leading-tight ${order.status === 'Confirm' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                        {order.status}
                      </button>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex justify-center gap-2">
                        <ActionButton icon={<EyeIcon />} onClick={() => { setOdDetail(true); setOdId(order.id); }} color="indigo" />
                        <ActionButton icon={<TrashIcon />} onClick={() => handleDeleteOrder(order.id)} color="red" />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden grid gap-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-semibold text-slate-800">Order #{order.id}</div>
                  <div className="text-sm text-slate-600">{order.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-800">${order.total}</div>
                  <div className="text-xs text-slate-500">{new Date(order.created_at).toLocaleDateString()}</div>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <ActionButton icon={<EyeIcon />} onClick={() => { setOdDetail(true); setOdId(order.id); }} color="indigo" />
                <ActionButton icon={<TrashIcon />} onClick={() => handleDeleteOrder(order.id)} color="red" />
              </div>
            </div>
          ))}
        </div>

        <Pagination currentPage={orderPage} totalPage={orderTotalPage} onPageChange={setOrderPage} />
      </div>
    );
  }

  // --- Reusable Components ---
  function ActionButton({ icon, onClick, color }) {
    const colorClasses = {
      blue: "bg-blue-500 hover:bg-blue-600",
      red: "bg-red-500 hover:bg-red-600",
      indigo: "bg-indigo-500 hover:bg-indigo-600",
      green: "bg-green-500 hover:bg-green-600",
    };
    return (
      <button onClick={onClick} className={`p-2 rounded-lg text-white shadow-md transition-all ${colorClasses[color]}`}>
        {React.cloneElement(icon, { className: "h-5 w-5" })}
      </button>
    );
  }

  function Modal({ isOpen, onClose, children }) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <motion.div className="relative bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
              <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors">
                <XMarkIcon className="h-5 w-5 text-slate-600" />
              </button>
              <div className="p-6">
                {children}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
}
