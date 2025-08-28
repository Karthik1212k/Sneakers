import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";

const heroShoes = [
  {
    src: "https://images.pexels.com/photos/18946664/pexels-photo-18946664.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200&dpr=1",
    alt: "Red and black sports sneaker on dark background",
  },
  {
    src: "https://images.pexels.com/photos/27298315/pexels-photo-27298315.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200&dpr=1",
    alt: "White leather sneaker with black laces on red background",
  },
  {
    src: "https://images.pexels.com/photos/12010216/pexels-photo-12010216.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200&dpr=1",
    alt: "Orange and white sneaker close-up",
  },
  {
    src: "https://images.pexels.com/photos/20298291/pexels-photo-20298291.png?auto=compress&cs=tinysrgb&w=1600&h=1200&dpr=1",
    alt: "Nike Dunk Low cacao wow on white",
  },
  {
    src: "https://images.pexels.com/photos/27113455/pexels-photo-27113455.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200&dpr=1",
    alt: "Orange sneakers studio shot",
  },
];

export default function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", duration: 20 });

  useEffect(() => {
    if (!emblaApi) return;
    const id = setInterval(() => {
      if (!emblaApi) return;
      if (emblaApi.canScrollNext()) emblaApi.scrollNext();
      else emblaApi.scrollTo(0);
    }, 2500);
    return () => clearInterval(id);
  }, [emblaApi]);

  return (
    <section className="relative isolate brand-gradient">
      <div className="container mx-auto grid items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-20 lg:py-28">
        <div className="order-2 md:order-1">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">New Drop</p>
          <h1 className="heading-display mt-2 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
            Elevate Your Game with <span className="text-primary">Sneakers</span>
          </h1>
          <p className="mt-5 max-w-xl text-muted-foreground">
            Precision, power, and style. Engineered for performance on the court and built for life off it. Explore the latest from Nike, Adidas, Puma, and New Balance.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="/collections" className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/90">Shop Collections</a>
            <a href="#featured" className="inline-flex items-center justify-center rounded-md border px-5 py-3 text-sm font-semibold transition-colors hover:bg-muted">View Featured</a>
          </div>
        </div>
        <div className="relative order-1 md:order-2">
          <div className="pointer-events-none absolute -left-10 -top-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-8 bottom-6 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative overflow-hidden rounded-2xl bg-neutral-900">
            <div className="aspect-[4/3]" ref={emblaRef}>
              <div className="flex h-full">
                {heroShoes.map((img, i) => (
                  <div className="min-w-0 flex-[0_0_100%]" key={i}>
                    <div className="relative h-[360px] sm:h-[460px] lg:h-[560px]">
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="absolute inset-0 h-full w-full object-cover"
                        loading={i === 0 ? "eager" : "lazy"}
                        decoding="async"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-neutral-900/70 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
