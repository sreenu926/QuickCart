// 1. Import Statements
"use client"; // This directive tells Next.js that this is a client-side component.
import ProductCard from "@/components/ProductCard"; // It displays each individual product.
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

// 2. Functional Component Definition
const AllProducts = () => {
  const { products } = useAppContext();

  // 3. Page Layout & Structure
  return (
    <>
      <Navbar /> {/* Renders the navigation bar. */}
      <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
        {/* 4. Page Header (All Products Title) */}
        <div className="flex flex-col border-2 rounded items-center py-2 px-4 bg-yellow-300 mx-auto mt-9">
          <p className="text-2xl font-medium">All Products</p>
          <div className="w-full h-0.5 bg-orange-600 rounded-full"></div>
        </div>
        {/* 5. Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-9 pb-6 w-full">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 pb-14 w-full">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
      <Footer /> {/* Renders the footer component. */}
    </>
  );
};

export default AllProducts;
