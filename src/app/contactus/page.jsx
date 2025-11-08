import Container from "@/components/Container";
import ContactForm from "@/components/ContactForm";
import React from "react";

export const dynamic = "force-static";

export const metadata = {
  title: "ارتباط با ما | MyShop",
  description: "با تیم پشتیبانی MyShop تماس بگیرید. پاسخ‌گویی سریع و پشتیبانی 24 ساعته.",
};

export default function ContactPage() {
  return (
    <Container>
      <section dir="rtl" className="mt-10">
        <div className="p-8 bg-white rounded-2xl shadow-md border border-gray-100">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center border-b pb-4">
            ارتباط با ما
          </h1>

          <div className="grid md:grid-cols-2 gap-10 mt-8">
            <ContactForm />

            <div className="space-y-6 text-gray-700">
              <p className="text-lg leading-relaxed">
                برای هرگونه سوال، پیشنهاد یا پیگیری سفارش می‌توانید از طریق فرم
                مقابل یا راه‌های زیر با ما در ارتباط باشید.
              </p>

              <div className="space-y-3">
                <p>
                  📞 <span className="font-medium">شماره تماس:</span>{" "}
                  <a href="tel:02112345678" className="text-blue-600 hover:underline">
                    ۰۲۱-۱۲۳۴۵۶۷۸
                  </a>
                </p>

                <p>
                  📧 <span className="font-medium">ایمیل:</span>{" "}
                  <a
                    href="mailto:support@myshop.com"
                    className="text-blue-600 hover:underline"
                  >
                    support@myshop.com
                  </a>
                </p>

                <p>
                  📍 <span className="font-medium">آدرس دفتر مرکزی:</span> تهران،
                  خیابان آزادی، پلاک ۱۲۳، واحد ۵
                </p>
              </div>

              <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">
                  ساعات پاسخ‌گویی
                </h3>
                <p>شنبه تا پنج‌شنبه: ۹ صبح تا ۸ شب</p>
                <p>جمعه و تعطیلات رسمی: فقط پشتیبانی آنلاین</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
