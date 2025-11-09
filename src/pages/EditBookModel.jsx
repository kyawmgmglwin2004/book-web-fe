import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditBook() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [book, setBook] = useState(
    state || { title: "", price: "", stock: "", remark: "", image: "" }
  );
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch book data if not passed from state
  useEffect(() => {
    if (!state) {
      const fetchBook = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/v1/books/${id}`);
          setBook(res.data.data);
        } catch (error) {
          console.error("❌ Failed to fetch book:", error);
          alert("Failed to load book details.");
        }
      };
      fetchBook();
    }
  }, [id, state]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", book.title);
    formData.append("price", book.price);
    formData.append("stock", book.stock);
    formData.append("remark", book.remark);
    if (imageFile) formData.append("image", imageFile);

    try {
      await axios.post(`http://localhost:5000/api/v1/books/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Book updated successfully!");
      navigate("/adminDashboard");
    } catch (error) {
      console.error("Update failed:", error);
      alert("❌ Failed to update book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-pink-600">✏️ Edit Book</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <input
          type="text"
          name="title"
          value={book.title}
          onChange={handleChange}
          placeholder="Book Title"
          className="w-full border p-2 rounded"
          required
        />

        {/* Image Upload */}
        <div>
          <label className="block mb-1 text-gray-600 font-medium">Book Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border p-2 rounded"
          />
          {(preview || book.image) && (
            <img
              src={preview || `http://localhost:5000/uploads/${book.image}`}
              alt="Book Preview"
              className="mt-3 w-40 h-40 object-cover rounded"
            />
          )}
        </div>

        {/* Price */}
        <input
          type="number"
          name="price"
          value={book.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border p-2 rounded"
          required
        />

        {/* Stock */}
        <input
          type="number"
          name="stock"
          value={book.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="w-full border p-2 rounded"
          required
        />

        {/* Remark */}
        <textarea
          name="remark"
          value={book.remark}
          onChange={handleChange}
          placeholder="Remark"
          className="w-full border p-2 rounded"
        ></textarea>

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`${
              loading ? "bg-pink-400" : "bg-pink-600 hover:bg-pink-700"
            } text-white px-4 py-2 rounded`}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
