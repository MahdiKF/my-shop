"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";
import Container from "../Container";

export default function Navbar() {
  const pathname = usePathname();
  const [categories, setCategories] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Map دسته‌ها به URL خوانا
  const categoryMap = {
    "men's clothing": "men",
    "women's clothing": "women",
    "jewelery": "jewelery",
    "electronics": "electronics",
  };

  useEffect(() => {
    let mounted = true;
    fetch("https://fakestoreapi.com/products/categories")
      .then(res => res.json())
      .then(data => mounted && setCategories(data))
      .catch(console.error);
    return () => { mounted = false; };
  }, []);

  // تابع تبدیل category API به مسیر خوانا
  const getCategoryHref = (cat) => `/category/${categoryMap[cat] || encodeURIComponent(cat)}`;

  // تابع بررسی active بودن لینک
  const isActive = (cat) => {
    const current = pathname?.split("/category/")[1];
    return current === categoryMap[cat];
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <Container>
        <div className="flex justify-between items-center py-3">
          <h1 className="text-2xl font-bold text-[#1D4ED8]">MyShop</h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {categories.map(cat => (
              <Link
                key={cat}
                href={getCategoryHref(cat)}
                className={`text-[#111827] font-medium hover:text-[#2563EB] transition-all duration-200 ${
                  isActive(cat) ? "text-[#1D4ED8] underline scale-105" : ""
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? (
                <HiX className="w-6 h-6 text-[#1D4ED8] transition-transform duration-200" />
              ) : (
                <HiMenu className="w-6 h-6 text-[#1D4ED8] transition-transform duration-200" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white pb-4 flex flex-col space-y-2 animate-slideDown">
            {categories.map(cat => (
              <Link
                key={cat}
                href={getCategoryHref(cat)}
                className="text-[#111827] px-4 py-2 hover:bg-gray-100 rounded transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {cat}
              </Link>
            ))}
          </div>
        )}
      </Container>

      <style jsx>{`
        @keyframes slideDown {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
