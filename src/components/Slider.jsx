"use client";

import React, { useState, useEffect } from "react";

function Slider() {
  const images = [
    "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
    "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
    "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full h-[450px] gap-10 rounded-2xl shadow-md mb-10 overflow-hidden bg-white">
      
      <div className="md:w-1/2 w-full h-full relative">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`slide-${idx}`}
            className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-700 ease-in-out ${
              idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        ))}
      </div>

      <div className="md:w-1/2 w-full flex flex-col justify-center pr-6 md:pr-10 text-right" dir="rtl">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-800">
          بهترین محصولات ما
        </h2>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed">
          کیفیت بالا، طراحی زیبا و قیمت مناسب — هر آنچه برای خریدی هوشمندانه نیاز دارید.
        </p>
        <button
          onClick={() => (window.location.href = "/store")}
          className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow transition-all duration-300"
        >
          مشاهده محصولات
        </button>
      </div>
    </div>
  );
}

export default Slider;
