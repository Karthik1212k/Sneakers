export default function Contact() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="heading-display text-3xl font-semibold">Contact Us</h1>
      <p className="mt-2 text-muted-foreground">We'd love to hear from you. Send us a message and we’ll respond as soon as possible.</p>
      <form className="mt-8 grid gap-4">
        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="name">Name</label>
          <input id="name" name="name" className="h-11 rounded-md border px-3 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Your name" required />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="email">Email</label>
          <input id="email" type="email" name="email" className="h-11 rounded-md border px-3 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="you@example.com" required />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="message">Message</label>
          <textarea id="message" name="message" className="min-h-[140px] rounded-md border p-3 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="How can we help?" required />
        </div>
        <button type="submit" className="h-11 rounded-md bg-primary px-5 text-sm font-semibold text-white hover:bg-primary/90">Send Message</button>
      </form>
    </div>
  );
}
