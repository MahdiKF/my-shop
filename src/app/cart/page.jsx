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

  const totalPrice = cartItems.reduce((total, item) => {
    const product = products.find(p => p.id === item.id);
    return total + (product?.price || 0) * item.qty;
  }, 0);

  const handleApplyDiscount = () => {
    let discount = 0;
    if (discountCode.toLowerCase() === "sale10") discount = 10;
    if (discountCode.toLowerCase() === "sale20") discount = 20;

    const discountAmount = (totalPrice * discount) / 100;
    setDiscountedPrice(discountAmount);
    setFinalPrice(totalPrice - discountAmount);
  };

  if (loading) return <Container><p className="p-6 text-gray-500 text-center">Loading cart...</p></Container>;

  return (
    <Container>
      <h1 className="my-6 text-3xl font-bold text-gray-800 border-b pb-2">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center py-6">Your cart is empty.</p>
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

      <div className="mt-8 p-6 bg-white rounded-xl shadow-lg border border-gray-200 max-w-md mx-auto">
        <h3 className="flex justify-between text-gray-700 font-medium mb-1">
          <span>Total Price:</span>
          <span className="font-semibold">{formatNumberWithCommas(totalPrice)}$</span>
        </h3>
        <h3 className="flex justify-between text-gray-700 font-medium mb-1">
          <span>Discount:</span>
          <span className="text-red-500 font-semibold">{formatNumberWithCommas(discountedPrice)}$</span>
        </h3>
        <h3 className="flex justify-between text-gray-900 font-bold text-lg mb-4 border-t border-gray-200 pt-2">
          <span>Final Price:</span>
          <span>{formatNumberWithCommas(finalPrice || totalPrice)}$</span>
        </h3>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter discount code"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          <button
            onClick={handleApplyDiscount}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Apply
          </button>
        </div>
      </div>
    </Container>
  );
}
