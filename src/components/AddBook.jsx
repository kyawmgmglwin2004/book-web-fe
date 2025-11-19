import React, { useState , useEffect, useRef} from "react";
import Alert from "./Alert";
import api from "../api";

export default function AddBook({ onSuccess, onCancel }) {
  const [form, setForm] = useState({
    title: "",
    price: "",
    type: "",
    age: "",
    stock: "",
    remark: "",
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);
  const fileInputRef = useRef(null);
  
  console.log("previews:", previews);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImageFiles((prev) => [...prev, ...files]);
    // store preview objects with both the object URL and the original file
    const newPreviews = files.map((file) => ({ src: URL.createObjectURL(file), file }));
    setPreviews((prev) => [...prev, ...newPreviews]);
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
      // Remove from old images list
      setBookForm((prev) => ({
        ...prev,
        images: prev.images.filter((img) => img !== p.src),
      }));
    } else if (p.file) {
      // Remove from new image files
      setImageFiles((prevFiles) => {
        const idx = prevFiles.findIndex(
          (f) => f.name === p.file.name && f.size === p.file.size
        );
        if (idx === -1) return prevFiles;
        const copy = [...prevFiles];
        copy.splice(idx, 1);
        return copy;
      });
      // revoke object URL
      try {
        URL.revokeObjectURL(p.src);
      } catch (err) {}
    }

    // Remove from previews
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.price || !form.stock || !form.type || !form.age) {
      setAlertMessage("Please fill in all required fields.");
      setAlertType("error");
      return 
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("price", form.price);
    formData.append("type", form.type);
    formData.append("age", form.age);
    formData.append("stock", form.stock);
    formData.append("remark", form.remark);

    imageFiles.forEach((file) => formData.append("images", file));

    try {
      setLoading(true);
    //  const res = await axios.post("http://localhost:5000/api/v1/books", formData, {
    //     headers: { 
    //       "Content-Type": "multipart/form-data",
    //       Authorization: `Bearer ${token}` 
    //     },
    //   });
      
      const res = await api.post("/books", formData);

      console.log("Add book response:", res);
      if(res.code !== 200){
        setAlertMessage("Failed to add book. Please try again.");
        setAlertType("error");
        return
      }
      setAlertMessage("Book added successfully.");
      setAlertType("success");
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (error) {
      setAlertMessage("Failed to add book. Please try again.");
      setAlertType("error");
    } finally {
      setLoading(false);
    }
  };

   useEffect(() => {
      if (alertMessage) {
        const timer = setTimeout(() => {
          setAlertMessage(null);
        }, 5000);
        return () => clearTimeout(timer);
      }
    }, [alertMessage]);
  
  return (
    <>
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
           <select
              name="type"
              value={form.type}
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
              value={form.age}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select Age Group</option>
              <option value="0-3">0-3 years</option>
              <option value="4-7">4-7 years</option>
              <option value="8-12">8-12 years</option>
            </select>

          
          <textarea
            name="remark"
            value={form.remark}
            onChange={handleChange}
            placeholder="Remark"
            className="w-full border p-2 rounded"
          ></textarea>

          <div className="col-span-1 md:col-span-2">
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

          <div className="flex justify-between col-span-2">
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
              className={`${loading ? "bg-pink-400" : "bg-pink-600 hover:bg-pink-700"} text-white px-4 py-2 rounded`}
            >
              {loading ? "Saving..." : "Add Book"}
            </button>
          </div>
        </div>
      </form>
      {alertMessage && <Alert message={alertMessage} type={alertType} />}
    </>
  );
}
