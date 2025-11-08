"use client";
import Image from "next/image";
import Link from "next/link";
import { HiTrash } from "react-icons/hi";
import { useShoppingCartContext } from "@/context/ShoppingCartContext";

export default function ProductCard({ product }) {
  const {
    handleIncreaseProductQty,
    handleDecreaseProductQty,
    handleRemoveProduct,
    getProductQty,
  } = useShoppingCartContext();

  const qty = getProductQty(product.id);

  return (
    <div className="group bg-white rounded-2xl shadow hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col justify-between h-full">
      <Link
        href={`/store/${product.id}`}
        className="flex flex-col items-center text-center cursor-pointer"
      >
        <div className="w-32 h-32 relative">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="128px"
            className="object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <p className="mt-3 text-gray-700 font-medium line-clamp-2 group-hover:text-blue-600">
          {product.title}
        </p>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-[#1D4ED8] font-bold">
            ${Number(product.price).toFixed(2)}
          </span>
          <span className="text-xs text-gray-400">USD</span>
        </div>

        <span className="mt-2 inline-block text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
          {product.category}
        </span>
      </Link>

      <div className="mt-4 flex flex-col items-center gap-2 w-full">
        {qty === 0 ? (
          <button
            onClick={() => handleIncreaseProductQty(product.id)}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition transform hover:scale-105 shadow-lg"
          >
            افزودن به سبد
          </button>
        ) : (
          <div className="flex items-center gap-2 w-full justify-center">
            <button
              onClick={() => handleDecreaseProductQty(product.id)}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 hover:text-gray-900 transition transform hover:scale-110 shadow"
            >
              -
            </button>
            <span className="px-2 py-1 font-semibold">{qty}</span>
            <button
              onClick={() => handleIncreaseProductQty(product.id)}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 hover:text-gray-900 transition transform hover:scale-110 shadow"
            >
              +
            </button>
            <button
              onClick={() => handleRemoveProduct(product.id)}
              className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition transform hover:scale-105 shadow flex items-center"
            >
              <HiTrash className="w-4 h-4 ml-1" /> حذف
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
