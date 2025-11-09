"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react"; // برای مدیریت وضعیت پیام‌ها
import { useRouter } from "next/navigation"; // برای هدایت به صفحه اصلی

// تغییر validationSchema برای 4 فیلد
const validationSchema = Yup.object({
  email: Yup.string().email("ایمیل معتبر نیست").required("ایمیل لازمه"),
  password: Yup.string().required("رمز عبور لازمه"),
});

export default function Login() {
  const [message, setMessage] = useState(""); // وضعیت پیام
  const [isSuccess, setIsSuccess] = useState(false); // بررسی موفقیت یا خطا
  const router = useRouter(); // استفاده از useRouter برای هدایت

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      // دریافت اطلاعات کاربران از LocalStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // پیدا کردن کاربر بر اساس ایمیل و رمز عبور
      const user = users.find(
        (u) => u.email === values.email && u.password === values.password
      );

      if (user) {
        setMessage("ورود موفقیت‌آمیز!");
        setIsSuccess(true);
        // هدایت به صفحه اصلی پس از ورود موفقیت‌آمیز
        setTimeout(() => {
          router.push("/"); // هدایت به صفحه اصلی
        }, 2000); // 2 ثانیه تاخیر برای نمایش پیام موفقیت
      } else {
        setMessage("ایمیل یا رمز عبور اشتباه است.");
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("خطا در ورود.");
      setIsSuccess(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4 w-80">
            {/* فرم فیلدها */}
            <Field
              name="email"
              placeholder="Email"
              className="p-2 border rounded"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
            />

            <Field
              name="password"
              type="password"
              placeholder="Password"
              className="p-2 border rounded"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm"
            />

            {/* پیام موفقیت یا خطا */}
            {message && (
              <div
                className={`p-4 mt-4 text-center ${
                  isSuccess
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {message}
              </div>
            )}

            {/* دکمه ارسال */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="p-2 bg-blue-500 text-white rounded"
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
