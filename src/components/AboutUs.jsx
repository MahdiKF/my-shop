import React from "react";

export default function AboutUs() {
  return (
    <section dir="rtl" className="mt-10">
      <div className="p-8 bg-white rounded-2xl shadow-md border border-gray-100">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center border-b pb-3">
          درباره ما
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="text-right">
            <p className="text-gray-600 leading-relaxed">
              ما مجموعه‌ای تخصصی برای عرضه محصولات باکیفیت هستیم. تمرکز ما روی
              تجربه خرید ساده، قیمت منصفانه و پشتیبانی پاسخ‌گو است.
            </p>

            <ul className="mt-6 space-y-4">
              {[
                {
                  title: "کیفیت تضمین‌شده",
                  desc: "تأمین از فروشندگان معتبر و بررسی کیفی قبل از ارسال.",
                },
                {
                  title: "قیمت رقابتی",
                  desc: "به‌روزرسانی مداوم قیمت‌ها برای بهترین انتخاب شما.",
                },
                {
                  title: "ارسال سریع",
                  desc: "پردازش سفارش در کوتاه‌ترین زمان و بسته‌بندی ایمن.",
                },
                {
                  title: "پشتیبانی پاسخ‌گو",
                  desc: "راهنمایی پیش از خرید و پاسخ سریع پس از خرید.",
                },
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <span className="shrink-0 mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-sm">
                    ✓
                  </span>
                  <div>
                    <p className="font-medium text-gray-800">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center gap-4 justify-end">
              <a
                href="/aboutus"
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow transition-all duration-300"
              >
                بیشتر بدانید
              </a>
              <a
                href="/contactus"
                className="px-5 py-2 border border-gray-300 hover:bg-gray-50 rounded-xl transition-all duration-300"
              >
                ارتباط با ما
              </a>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 md:p-8 text-center md:text-right">
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-lg bg-white shadow-sm p-4">
                <p className="text-2xl font-extrabold text-gray-800">24/7</p>
                <p className="text-xs text-gray-500 mt-1">پشتیبانی</p>
              </div>
              <div className="rounded-lg bg-white shadow-sm p-4">
                <p className="text-2xl font-extrabold text-gray-800">4.8</p>
                <p className="text-xs text-gray-500 mt-1">رضایت مشتری</p>
              </div>
              <div className="rounded-lg bg-white shadow-sm p-4">
                <p className="text-2xl font-extrabold text-gray-800">+500</p>
                <p className="text-xs text-gray-500 mt-1">سفارش موفق</p>
              </div>
            </div>

            <p className="text-sm text-gray-600 mt-6">
              با ما خرید امن و آسان را تجربه کنید. ارسال سریع به سراسر کشور.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
