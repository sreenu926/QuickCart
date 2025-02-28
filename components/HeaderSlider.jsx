// The HeaderSlider component is responsible for displaying a dynamic image slider on the homepage. It automatically transitions between promotional slides every 4 seconds while allowing manual navigation using small indicator dots.

// 1️. Importing Dependencies
import React, { useState, useEffect } from "react"; // handles the current slide and set up the automatic slider transition.
import { assets } from "@/assets/assets"; // assets → Imported from @/assets/assets, containing image assets for the slider.
import Image from "next/image"; // Image (from Next.js) → Optimized image rendering.

const HeaderSlider = () => {
  // 2. Defining sliderData (Slider Content)
  const sliderData = [
    {
      id: 1,
      title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
      offer: "Limited Time Offer 30% Off",
      buttonText1: "Buy now",
      buttonText2: "Find more",
      imgSrc: assets.header_headphone_image,
    },
    {
      id: 2,
      title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
      offer: "Hurry up only few lefts!",
      buttonText1: "Shop Now",
      buttonText2: "Explore Deals",
      imgSrc: assets.header_playstation_image,
    },
    {
      id: 3,
      title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
      offer: "Exclusive Deal 40% Off",
      buttonText1: "Order Now",
      buttonText2: "Learn More",
      imgSrc: assets.header_macbook_image,
    },
    {
      id: 4,
      title: "Experience Pure Sound - Your Perfect Apple Earphones Awaits!",
      offer: "Limited Time Offer 50% Off",
      buttonText1: "Buy now",
      buttonText2: "Find more",
      imgSrc: assets.apple_earphone_image,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0); // 3. Managing Current Slide State

  // 4. Auto-Slide Effect
  useEffect(() => {
    // Automatically changes the slide every 4 seconds.
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 4000);
    return () => clearInterval(interval); // Cleans up the interval on unmount to avoid memory leaks.
  }, [sliderData.length]);

  // 5. Manual Slide Change Function (using small indicator dots.), Allows users to click on dots to switch slides manually.
  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    // 6. Slider Layout
    <div className="overflow-hidden relative w-full">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {/* 7. Mapping Through sliderData */}
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="flex flex-col-reverse md:flex-row items-center justify-between bg-[#E6E9F2] py-8 md:px-14 px-5 mt-6 rounded-xl min-w-full"
          >
            {/* 8. Displaying Slide Content */}
            <div className="md:pl-8 mt-10 md:mt-0">
              <p className="md:text-base text-orange-600 pb-1">{slide.offer}</p>
              <h1 className="max-w-lg md:text-[40px] md:leading-[48px] text-2xl font-semibold">
                {slide.title}
              </h1>
              <div className="flex items-center mt-4 md:mt-6 ">
                <button className="md:px-10 px-7 md:py-2.5 py-2 bg-orange-600 rounded-full text-white font-medium">
                  {slide.buttonText1}
                </button>
                <button className="group flex items-center gap-2 px-6 py-2.5 font-medium">
                  {slide.buttonText2}
                  <Image
                    className="group-hover:translate-x-1 transition"
                    src={assets.arrow_icon}
                    alt="arrow_icon"
                  />
                </button>
              </div>
            </div>

            {/* 9. Displaying Slide Image */}
            <div className="flex items-center flex-1 justify-center">
              <Image
                className="md:w-72 w-48"
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* 10. Slider Navigation Dots */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              currentSlide === index ? "bg-orange-600" : "bg-gray-500/30"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
