import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";

export default function Card() {
  const [addedBooks, setAddedBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(8);

  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { searchQuery } = useSearch(); // ✅ global search state

  // ✅ Add to cart handler
  const handleAddToCart = (book) => {
    if (addedBooks.includes(book.id)) return;
    setAddedBooks((prev) => [...prev, book.id]);
    addToCart(book);
  };

  // ✅ Fetch books from API (with pagination + search)
  const fetchBooks = async (searchValue) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:5000/api/v1/books?page=${page}&limit=${limit}&title=${encodeURIComponent(
          searchValue || ""
        )}`
      );

      console.log("📚 API Response:", res.data);

      if (res.data.code === 200 && Array.isArray(res.data.data?.data)) {
        setBooks(res.data.data.data);
        setTotalPages(res.data.data.pagination.totalPages);
      } else if (res.data.code === 200 && Array.isArray(res.data.data)) {
        setBooks(res.data.data);
        setTotalPages(1);
      } else {
        setBooks([]);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Initial fetch
  useEffect(() => {
    fetchBooks(searchQuery);
  }, [page]); // only page changes trigger

  // ✅ Refetch only when global search changes (not page)
  useEffect(() => {
    // reset to first page when search changes
    setPage(1);
    fetchBooks(searchQuery);
  }, [searchQuery]); // only search changes trigger

  // ✅ Loading
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-2xl text-gray-700">
        Loading...
      </div>
    );
  }

  // ✅ No books
  if (!books.length) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[50vh] text-2xl text-gray-700">
        No books found 😢
        {searchQuery && (
          <p className="text-gray-500 text-base mt-2">
            (No results for “{searchQuery}”)
          </p>
        )}
      </div>
    );
  }

  // ✅ Display books
  return (
    <section className="bg-pink-50 py-16 px-4 sm:px-6 lg:px-8 mt-[0vh] rounded-lg">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-pink-600">Our Lovely Books</h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Explore our collection of children’s favorites and timeless tales.
        </p>
      </div>

      {/* Books grid */}
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

      {/* Pagination */}
      <div className="flex justify-center items-center mt-10 gap-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>

        <span className="font-semibold text-gray-700">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
}
