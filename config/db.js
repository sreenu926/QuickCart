import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    console.log("Using cached database connection"); // Debugging
    return cached.conn;
  }
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

  cached.conn = await cached.promise;
  console.log("MongoDB Connected");
  return cached.conn;
}

export default connectDB;
