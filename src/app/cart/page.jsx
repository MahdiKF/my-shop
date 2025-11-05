"use client"
import CartItem from "@/components/CartItem";
import Container from "@/components/Container";
import { useShoppingCartContext } from "@/context/ShoppingCartContext";
import { formatNumberWithCommas } from "@/utils/numbers";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Cart() {

  const {cartItems} = useShoppingCartContext();
  const [data, setData] = useState([])
  const [discountCode, setDiscountCode] = useState("")
  const [finalPrice, setFinalPrice] = useState(0)
  const [discountedPrice, setDiscountedPrice] = useState(0)

  useEffect(() => {
    fetch("http://localhost:3004/products")
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

  },[]) 

  let totalPrice = cartItems.reduce((total,item)=>{

          let selectedProduct = data.find((product)=>product.id == item.id)
          console.log(selectedProduct)

          return total + (selectedProduct?.price || 0) * item.qty



        },0)

  const handleSubmitDiscount = () =>{
    axios(`http://localhost:3004/discount?code=${discountCode}`).then(
      (result) => {

        const {data} = result
        const discountedPrice = totalPrice * data[0].percentage / 100
        let finalPrice = totalPrice - discountedPrice
        setFinalPrice(finalPrice)
        setDiscountedPrice(discountedPrice  )
        
      }
    )
  }

  return (  
    <Container>
      <h1 className="my-4"> Shopping cart</h1>

      <div className=""> 
        {
          cartItems.map((item)=>(
            <CartItem key={item.id} {...item}/>

          ))
        }
        
      </div>

      <div className="border shadow-md p-4">

        <h3> totall price: <span>{
          formatNumberWithCommas(totalPrice)}$</span></h3>
        <h3> your profit: <span>{formatNumberWithCommas(discountedPrice)}$</span></h3>
        <h3> finall price: <span>{formatNumberWithCommas(finalPrice)}$</span></h3>

        <div>
          <input type="text" placeholder="off code?" className="border"
          onChange={(e)=>setDiscountCode(e.target.value)}/>
          <button className="bg-sky-600 text-white px-4 rounded" onClick={handleSubmitDiscount} >submit</button>
        </div>

      </div>
    </Container>
  );
}

export default Cart;
