import { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";
import Pagination from "./Paginate";

export default function Card() {
  const [addedBooks, setAddedBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(8);

  const [selectedBook, setSelectedBook] = useState(null); // ✅ modal state
  const { addToCart } = useCart();
  const { searchQuery } = useSearch();

  const handleAddToCart = (book) => {
    if (addedBooks.includes(book.id)) return;
    setAddedBooks((prev) => [...prev, book.id]);
    addToCart(book);
  };

  const fetchBooks = async (searchValue) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/api/v1/books?page=${page}&limit=${limit}&title=${encodeURIComponent(
          searchValue || ""
        )}`
      );

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

  useEffect(() => {
    fetchBooks(searchQuery);
  }, [page]);

  useEffect(() => {
    setPage(1);
    fetchBooks(searchQuery);
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-2xl text-gray-700">
        Loading...
      </div>
    );
  }

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

  return (
    <section className="bg-pink-50 py-16 px-4 sm:px-6 lg:px-8 mt-[0vh] rounded-lg relative">
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
    const outOfStock = book.stock === 0; // ✅ check stock
    return (
      <div
        key={book.id}
        onClick={() => setSelectedBook(book)} // can't open modal if out of stock
        className={`relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col cursor-pointer`}
      >
        <img
          src={book.image}
          alt={book.title}
          className="h-56 w-full object-cover"
        />
        {/* Out of Stock Badge */}
        {outOfStock && (
          <span className="absolute top-3 left-3 bg-red-700 text-white text-xs px-2 py-1 rounded-full font-semibold z-10">
            Out of Stock
          </span>
        )}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
          <div className="mt-auto flex items-center justify-between pt-4">
            <span className="text-pink-600 font-bold">${book.price}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!outOfStock) handleAddToCart(book);
              }}
              disabled={isAdded || outOfStock} // ✅ disable if added or out of stock
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                outOfStock
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : isAdded
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-pink-600 hover:bg-pink-700 text-white"
              }`}
            >
              {outOfStock ? "Out of Stock" : isAdded ? "Added" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    );
  })}
</div>


      <Pagination currentPage={page} totalPage={totalPages} onPageChange={setPage} />

      {/* Modal */}
      {selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Background blur */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setSelectedBook(null)}
          ></div>

          {/* Modal content */}
          <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-[90vw] p-9 z-10 overflow-y-auto max-h-[80vh]">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700  font-bold text-xl"
              onClick={() => setSelectedBook(null)}
            >
              &times;
            </button>
            <img
              src={selectedBook.image}
              alt={selectedBook.title}
              className="w-full h-64 object-cover rounded-lg"
            />
            <h2 className="text-2xl font-bold text-gray-900 mt-4">
              {selectedBook.title}
            </h2>
            <p className="text-pink-600 font-semibold mt-2">${selectedBook.price}</p>
            <p className="text-gray-600 mt-3">{selectedBook.remark || "No description."}</p>
            <button
              onClick={() => handleAddToCart(selectedBook)}
              className={`mt-6 w-full py-2 rounded-lg font-semibold text-white ${
                addedBooks.includes(selectedBook.id)
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-pink-600 hover:bg-pink-700"
              }`}
              disabled={addedBooks.includes(selectedBook.id)}
            >
              {addedBooks.includes(selectedBook.id) ? "Added" : "Add to Cart"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
