"use client"
import { createContext, useContext, useEffect, useState } from "react";
const ShoppingCartContext = createContext({});

export const useShoppingCartContext = () =>{
    return useContext(ShoppingCartContext);

}
export function ShoppingCartContextProvider({children}){

    const [ cartItems, setCartItems ] = useState([])


    const getProductQty= (id) =>{
        return cartItems.find(item => item.id == id)?.qty || 0
    }

    const cartTotalQty = cartItems.reduce((totalQty, item) => {
        return totalQty + item.qty
    } , 0)

    const handleDecreaseProductQty = (id) =>{
        
        setCartItems(CurrentItem => {

            let isLastOne = CurrentItem.find(item => item.id == id)?.qty == 1

            if(isLastOne){
                return CurrentItem.filter(item => item.id !=id)
            }
            else{
                return CurrentItem.map(item=> {
                    if(item.id == id){
                        return{
                            ...item,
                            qty: item.qty - 1,
                        };
                    } else{
                        return item;
                    }
                });
            }
        })

    }

    const handleRemoveProduct = (id) =>{
        setCartItems(CurrentItem=> {
            return CurrentItem.filter((item) => item.id != id );
        });

    }
   





    const handleIncreaseProductQty = (id ) =>{
        setCartItems(CuurrentiItem=>{
            let isNotProducExist = CuurrentiItem.find(item => item.id == id )  == null 

            if(isNotProducExist){
                return[...CuurrentiItem, {id:id, qty:1}]
            }

            else{

                return CuurrentiItem.map(item=>{
                    if(item.id == id){
                        return{
                            ...item,
                            qty: item.qty + 1
                        };
                    }
                    else{
                        return item;
                    }
                });
            }

        })
    }

    useEffect(() => {
        const storedCartItems = localStorage.getItem("cartItems")

        if(storedCartItems){
            setCartItems(JSON.parse(storedCartItems))
        }
    },[])
  
    useEffect( () => {
        
        localStorage.setItem("cartItems", JSON.stringify(cartItems))

    },[cartItems])


    return(
        <ShoppingCartContext.Provider value={{cartTotalQty,cartItems, handleIncreaseProductQty, getProductQty,handleDecreaseProductQty, handleRemoveProduct}}>
            {children}
        </ShoppingCartContext.Provider>

    )
}

 