import AddToCart from '@/components/AddToCart';
import Container from '@/components/Container';
import React from 'react';

async function Product({ params }) {
  const { id } = params;

  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data = await res.json();

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-8 shadow-md p-4 rounded-lg bg-white">
        
        {/* اطلاعات محصول */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-gray-800">{data.title}</h2>
          <p className="text-gray-600">{data.description}</p>
          <p className="text-xl font-semibold text-green-600">${data.price}</p>
          
          <AddToCart id={id} />
        </div>

        {/* تصویر محصول */}
        <div className="md:col-span-8 flex justify-center items-center">
          <img 
            src={data.image} 
            alt={data.title} 
            className="max-h-[400px] w-auto object-contain"
          />
        </div>
      </div>
    </Container>
  );
}

export default Product;
