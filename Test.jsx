"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


function Regester() {
  const [submitted, setSubmitted] = useState(false);

  const [inf, setInf] = useState({
    email: "",
    firstName: "",
    lastName: "",
    pass: "",
    confirmPass: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setSubmitted(false);
    const { name, value } = e.target;

    setInf((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const isValidPhone = (phone) => {
    const phoneRegex = /^09\d{9}$/;
    return phoneRegex.test(phone);
  };

    const isFormValid =
    inf.email !== "" &&
    inf.pass !== "" &&
    inf.confirmPass !== "" &&
    inf.firstName !== "" &&
    inf.lastName !== "" &&
    inf.phoneNumber !== "" &&
    isValidPhone(inf.phoneNumber) &&
    isValidEmail(inf.email);

  const passwordsMatch =
    inf.pass !== "" && inf.confirmPass !== "" && inf.pass === inf.confirmPass;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!passwordsMatch || !isFormValid) {
      console.log("فرم معتبر نیست");
      return;
    }

    let response;
    try {
      response = await fetch("https://auth.smart-acc.ir/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          email: inf.email,
          password: inf.pass,
          firstName: inf.firstName,
          lastName: inf.lastName,
          phoneNumber: inf.phoneNumber,
        }),
      });

      console.log("Status:", response.status);
      const data = await response.json().catch(() => ({}));
      console.log("Response Data:", data);
    } catch (error) {
      console.log("Error:", error);
    }

    console.log(inf);
  };



  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <input
          type="text"
          name="firstName"
          className="bg-sky-100 my-5"
          placeholder="First Name"
          onChange={handleChange}
          required
          onKeyDown={(e) => {
            if (e.key === " ") {
              e.preventDefault();
            }
          }}
        />

        <input
          type="text"
          name="lastName"
          className="bg-sky-100 my-5"
          placeholder="Last Name"
          onChange={handleChange}
          required
          onKeyDown={(e) => {
            if (e.key === " ") {
              e.preventDefault();
            }
          }}
        />

        <input
          type="email"
          name="email"
          className="bg-sky-100 my-5"
          placeholder="Email"
          onChange={handleChange}
          required
          onKeyDown={(e) => {
            if (e.key === " ") {
              e.preventDefault();
            }
          }}
        />
        <input
          type="password"
          name="pass"
          className={`border p-2 rounded ${
            submitted && !passwordsMatch ? "border-red-500" : " "
          }`}
          placeholder="Password"
          onChange={handleChange}
          required
          onKeyDown={(e) => {
            if (e.key === " ") {
              e.preventDefault();
            }
          }}
        />
        <input
          type="password"
          name="confirmPass"
          className={`border p-2 rounded ${
            submitted && !passwordsMatch ? "border-red-500" : " "
          }`}
          placeholder="Confirm password"
          onChange={handleChange}
          required
          onKeyDown={(e) => {
            if (e.key === " ") {
              e.preventDefault();
            }
          }}
        />

        <input
          type="text"
          name="phoneNumber"
          inputMode="numeric"
          pattern="[0-9]*"
          className="bg-sky-100 my-5"
          placeholder="Phone Number"
          onChange={handleChange}
          onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ""))}
          required
          onKeyDown={(e) => {
            if (e.key === " ") {
              e.preventDefault();
            }
          }}
        />

        <button
          className={`p-2 rounded text-white ${
            isFormValid ? "bg-blue-500" : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={handleSubmit}
          disabled={!isFormValid}
        >
          Regester
        </button>
      </div>
    </div>
  );
}

export default Regester;
