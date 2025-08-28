import Hero from "@/components/sections/Hero";
import ProductGrid from "@/components/products/ProductGrid";

export default function Index() {
  return (
    <div>
      <Hero />
      <ProductGrid />
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-6 overflow-hidden rounded-2xl border bg-gradient-to-r from-neutral-900 to-neutral-800 p-8 text-white sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Join the Club</p>
            <h3 className="heading-display mt-2 text-2xl font-semibold">Become a Member</h3>
            <p className="mt-3 text-white/80">Get early access to drops, exclusive offers, and personalized recommendations.</p>
          </div>
          <form className="flex w-full items-center gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="h-11 w-full rounded-md border border-white/10 bg-white/10 px-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <button type="submit" className="h-11 shrink-0 rounded-md bg-primary px-5 font-semibold text-white hover:bg-primary/90">Join</button>
          </form>
        </div>
      </section>
    </div>
  );
}
