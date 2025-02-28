// This code defines a GET API route in a Next.js application that fetches the cart items of an authenticated user.

// 1. Importing Required Modules
import connectDB from "@/config/db"; // A function that establishes a connection to the MongoDB database
import User from "@/models/User"; // The MongoDB User model used to query user-related data.
import { getAuth } from "@clerk/nextjs/server"; // A function to get the authenticated user’s details.
import { NextResponse } from "next/server"; // A utility from next/server to create API responses in Next.js.

// 2. Defining the API Route: This exports a GET request handler that Next.js will use to serve the API route.
// The function takes request as a parameter, which represents the incoming API request.
export async function GET(request) {
  try {
    const { userId } = getAuth(request); // 3. Authentication: Extracts the userId of the currently logged-in user.
    await connectDB(); // 3. Database Connection: Ensures the database is connected before performing any queries.

    const user = await User.findById(userId); // 4. Fetching User Data: Finds the user in the database using their userId.
    const { cartItems } = user; // Extracts the user's cart items from their profile

    return NextResponse.json({ success: true, cartItems }); // 5. Sending the Response if success.
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }); // 6. Error Handling.
  }
}
