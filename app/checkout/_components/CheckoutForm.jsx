import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState, useContext } from "react";
import { useUser } from "@clerk/nextjs";
import { CartContext } from "../../_Context/cartContext";
import orderApi from "../../_Utils/orderApi";
import cartApi from "../../_Utils/cartApi";

const CheckoutForm = ({ amount }) => {
  const { cart, setCart } = useContext(CartContext);
  const { user } = useUser();

  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return; // Ensure Stripe.js and Elements have loaded

    setLoading(true);
    setErrorMessage(null);
    sendEmail();
    createOrder();

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();

    if (submitError) {
      setLoading(false);
      setErrorMessage(submitError.message);
      return;
    }

    try {
      // Create Payment Intent on the server
      const res = await fetch("/api/create-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: amount }),
      });

      const data = await res.json();
      const clientSecret = data.clientSecret;

      if (!clientSecret) {
        throw new Error("Missing client secret in server response.");
      }

      // Confirm payment with Stripe
      const result = await stripe.confirmPayment({
        clientSecret,
        elements,
        confirmParams: {
          return_url: "http://localhost:3000/payment-confirm",
        },
      });

      if (result.error) {
        setErrorMessage(result.error.message);
      }
    } catch (error) {
      setErrorMessage(
        error.message || "There was an error processing your payment."
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async () => {
    try {
      if (!Array.isArray(cart) || cart.length === 0) {
        console.error("Cart is empty or invalid");
        return;
      }

      const serviceIds = cart.map((el) => el?.service?.id).filter(Boolean); // Get valid IDs
      const data = {
        data: {
          email: user?.primaryEmailAddress?.emailAddress || "unknown",
          name: user?.fullName || "Guest",
          amount,
          services: serviceIds,
        },
      };

      console.log("Payload to Order API:", data);

      const res = await orderApi.createOrder(data);
      if (res) {
        console.log("Order created successfully:", res);
        await Promise.all(
          cart.map((el) =>
            el?.id ? cartApi.deleteCartItem(el.id) : Promise.resolve()
          )
        );
        console.log("Cart items deleted successfully");
      } else {
        console.error("Order creation failed");
      }
    } catch (error) {
      console.error("Error during order creation:", error);
    }
  };

  const sendEmail = async () => {
    try {
      const res = await fetch("api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount,
          email: user?.primaryEmailAddress?.emailAddress || "unknown",
          fullName: user?.fullName || "Guest",
          cart: cart,
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to send email: ${res.statusText}`);
      }

      const result = await res.json();
      console.log("Email sent successfully:", result);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-12 mb-12 w-[55%] m-auto h-[100%] bg-[#1e2121e6] p-14 rounded shadow-lg text-white">
        <div className="bg-white p-6 rounded shadow-lg">
          <PaymentElement />
        </div>
        <button
          type="submit"
          className="w-full p-2 mt-4 text-white rounded-md bg-[#fd0000]"
          disabled={!stripe || loading}
        >
          {loading ? "Processing..." : "Submit"}
        </button>
        {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
      </div>
    </form>
  );
};

export default CheckoutForm;
