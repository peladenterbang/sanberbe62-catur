import mongoose from "mongoose";
import { DATABASE_URL } from "./env";

const db = async() => {
    try {
        await mongoose.connect(DATABASE_URL, {
            autoIndex: true,
            dbName: "sanberbe62-catur",
            connectTimeoutMS: 10000
        })
        console.log("database connected ...")
    } catch (error) {
        const err = error as unknown as Error
        console.log(err)
        console.log("failed to connect database")
    }
}

export default db;