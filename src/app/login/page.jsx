"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const validationSchema = Yup.object({
  email: Yup.string().email("ایمیل معتبر نیست").required("ایمیل لازمه"),
  password: Yup.string().required("رمز عبور لازمه"),
});

export default function Login() {
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const user = users.find(
        (u) => u.email === values.email && u.password === values.password
      );

      if (user) {
        setMessage("ورود موفقیت‌آمیز!");
        setIsSuccess(true);

        login(user);

        setTimeout(() => {
          router.push("/");
        }, 2000);
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
