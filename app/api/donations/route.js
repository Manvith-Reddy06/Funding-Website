import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Donation from "@/app/models/Donation";

const MONGODB_URI = "mongodb://localhost:27017/myDatabase";
async function connectMongo() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
}
export async function GET(req){
    try{
        await connectMongo();
        const donations = await Donation.find().lean();
        return NextResponse.json(donations); // <-- MUST return an array
    } catch (err) {
      return NextResponse.json({ error: "Error fetching donations" }, { status: 500 });
    }
}