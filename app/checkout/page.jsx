"use client";
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./_components/CheckoutForm";
import { useSearchParams } from "next/navigation";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);

function Checkout() {
  const router = useRouter();
  const { amount } = router.query;
  // const searchParams = useSearchParams();
  const options = {
    mode: "payment",
    currency: "sar",
    // amount: 100,
    locale: "en",
    // amount: Number(searchParams.get("amount")),
    amount: Number(amount) || 0, // Ensure a valid number
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      {/* <CheckoutForm amount={Number(searchParams.get("amount"))} /> */}
      <CheckoutForm amount={Number(amount) || 0} />
    </Elements>
  );
}

export default Checkout;
