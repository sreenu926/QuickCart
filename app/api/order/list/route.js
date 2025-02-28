// This code defines an API route in Next.js (using the App Router) to fetch a user's orders from the database.

// 1. Importing Required Modules
import connectDB from "@/config/db";
import Address from "@/models/Address";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// 2. API Route Handler: This function is triggered when a GET request is made to this API route.
export async function GET(request) {
  try {
    const { userId } = getAuth(request); // 3. Getting the Authenticated User ID
    await connectDB(); // 4. Connecting to the Database

    // 5. Ensuring Models Are Loaded
    Address.length;
    Product.length;

    // 6. Fetching the User’s Orders: This fetches all orders for the authenticated userId from the Order collection.
    // The .populate("address") ensures that instead of just storing an addressId, the full address details are retrieved.
    // The .populate("items.product") ensures that instead of just storing productId, the full product details are included.
    const orders = await Order.find({ userId })
      .populate({ path: "address" })
      .populate({ path: "items.product" });

    console.log("Fetched Orders:", orders); // for debugging purpose

    return NextResponse.json({ success: true, orders }); // Returning the Response
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }); // Error handling
  }
}
