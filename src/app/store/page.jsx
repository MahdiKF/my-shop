"use client";

import { useEffect, useState } from "react";
import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import Loading from "@/components/Loading";

export default function Store() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 8;

  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  const filtered = searchTerm
    ? products.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
    : products;

  const totalPages = Math.ceil(filtered.length / perPage);
  const start = (page - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);

  return (
    <Container>
      <h1 className="py-6 text-3xl font-bold text-gray-800 text-center border-b">
        فروشگاه
      </h1>

      {/* جستجو */}
      <div className="mt-6 mb-6 max-w-md mx-auto relative">
        <input
          type="text"
          placeholder="جستجوی محصول..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
          className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow shadow-sm"
        />
      </div>

      {/* محصولات */}
      {paginated.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">محصولی یافت نشد.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {paginated.map(product => (
            <ProductCard key={product.id} product={product} href={`/store/${product.id}`} />
          ))}
        </div>
      )}

      {/* صفحه‌بندی */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination pageCount={totalPages} currentPage={page} onPageChange={setPage} />
        </div>
      )}
    </Container>
  );
}
