"use client";
import { createContext, useContext, useEffect, useState } from "react";

// ایجاد کانتکست برای سبد خرید و وضعیت کاربر
const ShoppingCartContext = createContext({});

// استفاده از Context برای دسترسی به وضعیت سبد خرید و اطلاعات کاربر
export const useShoppingCartContext = () => {
  return useContext(ShoppingCartContext);
};

export function ShoppingCartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);  // وضعیت ورود کاربر

  // دریافت مقدار تعداد محصول در سبد خرید
  const getProductQty = (id) => {
    return cartItems.find((item) => item.id == id)?.qty || 0;
  };

  // محاسبه تعداد کل محصولات در سبد خرید
  const cartTotalQty = cartItems.reduce((totalQty, item) => {
    return totalQty + item.qty;
  }, 0);

  // کاهش مقدار محصول در سبد خرید
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

  // افزایش مقدار محصول در سبد خرید
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

  // بارگذاری سبد خرید از localStorage
  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");

    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }

    // بارگذاری اطلاعات کاربر از localStorage
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser)); // اطلاعات کاربر را از localStorage می‌خوانیم
    }
  }, []);

  // ذخیره‌سازی سبد خرید در localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ذخیره‌سازی اطلاعات کاربر در localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  // تابع لاگین
  const login = (userData) => {
    setUser(userData);
  };

  // تابع لاگ اوت
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // حذف اطلاعات کاربر از localStorage هنگام لاگ اوت
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
        login,   // متد لاگین برای وارد کردن اطلاعات کاربر
        logout,  // متد لاگ اوت برای خارج کردن کاربر
        user,    // اطلاعات کاربر
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
