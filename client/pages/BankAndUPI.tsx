import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BankAndUPI() {
  const navigate = useNavigate();
  const [upi, setUpi] = useState("");
  const [account, setAccount] = useState("");
  const [ifsc, setIfsc] = useState("");

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Bank/UPI details saved successfully!");
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Bank & UPI</h1>
      <form onSubmit={onSave} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">UPI ID</label>
          <input
            value={upi}
            onChange={(e) => setUpi(e.target.value)}
            placeholder="example@upi"
            className="mt-1 w-full rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Account Number</label>
          <input
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            placeholder="1234567890"
            className="mt-1 w-full rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">IFSC Code</label>
          <input
            value={ifsc}
            onChange={(e) => setIfsc(e.target.value)}
            placeholder="HDFC0001234"
            className="mt-1 w-full rounded-md border px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Save
        </button>
      </form>

      <button
        onClick={() => navigate(-1)}
        className="mt-6 rounded-md bg-gray-200 px-4 py-2 hover:bg-gray-300"
      >
        Back
      </button>
    </div>
  );
}
