//  1. Import Statements
import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    // 2. Footer Container
    <footer>
      <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-5 border-2 border-sky-200 bg-gray-100 text-gray-500">
        {/* 3. Logo & Description */}
        <div className="w-4/5">
          <Image className="w-28 md:w-32" src={assets.logo} alt="logo" />
          <p className="mt-6 text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>

        {/* 4. Company Links */}
        <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a className="hover:underline transition" href="#">
                  Home
                </a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">
                  About us
                </a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">
                  Contact us
                </a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">
                  Privacy policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 5. Get in Touch (Contact Info) */}
        <div className="w-1/2 flex items-start justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p>
                <a href="tel:+1234567890" className="hover:text-blue-600">
                  +1-234-567-890
                </a>
              </p>
              <p>
                <a
                  href="mailto:contact@greatstack.dev"
                  className="hover:text-blue-600"
                >
                  contact@greatstack.dev
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Copyright Section */}
      <p className="py-4 bg-gray-700 text-white text-center text-xs md:text-sm">
        Copyright 2025 © GreatStack.dev All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
