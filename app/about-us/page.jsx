// 1. Imports
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NewsLetter from "@/components/NewsLetter";
import { assets } from "@/assets/assets";
import React from "react";
import Title from "@/components/Title";
import Image from "next/image";

const page = () => {
  return (
    <div>
      <div>
        {/* Navbar component */}
        <Navbar />
        <div>
          <div className="mx-10 my-10 flex flex-col md:flex-row gap-16">
            {/* Image on the left */}
            <Image
              className="w-full md:max-w-[450px] cursor-pointer"
              src={assets.about_img}
              alt=""
              width="450"
            />

            {/* About Us section details on the right */}
            <div className="flex flex-col justify-center gap-6 md:w-2/4 text-justify text-gray-600">
              {/* Title */}
              <div className="text-2xl">
                <Title text1={"ABOUT"} text2={"US"} />
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Distinctio maxime ut tenetur eligendi exercitationem voluptates
                ipsa non totam quibusdam. Reiciendis quo aliquam officia facere
                ab ad temporibus suscipit impedit similique?
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
                sit excepturi reprehenderit? Ad neque architecto consectetur
                odit esse, voluptas eos eum iure laborum fugit molestias dolorum
                quod vero illum molestiae.
              </p>
              <b className=" text-gray-800">Our Mission</b>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto
                possimus maiores nisi reiciendis laborum alias nulla similique
                quidem. Fugiat veritatis ea fugit officia eligendi aspernatur
                laudantium numquam. Expedita, maxime? Unde?
              </p>
            </div>
          </div>

          {/* Why Choose Us Title */}
          <div className="text-4xl mx-10 py-4">
            <Title text1={"WHY"} text2={"CHOOSE US"} />
          </div>

          <div className="flex flex-col md:flex-row text-sm mb-20">
            <div className="border border-gray-300 ml-10 mr-10 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
              <b>Quality Assurance:</b>
              <p className="text-gray-400 text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                cumque commodi, veniam suscipit sed mollitia deserunt, explicabo
                amet et officiis, adipisci minima repellat! Hic, distinctio
                eveniet ducimus officia qui odit.
              </p>
            </div>

            <div className="border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
              <b>Convenience:</b>
              <p className="text-gray-400 text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                cumque commodi, veniam suscipit sed mollitia deserunt, explicabo
                amet et officiis, adipisci minima repellat! Hic, distinctio
                eveniet ducimus officia qui odit.
              </p>
            </div>

            <div className="border border-gray-300 ml-10 mr-10 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
              <b>Exceptional Customer Service:</b>
              <p className="text-gray-400 text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                cumque commodi, veniam suscipit sed mollitia deserunt, explicabo
                amet et officiis, adipisci minima repellat! Hic, distinctio
                eveniet ducimus officia qui odit.
              </p>
            </div>
          </div>

          {/* NewsLetter Component */}
          <NewsLetter />
        </div>

        {/* Footer Component */}
        <Footer />
      </div>
    </div>
  );
};

export default page;
