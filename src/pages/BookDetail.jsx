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
      console.log("detail :", res.data.data)
    } catch (error) {
      console.error("Error fetching book detail:", error);
    }
  };

  useEffect(() => {
    fetchBookDetail();
  }, [id]);

  if (!book) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-[400px] mx-auto p-6 bg-white rounded-xl shadow-lg mt-[-35vh]">
      <img src={book.image} alt={book.title} className="w-full rounded-lg" />
      <h2 className="text-2xl text-black font-bold mt-4">{book.title}</h2>
      <p className="text-pink-600 font-semibold mt-2">${book.price}</p>
      <p className="text-gray-600 mt-3">{book.remark || "No description."}</p>
    </div>
  );
}
