import { useNavigate } from "react-router-dom";

export default function HelpCenter() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Help Centre</h1>
      <p className="text-muted-foreground mb-6">
        Find answers to common questions or contact our support team.
      </p>

      <div className="space-y-4">
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">How do I track my order?</h3>
          <p className="text-sm text-muted-foreground">
            Go to <b>Orders</b> in your profile to see real-time order status.
          </p>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">What payment methods are accepted?</h3>
          <p className="text-sm text-muted-foreground">
            We accept UPI, Debit/Credit cards, Net banking, and popular wallets.
          </p>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Need more help?</h3>
          <p className="text-sm text-muted-foreground">
            Contact our support team at <b>support@example.com</b> or call <b>1800-123-456</b>.
          </p>
        </div>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-6 rounded-md bg-gray-200 px-4 py-2 hover:bg-gray-300"
      >
        Back
      </button>
    </div>
  );
}
