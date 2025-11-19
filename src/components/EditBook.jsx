import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
import api from "../api";

export default function EditBook({ id, book, onSuccess, onCancel }) {
  const [bookForm, setBookForm] = useState(
    book || { title: "", price: "", stock: "", remark: "", images: [] }
  );
  const [previews, setPreviews] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);

  // Initialize form and previews from book prop
  useEffect(() => {
    if (book) {
      setBookForm(book);
      if (book.images && book.images.length > 0) {
        // Convert existing image paths into preview objects
        setPreviews(book.images.map((src) => ({ src, isOld: true })));
      }
    }
  }, [book]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookForm((prev) => ({ ...prev, [name]: value }));
  };

  // Add files (used by input change and drop)
  const addFiles = (files) => {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    // update file list
    setImageFiles((prev) => [...prev, ...fileArray]);

    // create preview objects for each new file
    const newPreviews = fileArray.map((file) => ({
      src: URL.createObjectURL(file),
      file,
      isOld: false,
    }));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  // Handle image selection from hidden input
  const handleImageChange = (e) => {
    addFiles(e.target.files);
    e.target.value = null;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    addFiles(e.dataTransfer.files);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const removePreview = (index) => {
    const p = previews[index];
    if (!p) return;

    if (p.isOld) {
      setBookForm((prev) => ({
        ...prev,
        images: prev.images.filter((img) => img !== p.src),
      }));
    } else if (p.file) {
      setImageFiles((prevFiles) => {
        const idx = prevFiles.findIndex(
          (f) => f.name === p.file.name && f.size === p.file.size
        );
        if (idx === -1) return prevFiles;
        const copy = [...prevFiles];
        copy.splice(idx, 1);
        return copy;
      });
      try {
        URL.revokeObjectURL(p.src);
      } catch (err) {}
    }

    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

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

   
    bookForm.images.forEach((img) => formData.append("oldImage", img));

   
    imageFiles.forEach((file) => formData.append("images", file));

    try {
      const res = await api.post(`/books/${id}`, formData);

      if (res.code !== 200) {
        setAlertMessage("Failed to update book. Please try again.");
        setAlertType("error");
        return;
      }

      setAlertMessage("Book updated successfully.");
      setAlertType("success");
      setTimeout(() => onSuccess(), 1500);
    } catch (error) {
      console.error("Update failed:", error);
      alert("❌ Failed to update book.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => setAlertMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  return (
    <>
      <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow-lg rounded-2xl">
        <h2 className="text-2xl font-bold mb-4 text-secondary">✏️ Edit Book</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
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
            <div className="col-span-2">
              <label className="block mb-1 text-gray-600 font-medium">
                Book Images
              </label>

              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="w-full border-2 border-dashed border-pink-200 rounded-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-pink-300"
                onClick={() =>
                  fileInputRef.current && fileInputRef.current.click()
                }
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />

                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-pink-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16V4m0 0L3 8m4-4 4 4M17 8v8a4 4 0 01-4 4H9"
                    />
                  </svg>
                  <div>
                    <div className="text-sm font-medium text-gray-700">
                      Click or drag images to upload
                    </div>
                    <div className="text-xs text-gray-400">
                      PNG, JPG up to your server limits — multiple allowed
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 mt-3">
                {previews.map((p, index) => (
                  <div
                    key={index}
                    className="relative w-16 h-16 rounded overflow-hidden bg-gray-100"
                  >
                    <img
                      src={p.src}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removePreview(index)}
                      className="absolute -top-1 -right-1 bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      aria-label="Remove image"
                    >
                      ×
                    </button>
                  </div>
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
                loading ? "bg-secondary" : "bg-secondary hover:bg-primary"
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
