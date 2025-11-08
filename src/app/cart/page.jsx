"use client";
import React, { useState, useEffect } from "react";
import Container from "@/components/Container";
import { useShoppingCartContext } from "@/context/ShoppingCartContext";
import { formatNumberWithCommas } from "@/utils/numbers";

export default function Cart() {
  const { cartItems, handleIncreaseProductQty, handleDecreaseProductQty, handleRemoveProduct } = useShoppingCartContext();
  const [products, setProducts] = useState([]);
  const [discountCode, setDiscountCode] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(0);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(console.error);
  }, []);

  const totalPrice = cartItems.reduce((total, item) => {
    const product = products.find((p) => p.id === item.id);
    return total + (product?.price || 0) * item.qty;
  }, 0);

  const finalPrice = totalPrice - discountedPrice;

  const handleApplyDiscount = () => {
    let discount = 0;
    if (discountCode.toLowerCase() === "sale10") discount = 10;
    if (discountCode.toLowerCase() === "sale20") discount = 20;
    setDiscountedPrice((totalPrice * discount) / 100);
  };

  return (
    <Container>
      <h1 className="my-6 text-3xl font-bold text-gray-800 border-b pb-2">سبد خرید</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 py-6">سبد خرید خالی است.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => {
            const product = products.find((p) => p.id === item.id);
            if (!product) return null;
            return (
              <div key={item.id} className="flex items-center justify-between bg-white rounded-xl shadow p-4">
                <img src={product.image} alt={product.title} className="w-20 h-20 object-contain" />
                <div className="flex-1 px-4 text-right">
                  <p className="font-medium text-gray-700">{product.title}</p>
                  <p className="font-bold text-gray-900">{product.price}$</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleDecreaseProductQty(item.id)} className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300">-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => handleIncreaseProductQty(item.id)} className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300">+</button>
                  <button onClick={() => handleRemoveProduct(item.id)} className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600">حذف</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Summary */}
      {cartItems.length > 0 && (
        <div className="mt-8 p-6 bg-white rounded-xl shadow-lg border border-gray-200 max-w-md mx-auto">
          <h3 className="flex justify-between text-gray-700 font-medium mb-1">
            <span>جمع کل:</span>
            <span className="font-semibold">{formatNumberWithCommas(totalPrice)}$</span>
          </h3>
          <h3 className="flex justify-between text-gray-700 font-medium mb-1">
            <span>تخفیف:</span>
            <span className="text-red-500 font-semibold">{formatNumberWithCommas(discountedPrice)}$</span>
          </h3>
          <h3 className="flex justify-between text-gray-900 font-bold text-lg mb-4 border-t border-gray-200 pt-2">
            <span>قابل پرداخت:</span>
            <span>{formatNumberWithCommas(finalPrice)}$</span>
          </h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="کد تخفیف"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <button
              onClick={handleApplyDiscount}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              اعمال
            </button>
          </div>
        </div>
      )}
    </Container>
  );
}
