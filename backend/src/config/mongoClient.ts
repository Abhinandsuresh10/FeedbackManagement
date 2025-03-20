import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONOGO_URL as string);
        console.log("mongoDB is connected")
    } catch (error) {
        console.log('MongoDB connection error:', error);
        process.exit(1);
    }
}