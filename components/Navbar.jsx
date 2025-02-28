"use client"; // Ensures this runs only on the client side
// 1: Importing Dependencies
import React from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs"; // Used for authentication handling.

const Navbar = () => {
  // 2: Getting User Authentication Status
  const { isSeller, router, user } = useAppContext();
  const { openSignIn } = useClerk(); // Function to open the sign-in popup.

  // 3: Rendering the Navbar
  return (
    <nav className="flex bg-gray-700 text-white items-center justify-between px-3 md:px-16 lg:px-32 py-3 border-b border-gray-300">
      <Image
        className="cursor-pointer bg-white rounded px-2 py-1 w-20 md:w-32"
        onClick={() => router.push("/")}
        src={assets.logo}
        alt="logo"
      />
      {/* 4: Navigation Links (Static Content) */}
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-red-700 transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-red-700 transition">
          Shop
        </Link>
        <Link href="/about-us" className="hover:text-red-700 transition">
          About Us
        </Link>
        <Link href="/contact" className="hover:text-red-700 transition">
          Contact
        </Link>

        {/* 5: Handling Sellers (Dynamic Content) */}
        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border px-2 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}
      </div>
      {/* 6: User Account Section (Authentication Logic) */}
      {/* If user is null (not logged in) → Show "Account" button. Clicking it opens the sign-in popup using openSignIn().
      If user is authenticated → Show a UserButton dropdown. This includes Cart & My Orders links.*/}
      <ul className="hidden bg-yellow-100 rounded text-black px-2 py-1 md:flex items-center gap-4 ">
        {user ? (
          <>
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Cart"
                  labelIcon={<CartIcon />}
                  onClick={() => router.push("/cart")}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Orders"
                  labelIcon={<BagIcon />}
                  onClick={() => router.push("/my-orders")}
                />
              </UserButton.MenuItems>
            </UserButton>
          </>
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 hover:text-gray-900 transition"
          >
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </ul>
      {/* 7: Mobile Version of the Navbar */}{" "}
      {/*This is a responsive version of the Navbar. 
      The same authentication logic applies, but shown in a dropdown instead of a horizontal layout.*/}
      <div className="flex items-center md:hidden gap-3">
        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}
        {user ? (
          <>
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Home"
                  labelIcon={<HomeIcon />}
                  onClick={() => router.push("/")}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Products"
                  labelIcon={<BoxIcon />}
                  onClick={() => router.push("/all-product")}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Cart"
                  labelIcon={<CartIcon />}
                  onClick={() => router.push("/cart")}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Orders"
                  labelIcon={<BagIcon />}
                  onClick={() => router.push("/my-orders")}
                />
              </UserButton.MenuItems>
            </UserButton>
          </>
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 hover:text-gray-900 transition"
          >
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
