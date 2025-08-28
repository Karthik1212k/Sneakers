export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-4 py-10 grid gap-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F09934d5abe324b818cbf63255928be0d%2F5d5991ddb68946ae9c74552973c4c751?format=webp&width=160"
              alt="Sneakers logo"
              className="h-8 w-8 rounded object-cover"
            />
            <span className="heading-display text-xl font-semibold tracking-tight">Sneakers</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm">
            Premium sneakers curated for performance and style.
          </p>
        </div>
        <nav className="grid grid-cols-2 gap-6 text-sm">
          <div className="space-y-3">
            <p className="font-semibold">Shop</p>
            <a className="text-muted-foreground hover:text-foreground" href="/collections">Collections</a>
            <a className="text-muted-foreground hover:text-foreground" href="#">New Arrivals</a>
            <a className="text-muted-foreground hover:text-foreground" href="#">Best Sellers</a>
          </div>
          <div className="space-y-3">
            <p className="font-semibold">Support</p>
            <a className="text-muted-foreground hover:text-foreground" href="#">Help Center</a>
            <a className="text-muted-foreground hover:text-foreground" href="#">Shipping</a>
            <a className="text-muted-foreground hover:text-foreground" href="#">Returns</a>
          </div>
        </nav>
        <div className="text-sm text-muted-foreground md:text-right">
          <p>&copy; {new Date().getFullYear()} Sneakers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
