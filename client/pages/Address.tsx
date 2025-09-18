import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Address() {
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ✅ Store address temporarily (localStorage or global state)
    localStorage.setItem("checkout_address", JSON.stringify(address));
    navigate("/payment");
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-semibold mb-6">Shipping Address</h1>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={address.name}
          onChange={handleChange}
          className="rounded-md border px-4 py-3"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={address.phone}
          onChange={handleChange}
          className="rounded-md border px-4 py-3"
          required
        />
        <input
          type="text"
          name="street"
          placeholder="Street Address"
          value={address.street}
          onChange={handleChange}
          className="rounded-md border px-4 py-3"
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={address.city}
          onChange={handleChange}
          className="rounded-md border px-4 py-3"
          required
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={address.state}
          onChange={handleChange}
          className="rounded-md border px-4 py-3"
          required
        />
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={address.pincode}
          onChange={handleChange}
          className="rounded-md border px-4 py-3"
          required
        />

        <button
          type="submit"
          className="mt-4 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary/90"
        >
          Save & Continue to Payment
        </button>
      </form>
    </div>
  );
}
