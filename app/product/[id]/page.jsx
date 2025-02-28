// This product/[id].js page is a dynamic product details page in a Next.js e-commerce application. It retrieves product data based on the id parameter and displays the product details, including images, price, description, and a section for adding the product to the cart or buying it immediately.

// Importing Required Modules
"use client"; // This ensures the page runs in the browser and not on the server
import { useEffect, useState } from "react"; // Used for managing product data and fetching details.
import { assets } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useParams } from "next/navigation"; // Extracts the id from the URL.
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";
import React from "react";

const Product = () => {
  const { id } = useParams(); //  Extracting the Product ID from the URL
  const { products, router, addToCart } = useAppContext(); // Accessing Product Data from Context API
  const [mainImage, setMainImage] = useState(null); // Managing Main Image
  const [productData, setProductData] = useState(null); // Managing Product Data

  // Fetching Product Data Based on id
  const fetchProductData = async () => {
    const product = products.find((product) => product._id === id);
    setProductData(product);
  };

  // Fetching Data When id or products Change
  useEffect(() => {
    fetchProductData();
  }, [id, products.length]);

  // Handling Loading State
  return productData ? (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
        {/* Product Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="px-5 lg:px-16 xl:px-20">
            {/* Displaying Main Image */}
            <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
              <Image
                src={mainImage || productData.image[0]}
                alt="alt"
                className="w-full h-auto object-cover mix-blend-multiply"
                width={1280}
                height={720}
              />
            </div>

            {/* Selectable Image Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {/* Maps through productData.image[], displaying all images as selectable thumbnails. */}
              {/* Clicking a thumbnail updates mainImage with the clicked one. */}
              {productData.image.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setMainImage(image)}
                  className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10"
                >
                  <Image
                    src={image}
                    alt="alt"
                    className="w-full h-auto object-cover mix-blend-multiply"
                    width={1280}
                    height={720}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Information Display */}
          <div className="flex flex-col">
            {/* Title & Rating */}
            <h1 className="text-3xl font-medium text-gray-800/90 mb-4">
              {productData.name}
            </h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                <Image
                  className="h-4 w-4"
                  src={assets.star_icon}
                  alt="star_icon"
                />
                <Image
                  className="h-4 w-4"
                  src={assets.star_icon}
                  alt="star_icon"
                />
                <Image
                  className="h-4 w-4"
                  src={assets.star_icon}
                  alt="star_icon"
                />
                <Image
                  className="h-4 w-4"
                  src={assets.star_icon}
                  alt="star_icon"
                />
                <Image
                  className="h-4 w-4"
                  src={assets.star_dull_icon}
                  alt="star_dull_icon"
                />
              </div>
              <p>(4.5)</p>
            </div>

            {/* Description and Pricing */}
            <p className="text-gray-600 mt-3">{productData.description}</p>
            <p className="text-3xl font-medium mt-6">
              ${productData.offerPrice}
              <span className="text-base font-normal text-gray-800/60 line-through ml-2">
                ${productData.price}
              </span>
            </p>
            <hr className="bg-gray-600 my-6" />
            <div className="overflow-x-auto">
              <table className="table-auto border-collapse w-full max-w-72">
                <tbody>
                  <tr>
                    <td className="text-gray-600 font-medium">Brand</td>
                    <td className="text-gray-800/50 ">Generic</td>
                  </tr>
                  <tr>
                    <td className="text-gray-600 font-medium">Color</td>
                    <td className="text-gray-800/50 ">Multi</td>
                  </tr>
                  <tr>
                    <td className="text-gray-600 font-medium">Category</td>
                    <td className="text-gray-800/50">{productData.category}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Add to Cart & Buy Now Buttons */}
            <div className="flex items-center mt-10 gap-4">
              <button
                onClick={() => addToCart(productData._id)}
                className="w-full py-3.5 bg-gray-200 rounded text-gray-800/80 font-bold hover:bg-gray-200 transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addToCart(productData._id);
                  router.push("/cart");
                }}
                className="w-full py-3.5 rounded bg-orange-500 font-bold text-white hover:bg-orange-600 transition"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>

        {/* Featured Products Section */}
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center mb-4 mt-16">
            <p className="text-3xl font-medium">
              Featured{" "}
              <span className="font-medium text-orange-600">Products</span>
            </p>
            <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
            {products.slice(0, 5).map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
          <button className="px-8 py-2 mb-16 border rounded text-gray-500/70 hover:bg-black hover:text-white transition">
            See more
          </button>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default Product;
