import Container from "@/components/Container";
import AddToCart from "@/components/AddToCard"; // حواست باشه اسم کامپوننت درست باشه

export const dynamic = "force-dynamic"; // برای SSR کامل

export default async function Product({ params }) {
  const { id } = params;

  let product = null;

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      cache: "no-store", // هر درخواست تازه واکشی شود
    });
    product = await res.json();
  } catch (error) {
    console.error(error);
  }

  if (!product) {
    return (
      <Container>
        <p className="text-center text-gray-500 mt-10">محصولی یافت نشد.</p>
      </Container>
    );
  }

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mt-10 p-6 bg-white shadow-lg rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-xl">
        
        <div className="md:col-span-6 flex justify-center items-center">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-[400px] w-auto object-contain rounded-xl drop-shadow-md transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="md:col-span-6 flex flex-col justify-center gap-5">
          <h1 className="text-3xl font-bold text-gray-800 leading-snug">
            {product.title}
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl font-extrabold text-green-600">
              ${product.price}
            </span>
            <span className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
              {product.category}
            </span>
          </div>

          <div className="mt-6">
            <AddToCart id={id} />
          </div>
        </div>
      </div>
    </Container>
  );
}
