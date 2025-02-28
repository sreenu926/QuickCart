// The AppContext.jsx file defines a global state management system using React Context API in a Next.js application. This context provides essential data and functions related to user authentication, product management, cart management, and navigation.

// 1. Importing Dependencies
"use client"; // This ensures that the file runs only on the client side.
import { useAuth } from "@clerk/clerk-react"; // Clerk authentication hook used to manage authentication.
import { useUser } from "@clerk/nextjs"; // Clerk authentication hook used to manage authentication.
import axios from "axios"; // Used for making HTTP requests to the backend API.
import { useRouter } from "next/navigation"; // Next.js hook for programmatic navigation.
import { createContext, useContext, useEffect, useState } from "react"; // React hooks for managing global state.
import toast from "react-hot-toast"; // Displays notifications (success or error messages).

// 2. Creating Context & Custom Hook
export const AppContext = createContext(); // Creates a new React context.

// A custom hook that makes it easier to access the context data.
export const useAppContext = () => {
  return useContext(AppContext);
};

// 3. Defining AppContextProvider Component
// This wrapper component provides shared state and functions to its children components.

export const AppContextProvider = (props) => {
  // 4. Defining State Variables
  const currency = process.env.NEXT_PUBLIC_CURRENCY; // Reads currency setting from environment variables.
  const router = useRouter(); // Stores Next.js router instance.
  const { user } = useUser(); // Fetches the currently logged-in user from Clerk.
  const { getToken } = useAuth(); // Retrieves authentication token from Clerk.
  const [products, setProducts] = useState([]); // Stores product data fetched from the API.
  const [userData, setUserData] = useState(false); // Stores additional user-related data.
  const [isSeller, setIsSeller] = useState(false); // Determines whether the user is a seller.
  const [cartItems, setCartItems] = useState({}); // Stores the user's cart items.

  // 5. Fetching Product Data (axios.get())
  const fetchProductData = async () => {
    try {
      const { data } = await axios.get("/api/product/list"); // Fetches product data from the API (/api/product/list).
      if (data.success) {
        setProducts(data.products); // Updates products state if successful.
      } else {
        toast.error(data.message); // Displays error message using toast if fetching fails.
      }
    } catch (error) {
      toast.error(error.message); // Displays error message using toast if fetching fails.
    }
  };

  // 6. Fetching User Data (axios.get())
  const fetchUserData = async () => {
    try {
      // Checks if the user is a seller (using user.publicMetadata.role).
      if (user.publicMetadata.role === "seller") {
        setIsSeller(true);
      }
      const token = await getToken(); // Retrieves authentication token.
      // Fetches user data from /api/user/data.
      const { data } = await axios.get("/api/user/data", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setUserData(data.user); // Updates userData state if successful.
        setCartItems(data.user.cartItems); // Updates cartItems state also if successful.
      } else {
        toast.error(data.message); // Displays error message using toast if fetching fails.
      }
    } catch (error) {
      toast.error(error.message); // Displays error message using toast if fetching fails.
    }
  };

  // 7. Adding Items to Cart (axios.post())
  const addToCart = async (itemId) => {
    // Updates cart locally by cloning cartItems and adding the item.
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);

    // If the user is logged in: Sends updated cart data to the API (/api/cart/update).
    if (user) {
      try {
        const token = await getToken(); // // Retrieves authentication token from Clerk.
        // Sends a POST request to the /api/cart/update API.
        // Payload: { cartData } (the updated cart data).
        // Headers: Includes the Authorization token (Bearer ${token}) to verify the user.
        await axios.post(
          "/api/cart/update",
          { cartData },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // Handling API Response
        toast.success("Item added to the cart"); // If the request succeeds, it shows a success notification.
      } catch (error) {
        toast.error(error.message); // If the request fails, it catches the error and displays an error message.
      }
    }
  };

  // 8. Updating Cart Quantity (axios.post())
  const updateCartQuantity = async (itemId, quantity) => {
    // Allows the user to change the quantity of items in the cart.
    let cartData = structuredClone(cartItems);
    // If the quantity is 0, the item is removed.
    if (quantity === 0) {
      delete cartData[itemId];
    } else {
      cartData[itemId] = quantity;
    }
    setCartItems(cartData);

    // Sends updated cart data to the backend.
    if (user) {
      try {
        const token = await getToken();
        await axios.post(
          "/api/cart/update",
          { cartData },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Cart updated.");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  // 9. Getting Cart Item Count: Loops through cartItems to count the total number of items in the cart.
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      if (cartItems[items] > 0) {
        totalCount += cartItems[items];
      }
    }
    return totalCount;
  };

  // 10. Getting Cart Total Amount: Loops through cartItems,
  // finds corresponding product details, and calculates total cart value.
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (cartItems[items] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[items];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  // 11.a. Fetching Product Data on Component Mount
  useEffect(() => {
    fetchProductData();
  }, []);

  // 11.b. Fetching User Data on Component Mount and
  // Fetches user data whenever user changes because of the dependency [user].
  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  // 12. Providing Context Data
  const value = {
    currency,
    router,
    isSeller,
    setIsSeller,
    userData,
    fetchUserData,
    products,
    fetchProductData,
    cartItems,
    setCartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    getCartAmount,
    user,
    getToken,
  };

  return (
    // This wrapper component provides shared state and functions to its children components.
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
