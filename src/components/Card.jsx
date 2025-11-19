// src/components/Card.js (or BookGrid.js)
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";
import Pagination from "./Paginate";
import api from "../api";
import { motion } from "framer-motion";

// Import the new components
import BookCard from "./BookCard";
import BookModal from "./BookModal";

export default function BookGrid() {
  const [addedBooks, setAddedBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(8);
  const [selectedBook, setSelectedBook] = useState(null);

  const { addToCart } = useCart();
  const { searchQuery, searchType, searchAge } = useSearch();

  const handleAddToCart = (book) => {
    if (addedBooks.includes(book.id)) return;
    setAddedBooks((prev) => [...prev, book.id]);
    addToCart(book);
  };

  const fetchBooks = async (searchValue, searchType, searchAge) => {
    try {
      setLoading(true);
      const res = await api.get(
        `/books?page=${page}&limit=${limit}&type=${searchType}&age=${searchAge}&title=${encodeURIComponent(
          searchValue || ""
        )}`
      );
      if (res.code === 200 && Array.isArray(res.data?.data)) {
        setBooks(res.data.data);
        setTotalPages(res.data.pagination.totalPages);
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
    fetchBooks(searchQuery, searchType, searchAge);
  }, [page]);

  useEffect(() => {
    setPage(1);
    fetchBooks(searchQuery, searchType, searchAge);
  }, [searchQuery, searchType, searchAge]);

  // Framer Motion variants for the grid container
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8 rounded-2xl">
      {/* Modern Header */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <motion.h2 
          className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Our Lovely Books
        </motion.h2>
        <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
          Explore our collection of children’s favorites and timeless tales.
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
        </div>
      )}

      {/* No Books Found State */}
      {!loading && !books.length && (
        <div className="flex flex-col justify-center items-center min-h-[50vh] text-2xl text-gray-700">
          No books found 😢
          {searchQuery && (
            <p className="text-gray-500 text-base mt-2">
              (No results for “{searchQuery}”)
            </p>
          )}
        </div>
      )}

      {/* Books Grid */}
      {!loading && books.length > 0 && (
        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onAddToCart={handleAddToCart}
              onClick={setSelectedBook}
              isAdded={addedBooks.includes(book.id)}
              outOfStock={book.stock === 0}
            />
          ))}
        </motion.div>
      )}

      {/* Pagination */}
      {!loading && books.length > 0 && (
        <div className="mt-12 flex justify-center">
            <Pagination currentPage={page} totalPage={totalPages} onPageChange={setPage} />
        </div>
      )}

      {/* Book Modal */}
      <BookModal
        book={selectedBook}
        isOpen={!!selectedBook}
        onClose={() => setSelectedBook(null)}
        onAddToCart={handleAddToCart}
        isAdded={selectedBook ? addedBooks.includes(selectedBook.id) : false}
      />
    </section>
  );
}