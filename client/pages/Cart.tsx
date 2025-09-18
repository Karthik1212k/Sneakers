import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";

import { useCart } from "@/store/cart";
import { formatINR } from "@/lib/utils";

export default function Cart() {
  const { items, increment, decrement, remove, subtotal } = useCart();
  const navigate = useNavigate(); // ✅ added navigate hook

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-xl rounded-2xl border p-10 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
            <ShoppingBag className="h-7 w-7" />
          </div>
          <h1 className="heading-display text-2xl font-semibold">
            Your cart is empty
          </h1>
          <p className="mt-2 text-muted-foreground">
            Add your favorite Jordans and elevate your rotation.
          </p>
          <Link
            to="/collections"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary/90"
          >
            Shop Collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto grid gap-8 px-4 py-12 lg:grid-cols-12">
      {/* Cart Items */}
      <div className="lg:col-span-8 space-y-4">
        {items.map((it) => (
          <div
            key={it.id}
            className="flex items-center gap-4 rounded-xl border p-4"
          >
            <div className="h-24 w-24 overflow-hidden rounded-lg bg-neutral-100">
              <img
                src={it.image}
                alt={it.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">{it.brand}</p>
              <h3 className="font-semibold">{it.name}</h3>
              <div className="mt-2 flex items-center gap-3 text-sm">
                <button
                  onClick={() => decrement(it.id)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border hover:bg-muted"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-[2rem] text-center">{it.qty}</span>
                <button
                  onClick={() => increment(it.id)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border hover:bg-muted"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
                <button
                  onClick={() => remove(it.id)}
                  className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-md border hover:bg-muted"
                  aria-label="Remove item"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">
                {formatINR(it.price * it.qty)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <aside className="lg:col-span-4">
        <div className="rounded-xl border p-6">
          <h2 className="heading-display text-xl font-semibold">
            Order Summary
          </h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>—</span>
            </div>
          </div>
          <div className="mt-4 border-t pt-4">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{formatINR(subtotal)}</span>
            </div>

            {/* ✅ Checkout button navigates to Address page */}
            <button
              onClick={() => navigate("/address")}
              className="mt-6 w-full rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary/90"
            >
              Checkout
            </button>

            <p className="mt-2 text-center text-xs text-muted-foreground">
              Secure checkout. Free returns within 30 days.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
