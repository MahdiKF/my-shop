import Container from '@/components/Container';
import React from 'react';

async function Product({ params }) {
  const { id } = await params;
  const result = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data = await result.json();

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* بخش اطلاعات محصول */}
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">{data.title}</h2>
          
          {/* توضیحات محصول */}
          <p className="text-gray-600 text-lg mb-4">{data.description}</p>
          
          {/* قیمت محصول */}
          <p className="font-bold text-xl text-gray-900 mb-4">${data.price}</p>
          
          {/* دکمه خرید */}
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300">
            افزودن به سبد خرید
          </button>
        </div>

        {/* بخش تصویر محصول */}
        <div className="flex justify-center items-center">
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-auto max-w-[400px] rounded-lg shadow-lg"
          />
        </div>
      </div>
    </Container>
  );
}

export default Product;
