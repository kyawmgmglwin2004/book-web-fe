// src/components/BookCard.js
import { motion } from "framer-motion";
import { useState } from "react";
import { ShoppingCart, Eye, Check } from "lucide-react";
import Slider from "react-slick";
import { NextArrow, PrevArrow } from "./slider/CustomArrows.jsx"; // Import custom arrows

export default function BookCard({ book, onAddToCart, onClick, isAdded, outOfStock }) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddClick = async (e) => {
    e.stopPropagation();
    if (isAdded || outOfStock) return;
    
    setIsAdding(true);
    await onAddToCart(book);
    setTimeout(() => setIsAdding(false), 600);
  };

  // ✅ Updated Slider Settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <NextArrow />, // Use custom arrows
    prevArrow: <PrevArrow />, // Use custom arrows
  };

  return (
    <motion.div
      layout
      onClick={() => onClick(book)}
      className="group relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl"
      whileHover={{ y: -8 }}
    >
      {/* Image Container with Slider */}
      <div className="relative h-72 overflow-hidden">
        <Slider {...sliderSettings}>
          {book.images.length > 0 ? (
            book.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            ))
          ) : (
            <img
              src="/no-image.jpg"
              alt={book.title}
              className="w-full h-full object-cover"
            />
          )}
        </Slider>
        
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
            <p className="text-white text-sm font-semibold flex items-center gap-2">
                <Eye size={18} /> View Details
            </p>
        </div>

        {/* Out of Stock Badge */}
        {outOfStock && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-20 shadow-md">
            Out of Stock
          </span>
        )}
      </div>

      {/* Content (Unchanged) */}
      <div className="p-5 flex flex-col">
        <h3 className="text-lg font-bold text-gray-800 truncate">{book.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{book.type} • {book.age}+ years</p>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-indigo-600">${book.price}</span>
          
          <motion.button
            onClick={handleAddClick}
            disabled={isAdded || outOfStock}
            className={`p-3 rounded-full shadow-md transition-colors ${
              outOfStock
                ? "bg-gray-300 cursor-not-allowed"
                : isAdded || isAdding
                ? "bg-green-500"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
            whileTap={{ scale: 0.9 }}
          >
            {isAdding ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
              >
                <Check className="text-white" size={20} />
              </motion.div>
            ) : isAdded ? (
              <Check className="text-white" size={20} />
            ) : (
              <ShoppingCart className="text-white" size={20} />
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}