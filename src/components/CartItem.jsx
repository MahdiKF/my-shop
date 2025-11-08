import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AddToCart from './AddToCard';

function CartItem({id,qty}) {

  const [data, setData] = useState({})
  useEffect(() =>{


     fetch(`http://localhost:3004/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.error(err);
      });


  }, [])

  return (
    <div className=" grid grid-cols-12 bg-slate-100 mb-4">
          <img className="col-span-2"
            src={data.image}
          />

          <div className="col-span-10">
            <h2 className="text-xl font-bold">{data.title}</h2>
            <p>numbers:<span>{qty}</span></p>
            <p>
              price: <span>{data.price}$</span>{" "}
            </p>

            <AddToCart id = {id.toString()} />
          </div>
        </div>
  )
}

export default CartItem
