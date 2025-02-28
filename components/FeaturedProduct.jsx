// 1. Import Statements
import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image"; // Image: next/image is used instead of <img> for optimized image rendering in Next.js.
import { useAppContext } from "@/context/AppContext";

// 2. Defining Featured Products
const products = [
  {
    id: 1,
    image: assets.girl_with_headphone_image,
    title: "Unparalleled Sound",
    description: "Experience crystal-clear audio with premium headphones.",
  },
  {
    id: 2,
    image: assets.girl_with_earphone_image,
    title: "Stay Connected",
    description: "Compact and stylish earphones for every occasion.",
  },
  {
    id: 3,
    image: assets.boy_with_laptop_image,
    title: "Power in Every Pixel",
    description: "Shop the latest laptops for work, gaming, and more.",
  },
];

// 3. Functional Component Definition
const FeaturedProduct = () => {
  // Extracts router from AppContext, which helps navigate to the "All Products" page.
  const { router } = useAppContext();
  return (
    <div className="mt-14">
      {/* // 4. Heading & Title */}
      <div className="flex flex-col items-center">
        <p className="text-3xl font-medium">Featured Products</p>
        <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
      </div>

      {/* 5. Grid Layout for Featured Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14 mt-12 md:px-14 px-4">
        {/* 6. Displaying Featured Products using map method */}
        {products.map(({ id, image, title, description }) => (
          <div key={id} className="relative group">
            <Image
              src={image}
              alt={title}
              className="group-hover:brightness-75 transition duration-300 w-full h-auto object-cover"
            />
            {/* 7. Product Details & "Buy Now" Button */}
            <div className="group-hover:-translate-y-8 transition duration-300 absolute bottom-8 left-8 text-white space-y-2">
              <p className="font-medium text-xl lg:text-2xl">{title}</p>
              <p className="text-sm lg:text-base leading-5 max-w-60">
                {description}
              </p>

              <button
                onClick={() => {
                  router.push("/all-products");
                }}
                className="flex items-center gap-1.5 bg-orange-600 px-4 py-2 rounded"
              >
                Buy Now{" "}
                <Image
                  className="h-3 w-3"
                  src={assets.redirect_icon}
                  alt="Redirect Icon"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
