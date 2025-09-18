import { Client, Account } from "appwrite";

// 🔑 Setup Appwrite client
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite endpoint
  .setProject("68c82dbd003affb171cf");              // Replace with your Appwrite Project ID

// 👤 Account instance for auth
export const account = new Account(client);

export { client };
