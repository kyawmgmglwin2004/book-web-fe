import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Card() {
  const [addedBooks, setAddedBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ added loading state
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // ✅ Add to cart handler
  const handleAddToCart = (book) => {
    if (addedBooks.includes(book.id)) return;

    const updatedBooks = [...addedBooks, book.id];
    setAddedBooks(updatedBooks);
    addToCart(book);
  };

  // ✅ Fetch books from API
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/v1/books");
      console.log("API Response Code:", res.data.code);

      if (res.data.code === 200 && Array.isArray(res.data.data)) {
        setBooks(res.data.data);
      } else {
        setBooks([]);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
    } finally {
      setLoading(false); // ✅ stop loading after fetch
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // ✅ 1. Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-2xl text-gray-700">
        Loading...
      </div>
    );
  }

  // ✅ 2. No books available
  if (!books.length) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-2xl text-gray-700">
        No books available 😢
      </div>
    );
  }

  // ✅ 3. Books available
  return (
    <section className="bg-pink-50 py-16 px-4 sm:px-6 lg:px-8 mt-[10vh] rounded-lg">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-pink-600">Our Lovely Books</h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Explore our collection of children’s favorites and timeless tales.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {books.map((book) => {
          const isAdded = addedBooks.includes(book.id);
          return (
            <div
              key={book.id}
              onClick={() => navigate(`/books/${book.id}`)}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col cursor-pointer"
            >
              <img
                src={book.image}
                alt={book.title}
                className="h-56 w-full object-cover"
              />
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">
                  {book.title}
                </h3>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <span className="text-pink-600 font-bold">${book.price}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(book);
                    }}
                    disabled={isAdded}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isAdded
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-pink-600 hover:bg-pink-700 text-white"
                    }`}
                  >
                    {isAdded ? "Added" : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
