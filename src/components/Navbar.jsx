"use client";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import React from "react";
import Container from "./Container";
import { useShoppingCartContext } from "@/context/ShoppingCartContext";
import Cookies from "js-cookie";

function Navbar() {
  const {cartTotalQty} = useShoppingCartContext();
  const pathname = usePathname();


  

  const navLinks = [
    {
      id: 1,
      href: "/",
      title: "Home",
    },
    {
      id: 2,
      href: "/store",
      title: "Store",
    },
    {
      id: 3,
      href: "/dashboard",
      title: "Dashboard",
    },
    {
      id: 4,
      href: "/login",
      title: "Login",
    },
  ];

  return (
    <nav className=" p-5 bg-blue-100">
      <Container>
        <div className="flex justify-between ">
          <div>
            {navLinks.map((item) => (
              <Link
                key={item.id}
                className={`mr-4 ${
                  pathname === item.href ? "text-sky-500" : ""
                }`}
                href={item.href}
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div>
            <span className="px-2 py1 bg-red-500 text-white rounded-full">{cartTotalQty}</span>
            <Link href="/cart">shopping cart</Link>
            <button className="ml-4 text-red-600" onClick={()=>{
              Cookies.remove("token")
              redirect("/login")
            }}>Log Out</button>
          </div>
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
