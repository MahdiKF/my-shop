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
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center w-full h-[400px] bg-white shadow-md rounded-2xl overflow-hidden p-6 md:p-10 transition-all duration-500 mb-10">
      
      {/* بخش تصویر */}
      <div
        className="w-full md:w-1/2 h-64 md:h-full bg-center bg-contain bg-no-repeat transition-all duration-700 ease-in-out transform hover:scale-105"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
        }}
      ></div>

      {/* بخش متن */}
      <div className="w-full md:w-1/2 text-center md:text-right mt-6 md:mt-0 px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
          بهترین محصولات ما
        </h2>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed">
          کیفیت بالا، طراحی زیبا و قیمت مناسب — هر آنچه برای خریدی هوشمندانه نیاز دارید.
        </p>
        <button className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow transition-all duration-300">
          مشاهده محصولات
        </button>
      </div>
    </div>
  );
}

export default Slider;
