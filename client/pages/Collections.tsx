import ProductGrid from "@/components/products/ProductGrid";

export default function Collections() {
  return (
    <div>
      <div className="container mx-auto px-4 py-10">
        <h1 className="heading-display text-3xl font-semibold">Collections</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Explore curated Jordan drops and timeless icons. More filters and categories coming soon.
        </p>
      </div>
      <ProductGrid />
    </div>
  );
}
