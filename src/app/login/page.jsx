"use client";
import React from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Login() {
  const router = useRouter();

  // 📘 اعتبارسنجی فیلدها
  const validationSchema = Yup.object({
    username: Yup.string().required("نام کاربری الزامی است"),
    password: Yup.string().required("رمز عبور الزامی است"),
  });

  // 📘 تابع لاگین
  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await fetch("https://auth.smart-acc.ir/api/v1/auth/login", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
          useOTP: false, // در صورت نیاز true بگذار
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "ورود ناموفق بود");
      }

      // ✅ فرض بر این است که API توکن را در فیلد data.token برمی‌گرداند
      if (data?.data?.token) {
        Cookie.set("token", data.data.token, { expires: 7 });
        router.push("/dashboard");
      } else {
        alert("توکن معتبر دریافت نشد.");
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
            initialValues={{ username: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form>
                {/* Username */}
                <p className="ml-2 text-sm font-medium">Username</p>
                <Field
                  type="text"
                  name="username"
                  className="p-2 rounded w-full mt-3 mb-2 bg-blue-100 rounded-l-full rounded-r-full"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-xs mb-3 ml-3"
                />

                {/* Password */}
                <p className="ml-2 text-sm font-medium">Password</p>
                <Field
                  type="password"
                  name="password"
                  className="p-2 rounded w-full mt-3 bg-blue-100 rounded-l-full rounded-r-full"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs mb-3 ml-3"
                />

                {/* Register link */}
                <Link href="/register">
                  <p className="text-xs mt-2 ml-4">
                    Don’t have an account? Click here
                  </p>
                </Link>

                {/* Submit Button */}
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
