"use client"
import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import CartItem from "@/components/CartItem";
import { useShoppingCartContext } from "@/context/ShoppingCartContext";
import { formatNumberWithCommas } from "@/utils/numbers";

export default function Cart() {
  const { cartItems } = useShoppingCartContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [discountCode, setDiscountCode] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Failed to fetch products:", err))
      .finally(() => setLoading(false));
  }, []);

  // محاسبه قیمت کل
  const totalPrice = cartItems.reduce((total, item) => {
    const product = products.find(p => p.id === item.id);
    return total + (product?.price || 0) * item.qty;
  }, 0);

  const handleApplyDiscount = () => {
    // Fake discount simulation
    let discount = 0;
    if (discountCode.toLowerCase() === "sale10") discount = 10;
    if (discountCode.toLowerCase() === "sale20") discount = 20;

    const discountAmount = (totalPrice * discount) / 100;
    setDiscountedPrice(discountAmount);
    setFinalPrice(totalPrice - discountAmount);
  };

  if (loading) return <Container><p className="p-4">Loading cart...</p></Container>;

  return (
    <Container>
      <h1 className="my-4 text-2xl font-semibold">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map(item => (
            <CartItem
              key={item.id}
              {...item}
              product={products.find(p => p.id === item.id)}
            />
          ))}
        </div>
      )}

      <div className="border shadow-md p-4 mt-6 space-y-2 rounded-lg">
        <h3>Total Price: <span className="font-medium">{formatNumberWithCommas(totalPrice)}$</span></h3>
        <h3>Discount: <span className="font-medium">{formatNumberWithCommas(discountedPrice)}$</span></h3>
        <h3>Final Price: <span className="font-bold">{formatNumberWithCommas(finalPrice || totalPrice)}$</span></h3>

        <div className="mt-2 flex gap-2">
          <input
            type="text"
            placeholder="Enter discount code"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleApplyDiscount}
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </Container>
  );
}
