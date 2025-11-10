"use client";

import React from "react";

function NewProducts() {
  const products = [
    {
      id: 1,
      title: "کوله پشتی",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
      link: "/store/1",
    },
    {
      id: 2,
      title: "تیشرت",
      image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
      link: "/store/2",
    },
    {
      id: 3,
      title: "ژاکت کتانی",
      image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png",
      link: "/store/3",
    },
    {
      id: 4,
      title: "پلیور مردانه",
      image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png",
      link: "/store/4",
    },
  ];

  return (
    <div className="p-8 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center border-b pb-3">
        🆕 جدیدترین محصولات
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {products.map((product) => (
          <a
            key={product.id}
            href={product.link}
            className="group block bg-gray-50 rounded-2xl shadow hover:shadow-lg transition-shadow duration-300 p-4 text-center w-full max-w-[200px]"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-40 h-40 object-contain mx-auto rounded-lg group-hover:scale-105 transition-transform duration-300"
            />
            <p className="mt-3 text-gray-700 font-medium group-hover:text-blue-600">
              {product.title}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}

export default NewProducts;
