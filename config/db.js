// 1. Importing the mongoose. Mongoose is an ODM (Object Data Modeling) library for MongoDB in Node.js.
// It helps define schemas and interact with MongoDB in an easier way.

import mongoose from "mongoose";

// 2. Caching the Connection: Why caching? In serverless environments like Vercel, a new instance of the app is created for every request, causing multiple MongoDB connections. This caching mechanism ensures that only one connection is established and reused instead of opening a new one for every request.

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }; // Initialize if cached connection doesn't exist.
}

// 3. Connecting to MongoDB

async function connectDB() {
  // If a cached connection (cached.conn) already exists, it is reused to prevent unnecessary reconnections.

  if (cached.conn) {
    console.log("Using cached database connection"); // Debugging
    return cached.conn;
  }

  // 4. Establishing a New Connection:
  // If there's no existing connection, it creates a new connection promise and assigns it to cached.promise.

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      useNewUrlParser: true, // MODIFIED: Ensures new URL parser is used
      useUnifiedTopology: true, // MODIFIED: Enables the new MongoDB engine
      serverSelectionTimeoutMS: 10000, // MODIFIED: Timeout if MongoDB is unavailable (10 sec)
    };
    console.log("Attempting to connect to MongoDB..."); // to wait 10s
    cached.promise = mongoose.connect(process.env.MONGODB_URI, opts);
  }

  // 5. Returning the Connection

  cached.conn = await cached.promise;
  console.log("MongoDB Connected");
  return cached.conn;
}

export default connectDB;
