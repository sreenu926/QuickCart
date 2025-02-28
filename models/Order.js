// 1. Importing Mongoose
import mongoose from "mongoose"; // Mongoose is an ODM (Object Data Modeling) library for MongoDB.

// 2. Defining the Order Schema
const orderSchema = new mongoose.Schema({
  // Stores the ID of the user who placed the order.
  // type: String → Stores user ID as a string.
  // required: true → This field is mandatory.
  // ref: "user" → This indicates a reference to the "user" collection, enabling population (joining user details).
  userId: { type: String, required: true, ref: "user" },

  /* Stores an array of products in the order. Each item in items is an object containing:
      product: The ID of the product being ordered.
          type: String → Stores product ID as a string.
          required: true → The order must contain a product.
          ref: "product" → References the "product" collection.
      quantity: Number of units ordered.
          type: Number → Stores the quantity as a number.
          required: true → Quantity must be specified.*/
  items: [
    {
      product: { type: String, required: true, ref: "product" },
      quantity: { type: Number, required: true },
    },
  ],

  amout: { type: Number, required: true },

  /*Stores the address ID where the order will be delivered.
      type: String → Stores address ID as a string.
      required: true → An order must have an address.
      ref: "address" → References the "address" collection.*/
  address: { type: String, required: true, ref: "address" },

  /*Stores the current status of the order.
      type: String → Stores status as text.
      required: true → Must have a status.
      default: "Order Placed" → If not provided, it defaults to "Order Placed".*/
  status: { type: String, required: true, default: "Order Placed" },

  date: { type: Number, required: true },
});

// 3. Creating the Order Model: Checks if the model already exists (mongoose.models.order).
// If yes, use the existing model. If no, create a new model using mongoose.model("order", orderSchema).
// This prevents duplicate model definitions (common issue in Next.js).
const Order = mongoose.models.order || mongoose.model("order", orderSchema);

export default Order;
