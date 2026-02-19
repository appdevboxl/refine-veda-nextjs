import mongoose from "mongoose";

type MongooseCache={
    conn: typeof mongoose | undefined,
    promise:Promise<typeof mongoose>
}

declare global{
    var mongooseCache:MongooseCache | undefined
}

export {}