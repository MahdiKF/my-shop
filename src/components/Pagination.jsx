"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import ReactPaginate from "react-paginate";

function Pagination({ pageCount, currentPage = 1 }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handlePageClick = (e) => {
    const page = e.selected + 1;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/store?${params.toString()}`);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="›"
      previousLabel="‹"
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      pageCount={pageCount}
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
      containerClassName="flex justify-center items-center space-x-2 mt-8"
      pageClassName="inline-block"
      pageLinkClassName="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-all"
      previousClassName="inline-block"
      previousLinkClassName="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-all"
      nextClassName="inline-block"
      nextLinkClassName="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-all"
      breakClassName="inline-block px-2 text-gray-400"
      activeClassName="bg-blue-600 text-white border-blue-600 shadow-md"
    />
  );
}

export default Pagination;
