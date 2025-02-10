import { NextResponse } from "next/server";
import Stripe from "stripe";

// Ensure your STRIPE_SECRET_KEY is set in the environment variables.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10" as any,
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const amount = data.amount;

    // Ensure the amount is provided and is a valid number
    if (!amount || typeof amount !== "number") {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Use Math.round to ensure it's an integer
      currency: "sar",
    });

    // Return the client secret in an object
    return NextResponse.json(
      { clientSecret: paymentIntent.client_secret },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
