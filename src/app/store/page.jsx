import Container from '@/components/Container';
import Pagination from '@/components/Pagination';
import ProductItem from '@/components/ProductItem';
import Search from '@/components/Search';
import Link from 'next/link';
import React from 'react';

async function Store({ searchParams }) {
  const page = searchParams?.page ?? "1";
  const per_page = searchParams?.per_page ?? "5";
  const title = searchParams?.title ?? "";

  const res = await fetch('https://fakestoreapi.com/products');
  const allProducts = await res.json();

  const filtered = title
    ? allProducts.filter(p => p.title.toLowerCase().includes(title.toLowerCase()))
    : allProducts;

  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);
  const paginated = filtered.slice(start, end);

  const totalPages = Math.ceil(filtered.length / per_page);

  return (
    <Container>
      <h1 className="py-4 text-2xl font-semibold">Store</h1>

      <Search />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {paginated.map(item => (
          <Link key={item.id} href={`/store/${item.id}`}>
            <ProductItem {...item} />
          </Link>
        ))}
      </div>

      <Pagination pageCount={totalPages} />
    </Container>
  );
}

export default Store;
