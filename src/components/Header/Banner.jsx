"use client";
import React, { useState } from "react";
import Link from "next/link";
import { HiShoppingCart, HiMagnifyingGlass } from "react-icons/hi2";
import { useShoppingCartContext } from "@/context/ShoppingCartContext";
import { useAuth } from "@/context/AuthContext"; // استفاده از useAuth برای دسترسی به اطلاعات کاربر
import Container from "../Container";

export default function Banner() {
  const { cartTotalQty } = useShoppingCartContext();
  const { user, logout } = useAuth(); // دسترسی به اطلاعات کاربر از Context
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    window.location.href = `/store?search=${encodeURIComponent(search)}`;
  };

  return (
    <div className="border-b border-gray-200 bg-[#F3F4F6]">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between py-3 gap-3">
          {/* Login/Register or User Info */}
          <div className="flex items-center space-x-4 text-sm md:text-base">
            {user ? (
              // اگر کاربر وارد شده باشد
              <div className="flex items-center space-x-4">
                <span className="text-gray-600 font-medium">{user.fullName}</span>
                <button
                  onClick={logout}
                  className="text-[#1D4ED8] font-medium hover:text-[#2563EB] transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              // اگر کاربر وارد نشده باشد
              <>
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
              </>
            )}
          </div>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="relative flex-1 max-w-md w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-[#1D4ED8] transition-shadow shadow-sm"
            />
            <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </form>

          {/* Cart */}
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
    </div>
  );
}
