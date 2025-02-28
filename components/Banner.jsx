// 1. Import Statements
import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";

// 2. Functional Component Definition
const Banner = () => {
  const { router } = useAppContext();
  return (
    // 3. Banner Container & Layout
    <div className="flex flex-col md:flex-row items-center justify-between md:pl-20 py-14 md:py-0 bg-[#E6E9F2] mt-16 mb-8 rounded-xl overflow-hidden">
      {/* 4. Left-Side Product Image (JBL Soundbox) */}
      <Image
        className="max-w-56"
        src={assets.jbl_soundbox_image}
        alt="jbl_soundbox_image"
      />
      {/* 5. Center Content (Heading, Description & Buy Button) */}
      <div className="flex flex-col items-center justify-center text-center space-y-2 px-4 md:px-0">
        <h2 className="text-2xl md:text-3xl font-semibold max-w-[290px]">
          Level Up Your Gaming Experience
        </h2>
        <p className="max-w-[343px] font-medium text-gray-800/60">
          From immersive sound to precise controls—everything you need to win
        </p>
        {/* 6. "Buy Now" Button */}
        <button
          onClick={() => {
            router.push("/all-products");
          }}
          className="group flex items-center justify-center gap-1 px-12 py-2.5 bg-orange-600 rounded text-white"
        >
          Buy now
          <Image
            className="group-hover:translate-x-1 transition"
            src={assets.arrow_icon_white}
            alt="arrow_icon_white"
          />
        </button>
      </div>
      {/* 7. Right-Side Gaming Controller Images */}
      {/* For Medium & Large Screens */}
      <Image
        className="hidden md:block max-w-80"
        src={assets.md_controller_image}
        alt="md_controller_image"
      />
      {/* For Small Screens */}
      <Image
        className="md:hidden"
        src={assets.sm_controller_image}
        alt="sm_controller_image"
      />
    </div>
  );
};

export default Banner;
