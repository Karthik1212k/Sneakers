import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const navigate = useNavigate();
  const [method, setMethod] = useState("upi");

  const handlePlaceOrder = () => {
    localStorage.setItem("payment_method", method);
    navigate("/order-success");
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-semibold mb-6">Payment Options</h1>

      <div className="space-y-3">
        <label className="flex items-center gap-3 border rounded-md px-4 py-3 cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="upi"
            checked={method === "upi"}
            onChange={() => setMethod("upi")}
          />
          UPI
        </label>

        <label className="flex items-center gap-3 border rounded-md px-4 py-3 cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="card"
            checked={method === "card"}
            onChange={() => setMethod("card")}
          />
          Credit / Debit Card
        </label>

        <label className="flex items-center gap-3 border rounded-md px-4 py-3 cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="cod"
            checked={method === "cod"}
            onChange={() => setMethod("cod")}
          />
          Cash on Delivery
        </label>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="mt-6 w-full rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary/90"
      >
        Place Order
      </button>
    </div>
  );
}
