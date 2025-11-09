"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object({
  fullName: Yup.string().required("نام کامل لازمه"),
  email: Yup.string().email("ایمیل معتبر نیست").required("ایمیل لازمه"),
  pass: Yup.string().min(10, "حداقل 10 کاراکتر").required("رمز عبور لازمه"),
  confirmPass: Yup.string()
    .oneOf([Yup.ref("pass")], "رمزها باید یکی باشن")
    .required("تأیید رمز لازمه"),
});

export default function Register() {
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    }
  }, [isSuccess, router]);

  return (
    <div className="flex justify-center mt-10">
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          pass: "",
          confirmPass: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          try {
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const userExists = users.some(
              (user) => user.email === values.email
            );

            if (userExists) {
              setMessage("این ایمیل قبلاً ثبت‌نام کرده است.");
              setIsSuccess(false);
            } else {
              const newUser = {
                fullName: values.fullName,
                email: values.email,
                password: values.pass,
              };
              users.push(newUser);

              localStorage.setItem("users", JSON.stringify(users));
              setMessage("با موفقیت ثبت نام کردید!");
              setIsSuccess(true);
              resetForm();
            }
          } catch (error) {
            console.error("Error:", error);
            setMessage("خطا در ذخیره‌سازی داده‌ها.");
            setIsSuccess(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4 w-80">
            <Field
              name="fullName"
              placeholder="Full Name"
              className="p-2 border rounded"
            />
            <ErrorMessage
              name="fullName"
              component="div"
              className="text-red-500 text-sm"
            />

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
              name="pass"
              type="password"
              placeholder="Password"
              className="p-2 border rounded"
            />
            <ErrorMessage
              name="pass"
              component="div"
              className="text-red-500 text-sm"
            />

            <Field
              name="confirmPass"
              type="password"
              placeholder="Confirm Password"
              className="p-2 border rounded"
            />
            <ErrorMessage
              name="confirmPass"
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
              Register
            </button>
          </Form>
        )}
      </Formik>

      {isSuccess && (
        <div className="mt-4 text-center text-green-700">
          ثبت‌نام شما موفقیت‌آمیز بود. در حال هدایت به صفحه لاگین...
        </div>
      )}
    </div>
  );
}
