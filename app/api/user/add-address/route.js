// 1. Import dependencies
import connectDB from "@/config/db";
import Address from "@/models/Address";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// 2. Handling the POST Request: This is a function that handles HTTP POST requests.
// It allows users to add a new address to their account.
export async function POST(request) {
  try {
    // 3. Extracting User Information
    const { userId } = getAuth(request);

    // 4. Extracting the Address from the Request Body
    const { address } = await request.json();

    // 5. Connecting to the Database
    await connectDB();

    // 6. Creating the New Address Entry
    const newAddress = await Address.create({
      ...address,
      userId,
    });

    // 7. Sending a Success Response
    return NextResponse.json({
      success: true,
      message: "Address added successfully",
      newAddress,
    });
  } catch (error) {
    // 8. Handling Errors
    return NextResponse.json({ success: false, message: error.message });
  }
}
