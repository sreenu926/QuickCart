// This API route is handling the order placement process in a Next.js application using Clerk for authentication, MongoDB for database operations, and Inngest for event-driven processing.

// Import dependencies
import { inngest } from "@/config/inngest"; // A background event processing service (for order processing).
import Product from "@/models/Product"; // Mongoose model for storing product details.
import User from "@/models/User"; // Mongoose model for storing user details.
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// 2. Handling the POST Request
export async function POST(request) {
  try {
    // Retrieves user authentication details (userId) from the request.
    // Extracts order details (address and items) from the request body.
    const { userId } = getAuth(request);
    const { address, items } = await request.json();

    // 3. Validating Order Data
    if (!address || items.length === 0) {
      return NextResponse.json({ success: false, message: "Invalid data" });
    }

    // 4. Calculating the Total Amount: Uses .reduce() to calculate the total amount based on: Each product’s offerPrice. Multiplied by its quantity in the order. Uses async/await inside .reduce(), ensuring each findById() call resolves properly.
    const amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    // 5. Sending Order Event to Inngest: Sends an event (order/created) to Inngest for background processing (e.g., sending email, updating order status).
    await inngest.send({
      name: "order/created",
      data: {
        userId,
        address,
        items,
        amount: amount + Math.floor(amount * 0.02),
        date: Date.now(),
      },
    });

    // 6. Clearing User’s Cart
    const user = await User.findById(userId);
    user.cartItems = {};
    await user.save();
    return NextResponse.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: error.message });
  }
}
