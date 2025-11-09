import React, { useState } from "react";
import axios from "axios";

export default function AddBook({ onSuccess, onCancel }) {
  const [form, setForm] = useState({
    title: "",
    price: "",
    stock: "",
    remark: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // handle image select
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.price || !form.stock) {
      return alert("⚠️ Please fill in all required fields!");
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    formData.append("remark", form.remark);
    if (imageFile) formData.append("image", imageFile);

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/v1/books", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Book added successfully!");
      onSuccess(); // ✅ close + refresh
    } catch (error) {
      console.error("❌ Failed to add book:", error);
      alert("❌ Failed to add book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-pink-600 mb-2">Add New Book</h2>

     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
       <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Book Title"
        className="w-full border p-2 rounded"
      />
      <input
        type="number"
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
        className="w-full border p-2 rounded"
      />
      <input
        type="number"
        name="stock"
        value={form.stock}
        onChange={handleChange}
        placeholder="Stock"
        className="w-full border p-2 rounded"
      />
      <textarea
        name="remark"
        value={form.remark}
        onChange={handleChange}
        placeholder="Remark"
        className="w-full border p-2 rounded"
      ></textarea>

      <div>
        <label className="block mb-1 text-gray-600 font-medium">
          Book Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border p-2 rounded"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-3 w-40 h-40 object-cover rounded"
          />
        )}
      </div>

      <div className="flex justify-between">
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
          {loading ? "Saving..." : "Add Book"}
        </button>
      </div>
     </div>
    </form>
  );
}
