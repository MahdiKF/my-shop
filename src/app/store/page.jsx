"use client";

import { useEffect, useState } from "react";
import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import Loading from "@/components/Loading";

export default function Store() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 8;

  useEffect(() => {
    setLoading(true);

    Promise.all([
      fetch("https://fakestoreapi.com/products").then((res) => res.json()),
      fetch("https://fakestoreapi.com/products/categories").then((res) =>
        res.json()
      ),
    ])
      .then(([productsData, categoriesData]) => {
        setProducts(productsData);
        setCategories(categoriesData);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // وقتی در حال لود شدنه
  if (loading) return <Loading />;

  // فیلتر محصولات
  const filtered = products.filter((p) => {
    const matchSearch = p.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory
      ? p.category === selectedCategory
      : true;
    return matchSearch && matchCategory;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const start = (page - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);

  return (
    <Container>
      <h1 className="py-6 text-3xl font-bold text-gray-800 text-center border-b">
        🛍️ فروشگاه
      </h1>

      {/* فیلترها */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6 mb-6">
        <input
          type="text"
          placeholder="جستجوی محصول..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          className="w-full sm:w-80 pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow shadow-sm"
        />

        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setPage(1);
          }}
          className="w-full sm:w-48 px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        >
          <option value="">همه دسته‌ها</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* نمایش محصولات */}
      {paginated.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">محصولی یافت نشد.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {paginated.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              href={`/store/${product.id}`}
            />
          ))}
        </div>
      )}

      {/* صفحه‌بندی */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            pageCount={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        </div>
      )}
    </Container>
  );
}
