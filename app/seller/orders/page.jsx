// Importing dependencies
"use client"; //  Ensures this component runs on the client side
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import axios from "axios";
import toast from "react-hot-toast";

const Orders = () => {
  const { currency, getToken, user } = useAppContext(); // Global state
  const [orders, setOrders] = useState([]); // Local state: Stores fetched seller orders.
  const [loading, setLoading] = useState(true); // Local state

  // Fetching Seller Orders: Fetches seller's orders from /api/order/seller-orders.
  const fetchSellerOrders = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/order/seller-orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        // If data is successfully retrieved, it updates orders and sets loading to false.
        setOrders(data.orders);
        setLoading(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch Orders on Component Load
  useEffect(() => {
    if (user) {
      fetchSellerOrders();
    }
  }, [user]);

  // Displaying Orders
  return (
    <div className="flex-1 h-screen overflow-scroll flex flex-col justify-between text-sm">
      {loading ? (
        <Loading />
      ) : (
        <div className="md:p-6 p-4 space-y-5">
          <h2 className="text-2xl bg-sky-800 border-2 text-white border-gray-700 max-w-40 mx-auto rounded text-center font-medium">
            Orders
          </h2>

          <div className="max-w-5xl ml-12 rounded-md">
            {orders.map((order, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-5 justify-between p-5 border border-gray-300"
              >
                <div className="flex-1 flex gap-5 max-w-80">
                  <Image
                    className="max-w-16 max-h-16 object-cover"
                    src={assets.box_icon}
                    alt="box_icon"
                  />
                  <p className="flex flex-col gap-3">
                    <span className="font-medium">
                      {order.items
                        .map(
                          (item) => item.product.name + ` x ${item.quantity}`
                        )
                        .join(", ")}
                    </span>
                    <span>Items : {order.items.length}</span>
                  </p>
                </div>

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

                <p className="font-medium my-auto">
                  {currency}
                  {order.amout.toFixed(2)}
                </p>

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
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Orders;
