"use client";
import Container from "@/components/Container";
import axios from "axios";
import React, { useState } from "react";

function Dashboard() {
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
  });

  const handleAddProduct = (e) => {
    const {value, name} = e.target
    setNewProduct({...newProduct,
        [name]: value
    });
  };

  const handleCreateProducut = () =>{
     
    axios({
        method: "POST",
        url: "http://localhost:3004/products",
        data: {
            id:Math.floor(Math.random()*1000).toString() ,
            image:newProduct.image ,
            title:newProduct.title ,
            description:newProduct.description ,
            price: newProduct.price
        }
    })
  }

  return (
    <div className="bg-slate-300 p-4">
      <Container>
        <div className="grid grid-cols-3 gap-4">
          <input
            onChange={handleAddProduct}
            name="title"
            type="text"
            placeholder="Title"
          />
          <input
            onChange={handleAddProduct}
            name="price"
            type="text"
            placeholder="Price"
          />
          <input
            onChange={handleAddProduct}
            name="image"
            type="text"
            placeholder="Image"
          />
        </div>
        <textarea
          onChange={handleAddProduct}
          name="description"
          className="w-full mt-4"
          placeholder="Discription"
        ></textarea>

        <button onClick={handleCreateProducut} className="bg-sky-500 text-white rounded px-4 py-1">
          Add new product
        </button>
      </Container>
    </div>
  );
}

export default Dashboard;
