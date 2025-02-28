// 1. Import Statements
import React from "react";
import ProductCard from "./ProductCard"; // This component is responsible for displaying individual product details.
import { useAppContext } from "@/context/AppContext"; // custom hook that helps us access global state from AppContext.

// 2. HomeProducts Functional Component Definition
const HomeProducts = () => {
  // 3. Accessing Context Data
  const { products, router } = useAppContext();

  return (
    <div className="flex flex-col items-center pt-14">
      {/* 4. Title and Styling */}
      <div className="flex flex-col mt-4 mb-8 items-center">
        <p className="text-3xl font-medium">Popular Products</p>
        <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
      </div>

      {/* 5. Displaying Products */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>

      {/* 6. "See More" Button */}
      <button
        onClick={() => {
          router.push("/all-products");
        }}
        className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition"
      >
        See more
      </button>
    </div>
  );
};

export default HomeProducts;
