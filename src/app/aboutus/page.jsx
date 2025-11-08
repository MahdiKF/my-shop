import Container from "@/components/Container";
import React from "react";

export const dynamic = "force-static";

export const metadata = {
  title: "درباره ما | MyShop",
  description: "اطلاعات کامل درباره فروشگاه MyShop، خدمات، ارزش‌ها و اهداف ما.",
};

export default function AboutUsPage() {
  return (
    <Container>
      <section dir="rtl" className="mt-10">
        <div className="p-8 bg-white rounded-2xl shadow-md border border-gray-100">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center border-b pb-4">
            درباره ما
          </h1>

          <div className="space-y-6 text-gray-600 leading-relaxed text-justify">
            <p>
              فروشگاه <strong>MyShop</strong> با هدف ارائه تجربه‌ای امن، راحت و لذت‌بخش در خرید اینترنتی تأسیس شد.
              ما با تمرکز بر کیفیت محصولات، قیمت‌های منصفانه و پشتیبانی دائمی، تلاش می‌کنیم رضایت مشتریان را جلب کنیم.
            </p>

            <p>
              تیم ما همواره در تلاش است تا بهترین تجربه کاربری را فراهم کند. پشتیبانی ۲۴ ساعته، ارسال سریع و
              خدمات پس از فروش بخشی از تعهد ما به مشتریان عزیز است.
            </p>

            <p>
              مأموریت ما، ایجاد بستری مطمئن برای خرید آنلاین است؛ جایی که کیفیت و اعتماد حرف اول را می‌زند.
            </p>

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-5 shadow-sm">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">چشم‌انداز ما</h3>
                <p>
                  تبدیل شدن به یکی از برترین فروشگاه‌های آنلاین کشور با تمرکز بر رضایت مشتری، نوآوری و کیفیت.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-5 shadow-sm">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">ارزش‌های ما</h3>
                <ul className="list-disc pr-5 space-y-1">
                  <li>صداقت و شفافیت در تمامی مراحل خرید</li>
                  <li>پشتیبانی سریع و محترمانه</li>
                  <li>نوآوری در تجربه کاربری و خدمات</li>
                </ul>
              </div>
            </div>

            <p className="text-center text-gray-700 mt-8 font-medium">
              از اعتماد شما سپاس‌گزاریم ❤️  
              <br /> تیم MyShop
            </p>
          </div>
        </div>
      </section>
    </Container>
  );
}
