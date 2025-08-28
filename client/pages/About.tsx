export default function About() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="heading-display text-3xl font-semibold">About Sneakers</h1>
      <p className="mt-3 text-muted-foreground max-w-2xl">
        Sneakers is a modern destination for premium footwear. We curate performance and lifestyle sneakers across top brands and deliver a clean, fast shopping experience.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border p-6">
          <h2 className="text-lg font-semibold">Our Mission</h2>
          <p className="mt-2 text-sm text-muted-foreground">Empower every step with style and comfort—responsibly sourced products, transparent pricing, and swift delivery.</p>
        </div>
        <div className="rounded-2xl border p-6">
          <h2 className="text-lg font-semibold">What We Offer</h2>
          <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
            <li>Curated collections from Nike, Adidas, Puma, New Balance</li>
            <li>Quick search, brand filters, and seamless cart</li>
            <li>Secure checkout and easy returns</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
