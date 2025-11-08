import React from "react";
import Link from "next/link";
import Container from "../components/Container";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";

export default function Footer() {
  return (
    <footer className="bg-[#F3F4F6] border-t border-gray-200 mt-10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 text-center md:text-right text-gray-700">
          <div>
            <h2 className="text-xl font-semibold text-[#1D4ED8] mb-4">
              درباره MyShop
            </h2>
            <p className="text-sm leading-relaxed">
              MyShop با هدف ارائه بهترین تجربه خرید اینترنتی راه‌اندازی شده است.
              ما تلاش می‌کنیم با قیمت مناسب و پشتیبانی قوی، خریدی آسان و مطمئن
              برای شما فراهم کنیم.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#1D4ED8] mb-4">
              لینک‌های مفید
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#2563EB] transition-colors"
                >
                  صفحه اصلی
                </Link>
              </li>
              <li>
                <Link
                  href="/store"
                  className="hover:text-[#2563EB] transition-colors"
                >
                  فروشگاه
                </Link>
              </li>
              <li>
                <Link
                  href="/contactus"
                  className="hover:text-[#2563EB] transition-colors"
                >
                  تماس با ما
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="hover:text-[#2563EB] transition-colors"
                >
                  ورود / ثبت‌نام
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#1D4ED8] mb-4">
              اطلاعات تماس
            </h2>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <HiOutlinePhone className="text-[#1D4ED8] w-5 h-5" />
                ۰۲۱-۱۲۳۴۵۶۷۸
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <HiOutlineMail className="text-[#1D4ED8] w-5 h-5" />
                support@myshop.com
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <HiOutlineLocationMarker className="text-[#1D4ED8] w-5 h-5" />
                تهران، خیابان آزادی، پلاک ۱۲۳
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 py-4 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} MyShop — All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
