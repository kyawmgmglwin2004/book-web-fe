import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Card() {
  const [addedBooks, setAddedBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const { addToCart, cartBooks } = useCart();

  // ✅ Add to cart handler
  const handleAddToCart = (book) => {
    if (addedBooks.includes(book.id)) return;

    // update local added state to disable button UI
    const updatedBooks = [...addedBooks, book.id];
    setAddedBooks(updatedBooks);

    // add to global cart context
    addToCart(book);

    // go to cart page to show chosen list as requested
    // navigate('/addToCart');

    // localStorage.setItem("cartCount", newCount);
    // localStorage.setItem("addedBooks", JSON.stringify(updatedBooks));
  };

  // ✅ Load saved data when page refreshes
//   useEffect(() => {
//   try {
//     const savedBooks = localStorage.getItem("addedBooks");
//     const savedCount = localStorage.getItem("cartCount");

//     if (savedBooks && savedBooks !== "undefined") {
//       setAddedBooks(JSON.parse(savedBooks));
//     }

//     if (savedCount && savedCount !== "undefined") {
//       setCartCount(Number(savedCount));
//     }
//   } catch (error) {
//     console.error("Error parsing localStorage data:", error);
//     localStorage.removeItem("addedBooks"); // corrupted data delete
//     localStorage.removeItem("cartCount");
//   }
// }, []);


  // ✅ Fetch books from API
  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/books");
      setBooks(res.data.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <section className="bg-pink-50 py-16 px-4 sm:px-6 lg:px-8 rounded-lg">
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
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col"
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
                      e.stopPropagation(); // prevent triggering navigate()
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
