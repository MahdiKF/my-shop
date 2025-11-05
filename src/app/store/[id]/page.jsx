import AddToCart from '@/components/AddToCart';
import Container from '@/components/Container'
import React from 'react'

async function Product({params}) {

  const {id} = await params;
  const result = await fetch (`http://localhost:3004/products/${id}`)
  const data = await result.json()  
 
  
  return(
    <Container>

        <div className=" grid grid-cols-12 mt-8 shadow-md">

            <div className="col-span-3 p-4">

              <h2 className='font-bold text-1xl'> {data.title}</h2>

              <p className="text-gra-600">
                {data.Discription}
              </p>

              <p className="font-bold">{data.price}</p>

              <AddToCart id={id} />
              
            </div>
            <div className="col-span-9">

              <img src={data.image} /> 
            </div>

        </div>
    </Container>
  )
  
}

export default Product
