// This is a Next.js client-side component for adding a shipping address.
// 1. Imports & Setup
"use client"; // This ensures the component runs only on the client side (browser), not server-side.
import { assets } from "@/assets/assets";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";

const AddAddress = () => {
  const { getToken, router } = useAppContext();

  // 2. Local State Management for Address: This manages form data for the address.
  // setAddress() updates the state when users type in the input fields.
  const [address, setAddress] = useState({
    fullName: "",
    phoneNumber: "",
    pincode: "",
    area: "",
    city: "",
    state: "",
  });

  // 3. Handling Form Submission:
  const onSubmitHandler = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior (e.preventDefault()).
    try {
      const token = await getToken(); // Fetches authentication token (getToken()).

      // Sends address data to the backend.
      const { data } = await axios.post(
        "/api/user/add-address",
        { address },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Handles the response:
      // If successful → Show toast notification & redirect to cart.
      if (data.success) {
        toast.success(data.message);
        router.push("/cart");
      }
      // If failed → Show error message.
      else {
        toast.error(data.message);
      }
    } catch {
      // Catches errors and displays an error toast
      toast.error(error.message);
    }
  };

  // 4. UI Structure
  return (
    <>
      <Navbar /> {/* Navbar → Displays the top navigation bar. */}
      <div className="px-6 md:px-16 lg:px-32 py-16 flex flex-col md:flex-row justify-between">
        <form onSubmit={onSubmitHandler} className="w-full">
          {/* Form Title */}
          <p className="text-2xl md:text-3xl text-gray-500">
            Add Shipping{" "}
            <span className="font-semibold text-orange-600">Address</span>
          </p>
          <div className="space-y-3 max-w-sm mt-10">
            {/* 5. Input Field for Address */}
            <input
              className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
              type="text"
              placeholder="Full name"
              onChange={(e) =>
                setAddress({ ...address, fullName: e.target.value })
              }
              value={address.fullName}
            />
            {/* 5. Input Fields for Phone Numebr */}
            <input
              className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
              type="text"
              placeholder="Phone number"
              onChange={(e) =>
                setAddress({ ...address, phoneNumber: e.target.value })
              }
              value={address.phoneNumber}
            />
            {/* 5. Input Fields for Pin Code */}
            <input
              className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
              type="text"
              placeholder="Pin code"
              onChange={(e) =>
                setAddress({ ...address, pincode: e.target.value })
              }
              value={address.pincode}
            />
            {/* 5. Input Fields for Address (Area and Street) */}
            <textarea
              className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500 resize-none"
              type="text"
              rows={4}
              placeholder="Address (Area and Street)"
              onChange={(e) => setAddress({ ...address, area: e.target.value })}
              value={address.area}
            ></textarea>
            <div className="flex space-x-3">
              {/* 5. Input Fields for City/District/Town */}
              <input
                className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                type="text"
                placeholder="City/District/Town"
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
                value={address.city}
              />
              {/* 5. Input Fields for State */}
              <input
                className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                type="text"
                placeholder="State"
                onChange={(e) =>
                  setAddress({ ...address, state: e.target.value })
                }
                value={address.state}
              />
            </div>
          </div>
          {/* 6. Submit Button */}
          <button
            type="submit"
            className="max-w-sm w-full mt-6 bg-orange-600 text-white py-3 hover:bg-orange-700 uppercase"
          >
            Save address
          </button>
        </form>
        {/* 7. Displaying an Image on the right side */}
        <Image
          className="md:mr-16 mt-16 md:mt-0"
          src={assets.my_location_image}
          alt="my_location_image"
        />
      </div>
      <Footer />
    </>
  );
};

export default AddAddress;
