// Imports
import connectDB from "@/config/db"; // Function to connect to the database (MongoDB).
import User from "@/models/User"; // The User model to interact with the database.
import { getAuth } from "@clerk/nextjs/server"; // Clerk authentication function to extract user information.
import { NextResponse } from "next/server"; // Used to send API responses.

// This defines the POST route handler for /api/cart/update.
export async function POST(request) {
  try {
    const { userId } = getAuth(request); // Get the Logged-In User ID
    const { cartData } = await request.json(); // Extract Cart Data from the Request
    // Ensures the database connection before executing queries.
    await connectDB(); // Connect to the Database
    const user = await User.findById(userId); // Find the User in MongoDB
    user.cartItems = cartData; // Update the User’s Cart Data
    user.save();
    return NextResponse.json({ success: true }); // If everything works, send { success: true } as a response.
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }); // If any error occurs (like a missing user or database issue), it catches the error and sends a failure response
  }
}
