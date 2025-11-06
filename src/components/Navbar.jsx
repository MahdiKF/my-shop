"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const pathname = usePathname();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => mounted && setCategories(data))
      .catch((err) => mounted && setError(err.message || "Error"))
      .finally(() => mounted && setLoading(false));

    return () => { mounted = false; };
  }, []);
  

  const toggleMobile = () => setMobileOpen(!mobileOpen);

  return (
    <nav className="bg-[#F3F4F6] shadow-md sticky top-0 z-50">
      <Container>
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold text-[#1D4ED8]">MyShop</h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {loading && <span className="text-[#6B7280]">Loading...</span>}
            {error && <span className="text-red-500">{error}</span>}
            {!loading &&
              !error &&
              categories.map((cat) => {
                const href = `/category/${encodeURIComponent(cat)}`;
                const isActive =
                  pathname?.startsWith("/category") &&
                  decodeURIComponent(pathname.split("/category/")[1] || "") === cat;
                return (
                  <Link
                    key={cat}
                    href={href}
                    className={`text-[#111827] font-medium hover:text-[#2563EB] transition-colors ${
                      isActive ? "text-[#1D4ED8] underline" : ""
                    }`}
                  >
                    {cat}
                  </Link>
                );
              })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMobile}>
              {mobileOpen ? (
                <HiX className="w-6 h-6 text-[#1D4ED8]" />
              ) : (
                <HiMenu className="w-6 h-6 text-[#1D4ED8]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[#F3F4F6] pb-4 flex flex-col space-y-2">
            {categories.map((cat) => {
              const href = `/category/${encodeURIComponent(cat)}`;
              return (
                <Link
                  key={cat}
                  href={href}
                  className="text-[#111827] px-4 py-2 hover:bg-[#E5E7EB] rounded transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {cat}
                </Link>
              );
            })}
          </div>
        )}
      </Container>
    </nav>
  );
}





