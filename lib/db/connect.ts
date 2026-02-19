import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGO_DB_URL;

if (!MONGODB_URL) {
  throw new Error("please define MONGO_DB_URL in .env.local");
}

let cached = global.mongooseCache || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URL, {
      dbName: "refineVedaApp",
      bufferCommands: false, // it will throw error if query is request on db before connection is made it other it would made show buffering
    });
  }

  cached.conn = await cached.promise;
  global.mongooseCache = cached;
  console.log("connection successfull!");
  return cached.conn;
}
