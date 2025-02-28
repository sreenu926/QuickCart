// Address Model (mongoose schema)
import mongoose from "mongoose"; // / Mongoose is an ODM (Object Data Modeling) library for MongoDB.

const addressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  pincode: { type: String, required: true },
  area: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
});

// Creating the Address Model: Checks if the model already exists (mongoose.models.address).
// If yes, use the existing model. If no, create a new model using mongoose.model("address", addressSchema).
// This prevents duplicate model definitions (common issue in Next.js).
const Address =
  mongoose.models.address || mongoose.model("address", addressSchema);

export default Address;
