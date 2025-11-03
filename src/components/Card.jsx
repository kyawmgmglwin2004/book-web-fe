import { useState } from "react";
export default function Card({ cartCount, setCartCount }) {
  const [addedBooks, setAddedBooks] = useState([]);

  const handleAddToCart = (bookId) => {
    setCartCount((prev) => prev + 1);
    setAddedBooks((prev) => [...prev, bookId]);
  };

  const books = [
    { id: 1, title: "The Very Hungry Caterpillar", author: "Eric Carle", price: 12.99, image: "https://images-na.ssl-images-amazon.com/images/I/81eB+7+CkUL.jpg" },
    { id: 2, title: "Goodnight Moon", author: "Margaret Wise Brown", price: 10.5, image: "https://images-na.ssl-images-amazon.com/images/I/81n0c0A6XPL.jpg" },
    { id: 3, title: "Guess How Much I Love You", author: "Sam McBratney", price: 14.25, image: "https://images-na.ssl-images-amazon.com/images/I/71+f0l0sEGL.jpg" },
    { id: 4, title: "Brown Bear, Brown Bear, What Do You See?", author: "Bill Martin Jr.", price: 11.75, image: "https://images-na.ssl-images-amazon.com/images/I/81h2gWPTYJL.jpg" },
  ];

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
                <p className="text-gray-500 text-sm mt-1">by {book.author}</p>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <span className="text-pink-600 font-bold">${book.price}</span>
                  <button
                    onClick={() => handleAddToCart(book.id)}
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

