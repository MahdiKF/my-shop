import React from "react";
import Banner from "./Banner";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 shadow-md bg-[#F3F4F6]">
      <Banner />
      <Navbar />
    </header>
  );
}