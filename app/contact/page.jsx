import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NewsLetter from "@/components/NewsLetter";
import Title from "@/components/Title";
import { assets } from "@/assets/assets";
import React from "react";
import Image from "next/image";

const page = () => {
  return (
    <div>
      <div>
        <Navbar />
        <div>
          <div className="text-center text-2xl pt-10">
            <Title text1={"CONTACT"} text2={"US"} />
          </div>

          <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
            <Image
              className="w-full md:max-w-[480px]"
              src={assets.contact_img}
              alt=""
            />

            <div className="flex flex-col justify-center items-start gap-6 mx-10">
              <p className="font-semibold text-xl text-gray-600">Our Store</p>

              <p className="text-gray-500">
                54709 Williams Station <br /> Suite 350, Washington, USA
              </p>

              <p className="text-gray-500">
                Tel: (415) 555-0132 <br /> Email: admin@e-commerce.com
              </p>

              <div className="flex gap-2">
                <p className="font-semibold text-xl text-gray-600">
                  Careers at{" "}
                </p>
                <Image src={assets.logo} height={26} alt="logo" />
              </div>

              <p className="text-gray-500">
                Learn more about our teams and job opening.
              </p>

              <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-400">
                Explore Jobs
              </button>
            </div>
          </div>

          <NewsLetter />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default page;
