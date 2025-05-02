import mongoose from "mongoose";
import { promise } from "zod";

type ConnectionObject = {
  isConnected?: number; // check for if the database is already connected, so that app would not choke
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("database is already connected");
    return;
  }

  try {
    const connectionInstance = await mongoose.connect(
      process.env.MONGODB_URI || "",
      {}
    );

    connection.isConnected = connectionInstance.connections[0].readyState;
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed", error);
    process.exit(1);
  }
}

export default dbConnect;
