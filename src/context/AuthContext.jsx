"use client"; // این خط را اضافه کنید تا کامپوننت به عنوان client-rendered شناخته شود

import React, { createContext, useContext, useState, useEffect } from "react";

// ایجاد Context برای وضعیت ورود کاربر
const AuthContext = createContext();

// کامپوننت Provider برای مدیریت وضعیت ورود کاربر
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // وضعیت ورود کاربر

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // اطلاعات کاربر را از localStorage می‌خوانیم
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // ذخیره اطلاعات کاربر در localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // حذف اطلاعات کاربر از localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// هوک برای دسترسی به اطلاعات کاربر و متدهای login و logout
export const useAuth = () => {
  return useContext(AuthContext);
};
