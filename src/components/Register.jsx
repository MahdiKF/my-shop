"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  firstName: Yup.string().required("نام لازمه"),
  lastName: Yup.string().required("نام خانوادگی لازمه"),
  email: Yup.string().email("ایمیل معتبر نیست").required("ایمیل لازمه"),
  pass: Yup.string().min(10, "حداقل 10 کاراکتر").required("رمز عبور لازمه"),
  confirmPass: Yup.string()
    .oneOf([Yup.ref("pass")], "رمزها باید یکی باشن")
    .required("تأیید رمز لازمه"),
  phoneNumber: Yup.string()
    .matches(/^09\d{9}$/, "شماره تلفن معتبر نیست")
    .required("شماره تلفن لازمه"),
});

export default function Register() {
  return (
    <div className="flex justify-center mt-10">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          pass: "",
          confirmPass: "",
          phoneNumber: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const response = await fetch("https://auth.smart-acc.ir/api/v1/auth/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                accept: "application/json",
              },
              body: JSON.stringify({
                email: values.email,
                password: values.pass,
                firstName: values.firstName,
                lastName: values.lastName,
                phoneNumber: values.phoneNumber,
              }),
            });

            const data = await response.json();
            console.log("Status:", response.status);
            console.log("Response Data:", data);

            // فقط وقتی ثبت نام موفق بود، فرم رو ریست کن
            if (response.ok) { // یا می‌تونی data.success === true رو چک کنی
              resetForm();
            }
          } catch (error) {
            console.error("Error:", error);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4 w-80">
            <Field name="firstName" placeholder="First Name" className="p-2 border rounded" />
            <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />

            <Field name="lastName" placeholder="Last Name" className="p-2 border rounded" />
            <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />

            <Field name="email" placeholder="Email" className="p-2 border rounded" />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

            <Field name="pass" type="password" placeholder="Password" className="p-2 border rounded" />
            <ErrorMessage name="pass" component="div" className="text-red-500 text-sm" />

            <Field name="confirmPass" type="password" placeholder="Confirm Password" className="p-2 border rounded" />
            <ErrorMessage name="confirmPass" component="div" className="text-red-500 text-sm" />

            <Field name="phoneNumber" placeholder="Phone Number" className="p-2 border rounded" />
            <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm" />

            <button type="submit" disabled={isSubmitting} className="p-2 bg-blue-500 text-white rounded">
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
