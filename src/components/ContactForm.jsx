"use client";

import React, { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-gray-50 p-6 rounded-xl shadow-sm relative"
    >
      {success && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/90 rounded-xl text-green-600 text-lg font-semibold animate-fadeIn">
          ✅ پیام شما با موفقیت ارسال شد
        </div>
      )}

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          نام و نام خانوادگی
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="مثلاً زهرا رضایی"
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          ایمیل
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="example@email.com"
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          پیام شما
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows="4"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="پیامتان را بنویسید..."
          required
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={success}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 disabled:opacity-50"
      >
        ارسال پیام
      </button>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </form>
  );
}
