import { useState } from "react";
import "./App.css";

function loadScript() {
  return new Promise(function (resolve, reject) {
    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay script"));
    document.body.appendChild(script);
  });
}

function App() {
  async function openRazorPayCheckout() {
    try {
      // 1. making request to backend
      const resp = await fetch("http://localhost:3400/checkout", {
        method: "POST",
      });
      const data = await resp.json();
      const order = data.order;

      console.log("order response", data);

      await loadScript();

      const finalOrderObject = {
        key: "", // Razorpay test key
        amount: order.amount, // Use order amount
        currency: order.currency, // Use order currency
        name: "Acme Corp",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id, // Dynamic order ID from backend
        prefill: {
          name: "Ankit",
          email: "ankit.klu.2022@gmail.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new Razorpay(finalOrderObject);
      rzp1.open();
    } catch (err) {
      console.error("Error during Razorpay checkout:", err);
    }
  }

  return (
    <>
      <h1>Payment demo</h1>
      <a style={{ cursor: "pointer" }} onClick={openRazorPayCheckout}>
        Pay for 100
      </a>
    </>
  );
}

export default App;
