// This Inngest configuration file is responsible for handling event-driven tasks in QuickCart Next.js application. It listens for events (such as user creation, updates, deletion, and order placement) and executes the appropriate database operations asynchronously.

// 1. Import dependencies.
import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/User";
import Order from "@/models/Order";

// 2. Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });

// 3. Inngest Function to save user data to a database (Clerk → MongoDB)
/* Listens for the clerk/user.created event. Extracts user data from the event. Stores the user in MongoDB using the User model. When a user signs up via Clerk, this function automatically adds them to the database. */
export const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
  },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      imageUrl: image_url,
    };
    await connectDB();
    await User.create(userData);
  }
);

// 4. Inngest Function to update user data in database: Listens for the clerk/user.updated event Updates the user data in MongoDB. When a user updates their name, email, or profile picture in Clerk, the database reflects these changes.
export const syncUserUpdation = inngest.createFunction(
  {
    id: "update-user-from-clerk",
  },
  {
    event: "clerk/user.updated",
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      imageUrl: image_url,
    };
    await connectDB();
    await User.findByIdAndUpdate(id, userData);
  }
);

// 5. Inngest Function to delete  user from database: Listens for the clerk/user.deleted event. Deletes the user from MongoDB when they are deleted from Clerk. If an admin removes a user, their data is automatically removed from the database.
export const syncUserDeletion = inngest.createFunction(
  {
    id: "delete-user-with-clerk",
  },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await connectDB();
    await User.findByIdAndDelete(id);
  }
);

// 6. Inngest Function to create user's order in database: Listens for the order/created event. Processes orders in batches (up to 5 orders at a time, with a 5-second timeout). Saves multiple orders in MongoDB using insertMany(). When a user places an order, this function stores the order details in the database asynchronously.

export const createUserOrder = inngest.createFunction(
  {
    id: "create-user-order",
    batchEvents: {
      maxSize: 5,
      timeout: "5s",
    },
  },
  { event: "order/created" },
  async ({ events }) => {
    const orders = events.map((event) => {
      return {
        userId: event.data.userId,
        items: event.data.items,
        amout: event.data.amount,
        address: event.data.address,
        date: event.data.date,
      };
    });
    await connectDB();
    await Order.insertMany(orders);
    return { success: true, processed: orders.length };
  }
);
