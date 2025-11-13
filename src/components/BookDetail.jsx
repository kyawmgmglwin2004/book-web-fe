import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function BookDetail() {
  const { id } = useParams(); 
  const [book, setBook] = useState(null);

  const fetchBookDetail = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/books/${id}`);
      setBook(res.data.data);
      console.log("detail :", res.data.data);
    } catch (error) {
      console.error("Error fetching book detail:", error);
    }
  };

  useEffect(() => {
    fetchBookDetail();
  }, [id]);

  if (!book) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-sm mx-auto mt-16 bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <div className="relative">
        <img 
          src={book.image} 
          alt={book.title} 
          className="w-full h-72 object-cover rounded-t-2xl"
        />
        <span className="absolute top-3 right-3 bg-pink-600 text-white text-sm px-3 py-1 rounded-full shadow-md">
          ${book.price}
        </span>
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900">{book.title}</h2>
        <p className="mt-4 text-gray-600">{book.remark || "No description available."}</p>
        <button className="mt-6 w-full bg-pink-600 text-white py-2 rounded-lg font-semibold hover:bg-pink-700 transition-colors">
          Buy Now
        </button>
      </div>
    </div>
  );
}
