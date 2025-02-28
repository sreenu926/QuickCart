// The OrderSummary component provides a summary of the user's cart and allows them to place an order. It includes:
// Address Selection: Users can choose an existing shipping address or add a new one.
// Promo Code Input: Users can enter a discount code.
// Order Summary: It displays the item count, total amount, shipping fees, and tax.
// Place Order Button: Users can submit their order.

// 1. Importing Dependencies
import { useAppContext } from "@/context/AppContext";
import React, { useEffect, useState } from "react";
import axios from "axios"; // axios: Handles API calls.
import toast from "react-hot-toast"; // Displays notifications to the user

const OrderSummary = () => {
  // 2. Accessing Global Context
  const {
    currency,
    router,
    getCartCount,
    getCartAmount,
    getToken,
    user,
    cartItems,
    setCartItems,
  } = useAppContext();

  // 3. Managing Local State
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]);

  // 4. Fetching User Addresses
  const fetchUserAddresses = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/user/get-address", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setUserAddresses(data.addresses);
        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // 5. Handling Address Selection
  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  // 6. Creating an Order: Ensures an address is selected.
  // If successful: Clears the cart. Redirects to the "Order Placed" page.
  const createOrder = async () => {
    try {
      if (!selectedAddress) {
        return toast.error("Please select an address.");
      }

      // Converts cartItems into an array of {product, quantity} objects.
      let cartItemsArray = Object.keys(cartItems).map((key) => ({
        product: key,
        quantity: cartItems[key],
      }));

      cartItemsArray = cartItemsArray.filter((item) => item.quantity > 0);

      if (cartItemsArray.length === 0) {
        return toast.error("Cart is empty.");
      }

      const token = await getToken();

      // Sends the order request to /api/order/create.
      const { data } = await axios.post(
        "/api/order/create",
        {
          address: selectedAddress._id,
          items: cartItemsArray,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        toast.success(data.message);
        setCartItems({});
        router.push("/order-placed");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // 7. Fetching Addresses on Component Mount
  useEffect(() => {
    if (user) {
      fetchUserAddresses();
    }
  }, [user]);

  // 8. UI Structure
  return (
    <div className="w-full md:w-96 bg-gray-500/5 p-5">
      {/* Heading: Displays the title "Order Summary". */}
      <h2 className="text-xl md:text-2xl font-bold text-orange-600">
        Order Summary
      </h2>
      <hr className="border-gray-500/30 my-5" />

      <div className="space-y-6">
        {/* 9. Address Selection UI */}
        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            Select Address
          </label>

          {/* Shows the currently selected address. */}
          {/* Opens the dropdown when clicked. */}
          <div className="relative inline-block w-full text-sm border">
            <button
              className="peer w-full text-left px-4 pr-2 py-2 bg-white text-gray-700 focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>
                {selectedAddress
                  ? `${selectedAddress.fullName}, ${selectedAddress.area}, ${selectedAddress.city}, ${selectedAddress.state}`
                  : "Select Address"}
              </span>
              <svg
                className={`w-5 h-5 inline float-right transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-0" : "-rotate-90"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#6B7280"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown List: Displays user addresses. */}
            {isDropdownOpen && (
              <ul className="absolute w-full bg-white border shadow-md mt-1 z-10 py-1.5">
                {userAddresses.map((address, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer"
                    onClick={() => handleAddressSelect(address)}
                  >
                    {address.fullName}, {address.area}, {address.city},{" "}
                    {address.state}
                  </li>
                ))}

                {/* Redirects to the "Add Address" page when clicked. */}
                <li
                  onClick={() => router.push("/add-address")}
                  className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer text-center"
                >
                  + Add New Address
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* 10. Promo Code Input */}
        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            Promo Code
          </label>
          <div className="flex flex-col items-start gap-3">
            <input
              type="text"
              placeholder="Enter promo code"
              className="flex-grow w-full outline-none p-2.5 text-gray-600 border"
            />
            <button className="bg-orange-600 text-white px-9 py-2 hover:bg-orange-700">
              Apply
            </button>
          </div>
        </div>

        <hr className="border-gray-500/30 my-5" />

        {/* 11. Order Cost Breakdown */}
        <div className="space-y-4">
          <div className="flex justify-between text-base font-medium">
            <p className="uppercase text-gray-600">Items {getCartCount()}</p>
            <p className="text-gray-800">
              {currency}
              {getCartAmount()}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-600">Shipping Fee</p>
            <p className="font-medium text-gray-800">Free</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-600">Tax (2%)</p>
            <p className="font-medium text-gray-800">
              {currency}
              {Math.floor(getCartAmount() * 0.02)}
            </p>
          </div>

          <div className="flex justify-between text-lg md:text-xl font-medium border-t pt-3">
            <p>Total</p>
            <p>
              {currency}
              {getCartAmount() + Math.floor(getCartAmount() * 0.02)}
            </p>
          </div>
        </div>
      </div>

      {/* 12. "Place Order" Button */}
      <button
        onClick={() => createOrder()}
        className="w-full bg-orange-600 text-white py-3 mt-5 hover:bg-orange-700"
      >
        Place Order
      </button>
    </div>
  );
};

export default OrderSummary;
