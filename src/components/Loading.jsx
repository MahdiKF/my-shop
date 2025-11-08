"use client";

export default function Loading({ size = 16, color = "blue-500", className = "" }) {
  return (
    <div className={`flex justify-center items-center h-[60vh] ${className}`}>
      <div
        className={`w-${size} h-${size} border-4 border-${color} border-t-transparent border-solid rounded-full animate-spin`}
      ></div>
    </div>
  );
}
