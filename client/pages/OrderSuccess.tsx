import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div className="container mx-auto max-w-lg px-4 py-20 text-center">
      <CheckCircle2 className="mx-auto h-16 w-16 text-green-600" />
      <h1 className="mt-6 text-2xl font-semibold">Order Placed Successfully!</h1>
      <p className="mt-2 text-muted-foreground">
        Thank you for shopping with us. Your order is being processed.
      </p>
      <Link
        to="/collections"
        className="mt-6 inline-block rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary/90"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
