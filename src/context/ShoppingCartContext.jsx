"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ShoppingCartContext = createContext({});

export const useShoppingCartContext = () => {
  return useContext(ShoppingCartContext);
};

export function ShoppingCartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  const getProductQty = (id) => {
    return cartItems.find((item) => item.id == id)?.qty || 0;
  };

  const cartTotalQty = cartItems.reduce((totalQty, item) => {
    return totalQty + item.qty;
  }, 0);

  const handleDecreaseProductQty = (id) => {
    setCartItems((currentItem) => {
      let isLastOne = currentItem.find((item) => item.id == id)?.qty == 1;

      if (isLastOne) {
        return currentItem.filter((item) => item.id != id);
      } else {
        return currentItem.map((item) => {
          if (item.id == id) {
            return {
              ...item,
              qty: item.qty - 1,
            };
          } else {
            return item;
          }
        });
      }
    });
  };

  // حذف محصول از سبد خرید
  const handleRemoveProduct = (id) => {
    setCartItems((currentItem) => {
      return currentItem.filter((item) => item.id != id);
    });
  };

  
  const handleIncreaseProductQty = (id) => {
    setCartItems((currentItem) => {
      let isNotProductExist = currentItem.find((item) => item.id == id) == null;

      if (isNotProductExist) {
        return [...currentItem, { id: id, qty: 1 }];
      } else {
        return currentItem.map((item) => {
          if (item.id == id) {
            return {
              ...item,
              qty: item.qty + 1,
            };
          } else {
            return item;
          }
        });
      }
    });
  };

  
  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");

    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }

    
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser)); 
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);


  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

 
  const login = (userData) => {
    setUser(userData);
  };

  
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); 
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        cartTotalQty,
        cartItems,
        handleIncreaseProductQty,
        getProductQty,
        handleDecreaseProductQty,
        handleRemoveProduct,
        login, 
        logout, 
        user, 
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
