"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react"; // برای مدیریت وضعیت پیام‌ها

// تغییر validationSchema برای 4 فیلد
const validationSchema = Yup.object({
  fullName: Yup.string().required("نام کامل لازمه"),
  email: Yup.string().email("ایمیل معتبر نیست").required("ایمیل لازمه"),
  pass: Yup.string().min(10, "حداقل 10 کاراکتر").required("رمز عبور لازمه"),
  confirmPass: Yup.string()
    .oneOf([Yup.ref("pass")], "رمزها باید یکی باشن")
    .required("تأیید رمز لازمه"),
});

export default function Register() {
  const [message, setMessage] = useState(""); // وضعیت پیام
  const [isSuccess, setIsSuccess] = useState(false); // بررسی موفقیت یا خطا

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
        onSubmit={async (values, { resetForm }) => {
          try {
            const response = await fetch(
              "https://auth.smart-acc.ir/api/v1/auth/register",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  accept: "application/json",
                },
                body: JSON.stringify({
                  firstName: values.fullName,
                  lastName: "default",
                  email: values.email,
                  password: values.pass,
                  phoneNumber: "09121001010", // اضافه کردن شماره تلفن به درخواست
                }),
              }
            );

            const data = await response.json();
            console.log("Status:", response.status);
            console.log("Response Data:", data);

            // بررسی وضعیت پاسخ
            if (response.ok) {
              setMessage("با موفقیت ثبت نام کردید!");
              setIsSuccess(true);
              resetForm();
            } else {
              setMessage(`خطا در ثبت نام: ${data.message || "مشخص نیست"}`);
              setIsSuccess(false);
            }
          } catch (error) {
            console.error("Error:", error);
            setMessage("خطا در اتصال به سرور. لطفاً دوباره تلاش کنید.");
            setIsSuccess(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4 w-80">
            {/* فرم فیلدها */}
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
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
