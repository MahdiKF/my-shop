"use client";
import Link from "next/link";
import React from "react";
import Container from "./Container";
import { useShoppingCartContext } from "@/context/ShoppingCartContext";

function Banner() {
  const { cartTotalQty } = useShoppingCartContext();
  return (
    <Container>
      <div class="flex items-center justify-between p-4 bg-gray-100">
        <div className="flex items-center justify-around">
          <span className="px-1.5 py-0.1 bg-red-500 text-white rounded-full">
            {cartTotalQty}
          </span>
          <div class="pl-">Login/Register</div>
        </div>

        <div class="flex items-center gap-3">
          <div class="relative ">
            <input
              type="text"
              placeholder="Search..."
              class="pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          </div>

          <div class="flex-1 bg-[url('/Images/Logo.png')] bg-center bg-contain bg-no-repeat mt-1 bg-white"></div>
        </div>
      </div>
    </Container>
  );
}

export default Banner;
