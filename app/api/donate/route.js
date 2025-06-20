import connectMongo from "@/app/lib/mongodb";
import Donation from "@/app/models/Donation";

export async function POST(req) {
  await connectMongo();
  const { name, message, amount } = await req.json();

  // Debug: Log the received values
  console.log("Received:", { name, message, amount });

  if (!name || !message || !amount) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const newDonation = await Donation.create({ name, message, amount });
    return Response.json({ message: "Donation added successfully", newDonation });
  } catch (error) {
    console.error("Mongo Error:", error);
    return Response.json({ error: "Database error", details: error.message }, { status: 500 });
  }
}
