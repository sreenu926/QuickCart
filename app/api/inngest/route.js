// This code is setting up an API route in a Next.js application using Inngest,
// which is an event-driven function execution framework.
// 1. Importing Required Modules
import { serve } from "inngest/next"; // It is used to expose API routes for handling Inngest functions.
import {
  createUserOrder,
  inngest,
  syncUserCreation,
  syncUserDeletion,
  syncUserUpdation,
} from "@/config/inngest";

// 2. Serving the API: serve() is used to create an API route that can handle HTTP GET, POST, and PUT requests.
// The API is bound to the inngest client, meaning Inngest will handle the execution of the functions.
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    syncUserCreation,
    syncUserUpdation,
    syncUserDeletion,
    createUserOrder,
  ],
});

// Why use Inngest?
// Event-driven architecture → The functions run only when triggered, making the system efficient.
// Scalability → Functions execute independently, allowing the system to scale well.
// Asynchronous Execution → Functions don’t block API requests, improving performance.
