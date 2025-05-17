
import { inngest } from "./client.ts";
import { sendEmail } from "./send-email.tsx";


// Your new function:
const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    console.log(`Hello ${event.data.email}!`);
    return { message: `Hello ${event.data.email}!` };
  }
);

// Create an empty array where we'll export future Inngest functions
export const functions = [helloWorld, sendEmail];
