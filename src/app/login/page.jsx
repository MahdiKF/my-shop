"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // استفاده از useAuth
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Login() {
  const router = useRouter();
  const { login } = useAuth(); // دسترسی به متد login از Context

  const validationSchema = Yup.object({
    email: Yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
    password: Yup.string().required("رمز عبور الزامی است"),
  });

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(
        "https://68324c7fc3f2222a8cb1f4ff.mockapi.io/myShop", // ارسال به URL بدون پارامترهای در URL
        {
          method: "POST", // تغییر متد به POST
          headers: {
            "Content-Type": "application/json", // ارسال داده‌ها به صورت JSON
            "accept": "application/json",
          },
          body: JSON.stringify({
            Email: values.email,
            password: values.password,
          }), // ارسال ایمیل و رمز عبور در بدنه درخواست
        }
      );

      const data = await response.json();

      if (data.length > 0) {
        const user = data[0]; // در صورت پیدا شدن کاربر
        login(user); // ذخیره اطلاعات کاربر در Context
        router.push("/"); // هدایت به صفحه اصلی
      } else {
        alert("ایمیل یا رمز عبور اشتباه است.");
      }
    } catch (error) {
      alert(error.message);
      console.error("Login error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-[calc(100vh-56px)] flex">
      <div className="flex-1 flex items-center justify-center bg-blue-50">
        <div className="w-80 rounded-lg mb-50 flex flex-col">
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  type="email"
                  name="email"
                  className="p-2 rounded w-full mt-3 mb-2 bg-blue-100 rounded-l-full rounded-r-full"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mb-3 ml-3" />

                <Field
                  type="password"
                  name="password"
                  className="p-2 rounded w-full mt-3 bg-blue-100 rounded-l-full rounded-r-full"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-xs mb-3 ml-3" />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`mt-6 mx-auto h-12 w-16 bg-blue-600 text-white py-2 transition-all hover:bg-blue-700 hover:w-32 duration-600 rounded-full ${
                    isSubmitting ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "..." : "Login"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <div className="flex-1 bg-[url('/Images/Login.jpg')] bg-center bg-contain bg-no-repeat mt-1 bg-white"></div>
    </div>
  );
}

export default Login;
