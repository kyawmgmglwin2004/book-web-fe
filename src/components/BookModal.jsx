// src/components/BookModal.js
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Check } from "lucide-react";
import Slider from "react-slick";
import { NextArrow, PrevArrow } from "./slider/CustomArrows.jsx"; // Import custom arrows

// ✅ Updated Slider Settings
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false, // Often better to disable autoplay in modals
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

export default function BookModal({ book, isOpen, onClose, onAddToCart, isAdded }) {
  if (!book) return null;

  const handleAddClick = () => {
    onAddToCart(book);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <button className="absolute top-5 right-5 p-2 bg-gray-100 rounded-full z-10 hover:bg-gray-200 transition-colors" onClick={onClose}>
              <X size={24} className="text-gray-700" />
            </button>

            <div className="grid md:grid-cols-2 gap-8 p-8">
              {/* Image Slider with Custom Arrows */}
              <div className="rounded-2xl overflow-hidden">
                <Slider {...sliderSettings}>
                  {book.images.length > 0 ? (
                    book.images.map((img, index) => (
                      <img key={index} src={img} alt={book.title} className="w-full h-80 object-cover" />
                    ))
                  ) : (
                    <img src="/no-image.jpg" alt="no-img" className="w-full h-80 object-cover" />
                  )}
                </Slider>
              </div>

              {/* Book Details (Unchanged) */}
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">{book.title}</h2>
                  <p className="text-lg text-gray-500 mt-2">{book.type} • {book.age}+ years</p>
                  <p className="text-3xl font-bold text-indigo-600 mt-4">${book.price}</p>
                  <p className="text-gray-700 mt-4 leading-relaxed">{book.remark || "No description available."}</p>
                </div>

                <motion.button
                  onClick={handleAddClick}
                  disabled={isAdded}
                  className={`mt-6 w-full py-4 rounded-2xl font-bold text-white text-lg transition-all ${
                    isAdded ? "bg-green-500 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  {isAdded ? (
                    <span className="flex items-center justify-center gap-2">
                      <Check size={24} /> Added to Cart
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <ShoppingCart size={24} /> Add to Cart
                    </span>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}