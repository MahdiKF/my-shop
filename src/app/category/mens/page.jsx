"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import Container from "@/components/Container";
import Loading from "@/components/Loading";

export default function MensPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => setProducts(data.filter(p => p.category.toLowerCase() === "men's clothing")))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handlePopState = () => router.push("/store");
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [router]);

  if (loading) return <Loading />;

  return (
    <Container>
      <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6 border-b pb-3">
        پوشاک مردانه
      </h1>
      {products.length === 0 ? (
        <p className="text-center text-gray-500">محصولی یافت نشد.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {products.map(p => (
            <ProductCard key={p.id} product={p} href={`/category/mens/${p.id}`} />
          ))}
        </div>
      )}
    </Container>
  );
}
