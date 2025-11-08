// app/category/jewelery/page.jsx
import Link from "next/link";
import Image from "next/image";

export default async function Page() {
  const res = await fetch("https://fakestoreapi.com/products", { cache: "no-store" });
  if (!res.ok) throw new Error("خطا در دریافت محصولات");
  const all = await res.json();

  const products = all.filter((p) => p.category?.toLowerCase() === "jewelery");

  return (
    <section dir="rtl" className="px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6 border-b pb-3">
          زیورآلات
        </h1>

        {products.length === 0 ? (
          <p className="text-center text-gray-500">محصولی یافت نشد.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <Link
                key={p.id}
                href={`/category/jewelery/${p.id}`}
                className="group bg-white rounded-2xl shadow hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col items-center text-center"
              >
                <div className="w-40 h-40 relative">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="160px"
                    className="object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <p className="mt-3 text-gray-700 font-medium line-clamp-2 group-hover:text-blue-600">
                  {p.title}
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[#1D4ED8] font-bold">
                    ${Number(p.price).toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-400">USD</span>
                </div>

                <span className="mt-3 inline-block text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                  {p.category}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
