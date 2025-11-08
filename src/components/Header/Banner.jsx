"use client";
import React from "react";
import Link from "next/link";
import { HiShoppingCart } from "react-icons/hi2";
import { useShoppingCartContext } from "@/context/ShoppingCartContext";
import Container from "../Container";

export default function Header() {
  const { cartTotalQty } = useShoppingCartContext();

  return (
    <header className="sticky top-0 z-50 shadow-md bg-[#F3F4F6]">
      <Container>
        <div className="flex justify-between items-center py-3">

          <div className="hidden md:flex items-center space-x-4 text-sm md:text-base">
            <Link
              href="/login"
              className="text-[#1D4ED8] font-medium hover:text-[#2563EB] transition-colors"
            >
              Login
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href="/register"
              className="text-[#1D4ED8] font-medium hover:text-[#2563EB] transition-colors"
            >
              Register
            </Link>
          </div>

          <Link
            href="/cart"
            className="relative flex items-center text-[#1D4ED8] hover:text-[#2563EB] transition-transform"
          >
            <HiShoppingCart className="w-6 h-6" />
            {cartTotalQty > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {cartTotalQty}
              </span>
            )}
          </Link>
        </div>
      </Container>
    </header>
  );
}
