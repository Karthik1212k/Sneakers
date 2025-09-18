type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
};

const brandStyles: Record<string, { bg: string; fg: string; short: string }> = {
  Jordan: { bg: "bg-red-600", fg: "text-white", short: "J" },
  Nike: { bg: "bg-zinc-900", fg: "text-white", short: "N" },
  Adidas: { bg: "bg-sky-600", fg: "text-white", short: "A" },
  Puma: { bg: "bg-emerald-600", fg: "text-white", short: "P" },
  "New Balance": { bg: "bg-rose-600", fg: "text-white", short: "NB" },
};

import { useState } from "react";
import { useAuth } from "@/store/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { formatINR } from "@/lib/utils";

export default function ProductCard({
  product,
  onAdd,
}: {
  product: Product;
  onAdd?: (p: Product) => void;
}) {
  const [imgError, setImgError] = useState(false);
  const { user, addToWishlist, removeFromWishlist } = useAuth();
  const navigate = useNavigate();

  if (imgError || !product.image) return null;

  // Check if product is already in wishlist
  const isWishlisted = user?.wishlist?.some((p) => p.id === product.id);

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please sign in to add items to cart");
      navigate("/profile");
      return;
    }
    onAdd?.(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlistToggle = () => {
    if (!user) {
      toast.error("Please sign in to use wishlist");
      navigate("/profile");
      return;
    }

    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast.success(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist`);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border bg-white transition-shadow hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-white">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain p-6 transition-transform duration-300 group-hover:scale-[1.02]"
          loading="lazy"
          decoding="async"
          onError={() => setImgError(true)}
        />
        <div className="absolute left-3 top-3">
          <div
            className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ${
              brandStyles[product.brand]?.bg
            } ${brandStyles[product.brand]?.fg}`}
          >
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/15 text-[10px]">
              {brandStyles[product.brand]?.short ?? product.brand[0]}
            </span>
            <span className="uppercase tracking-wide">{product.brand}</span>
          </div>
        </div>

        {/* Wishlist button (top-right corner) */}
        <button
          onClick={handleWishlistToggle}
          className="absolute right-3 top-3 rounded-full bg-white p-2 shadow hover:bg-gray-100"
        >
          {isWishlisted ? "💖" : "🤍"}
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-muted-foreground">{product.brand}</p>
            <h3 className="mt-1 text-base font-semibold leading-tight">
              {product.name}
            </h3>
          </div>
          <p className="text-base font-semibold">{formatINR(product.price)}</p>
        </div>
        <button
          onClick={handleAddToCart}
          className="mt-4 w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
