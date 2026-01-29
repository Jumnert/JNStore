import mongoose from "mongoose";
import { cache } from "react";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}
async function connectDb() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = { BufferCommands: false };
    cached.promise = (
      await mongoose.connect(`${process.env.MONGODB_URI}/JNStore`, opts)
    ).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.connection;
}

export default connectDb;
