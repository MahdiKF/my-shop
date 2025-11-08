"use client";
import React from "react";

export default function ProductItem({ title, image, price }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col items-center p-4 h-[350px]">
      <div className="w-full h-48 flex items-center justify-center">
        <img
          src={image}
          alt={title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="mt-4 text-center flex flex-col justify-between h-full w-full">
        <p className="text-gray-800 font-medium text-sm md:text-base truncate">
          {title}
        </p>
        <p className="text-blue-600 font-bold mt-2 text-lg">${price}</p>
      </div>
    </div>
  );
}
