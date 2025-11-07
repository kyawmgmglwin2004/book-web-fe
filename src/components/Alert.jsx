import React from "react";

export default function Alert({ message, type }) {
  const colors = {
    success: "bg-black text-blue-400 border border-blue-500",
    error: "bg-black border border-red-500 text-red-400",
  };

  return (
    <div
      className={`fixed left-1/2 -translate-x-1/2 top-5 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center justify-center gap-4 w-[90%] max-w-sm animate-slide-down ${
        colors[type || "success"]
      }`}
    >
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}
