// This MyOrders page is a client-side component in my Next.js e-commerce application (QuickCart).
// It displays a user’s order history by fetching data from the backend and rendering it in a structured format.

//  Imports & Context Setup
"use client"; // Ensures this component runs only on the client-side.
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import axios from "axios";
import toast from "react-hot-toast";

const MyOrders = () => {
  // State Management
  const { currency, getToken, user } = useAppContext(); // Global
  const [orders, setOrders] = useState([]); // Local
  const [loading, setLoading] = useState(true); // Local

  // Fetching Orders from Backend
  const fetchOrders = async () => {
    try {
      const token = await getToken(); // Gets JWT token from getToken().

      // Sends GET request to "/api/order/list" with the token in headers.
      const { data } = await axios.get("/api/order/list", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("API Response:", data);

      // If API is successful: Updates orders state with data.orders.reverse() (recent orders first).
      if (data.success) {
        setOrders(data.orders.reverse());
        setLoading(false); // Stops the loading state.
      } else {
        // If API fails: Shows an error toast message.
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false); // ✅ Ensure loading stops in both success and error cases
    }
  };

  // Fetch Orders on Component Mount
  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  // Rendering the Page Layout
  return (
    <>
      <Navbar /> {/* Navbar Component */}
      <div className="flex flex-col justify-between px-6 md:px-16 lg:px-32 py-6 min-h-screen">
        <div className="space-y-5">
          <h2 className="text-2xl mx-auto max-w-40 bg-yellow-300 border-2 rounded py-1 text-center font-medium mt-2">
            My Orders
          </h2>

          {/* Conditional Rendering (Loading State) */}
          {/* If loading is true, it shows a loading spinner */}
          {/* If loading is false, it renders the order list. */}
          {loading ? (
            <Loading />
          ) : (
            <div className="max-w-6xl border-t border-gray-300 text-sm">
              {orders.map((order, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row gap-5 justify-between p-5 border-b border-gray-300"
                >
                  {/* Order Items */}
                  <div className="flex-1 flex gap-5 max-w-80">
                    <Image
                      className="max-w-16 max-h-16 object-cover"
                      src={assets.box_icon}
                      alt="box_icon"
                    />
                    <p className="flex flex-col gap-3">
                      <span className="font-medium text-base">
                        {order.items
                          .map(
                            (item) => item.product.name + ` x ${item.quantity}`
                          )
                          .join(", ")}
                      </span>
                      <span>Items : {order.items.length}</span>
                    </p>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <p>
                      <span className="font-medium">
                        {order.address.fullName}
                      </span>
                      <br />
                      <span>{order.address.area}</span>
                      <br />
                      <span>{`${order.address.city}, ${order.address.state}`}</span>
                      <br />
                      <span>{order.address.phoneNumber}</span>
                    </p>
                  </div>

                  {/* Order Amount */}
                  <p className="font-medium my-auto">
                    {currency}
                    {order.amout.toFixed(2)}
                  </p>

                  {/* Payment & Delivery Details */}
                  <div>
                    <p className="flex flex-col">
                      <span>Method : COD</span>
                      <span>
                        Date : {new Date(order.date).toLocaleDateString()}
                      </span>
                      <span>Payment : Pending</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;
