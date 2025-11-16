import React, { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "./Alert";

export default function EditBook({ id, book, onSuccess, onCancel }) {
  const navigate = useNavigate();
  const [bookForm, setBookForm] = useState(
    book || { title: "", price: "", stock: "", remark: "", images: [] }
  );
  const [previews, setPreviews] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);

  // Initialize form and previews from book prop
  useEffect(() => {
    if (book) {
      setBookForm(book);
      if (book.images && book.images.length > 0) {
        // Assuming backend returns relative paths
        setPreviews(book.images);
      }
    }
  }, [book]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImageFiles((prev) => [...prev, ...files]);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
    
  };
  console.log("previews:", previews);
  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", bookForm.title);
    formData.append("price", bookForm.price);
    formData.append("stock", bookForm.stock);
    formData.append("type", bookForm.type);
    formData.append("age", bookForm.age);
    formData.append("remark", bookForm.remark);

    if (imageFiles.length > 0) {
      // new images selected
      imageFiles.forEach((file) => formData.append("images", file));
    } else {
      // no new images → send old image paths
      bookForm.images.forEach((images) => formData.append("oldImage", images));
    }
    try {
      const res = await axios.post(`http://localhost:5000/api/v1/books/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
      });
      console.log("Update response:", res.data);
      if(res.data.code !== 200){
        setAlertMessage("Failed to update book. Please try again.");
        setAlertType("error");
        return
      }
      setAlertMessage("Book updated successfully.");
      setAlertType("success");
      console.log("alertMessage:", alertMessage);
      setTimeout(() => {
  onSuccess();
}, 1500);
    } catch (error) {
      console.error("Update failed:", error);
      alert("❌ Failed to update book.");
    } finally {
      setLoading(false);
    }
  };
 useEffect(() => {
    if(alertMessage){
      const timer = setTimeout(() => {
        setAlertMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);
  return (
    <>
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-pink-600">✏️ Edit Book</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title */}
          <input
            type="text"
            name="title"
            value={bookForm.title}
            onChange={handleChange}
            placeholder="Book Title"
            className="w-full border p-2 rounded"
            required
          />

          {/* Price */}
          <input
            type="number"
            name="price"
            value={bookForm.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border p-2 rounded"
            required
          />

          {/* Stock */}
          <input
            type="number"
            name="stock"
            value={bookForm.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="w-full border p-2 rounded"
            required
          />
          <select
            name="type"
            value={bookForm.type}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Type</option>
            <option value="Story">Story</option>
            <option value="Novel">Novel</option>
            <option value="Education">Education</option>
          </select>
          <select
            name="age"
            value={bookForm.age}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Age Group</option>
            <option value="0-3">0-3 years</option>
            <option value="4-7">4-7 years</option>
            <option value="8-12">8-12 years</option>
          </select>

          {/* Remark */}
          <textarea
            name="remark"
            value={bookForm.remark}
            onChange={handleChange}
            placeholder="Remark"
            className="w-full border p-2 rounded"
          ></textarea>

          {/* Image Upload */}
          <div className="col-span-1 md:col-span-2">
            <label className="block mb-1 text-gray-600 font-medium">
              Book Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full border p-2 rounded"
            />
            <div className="grid grid-cols-4 gap-2 mt-2">
              {previews.map((src, index) => (
                <img
                  
                  key={index}
                  src={src}
                  alt={`Preview ${index + 1}`}
                  className="w-16 h-16 object-cover rounded"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={onCancel}
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
    {alertMessage && <Alert message={alertMessage} type={alertType} />} 
    </>
  );
}
