export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
};

const curatedPool: string[] = [
  // Jordan / generic sneaker shots
  "https://images.pexels.com/photos/18946664/pexels-photo-18946664.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
  "https://images.pexels.com/photos/27298315/pexels-photo-27298315.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
  "https://images.pexels.com/photos/12010216/pexels-photo-12010216.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
  "https://images.pexels.com/photos/2404959/pexels-photo-2404959.png?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
  "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
  "https://images.pexels.com/photos/20298291/pexels-photo-20298291.png?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
  "https://images.pexels.com/photos/20298292/pexels-photo-20298292.png?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
  "https://images.pexels.com/photos/10853637/pexels-photo-10853637.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
  "https://images.pexels.com/photos/27113455/pexels-photo-27113455.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
  "https://images.pexels.com/photos/27008318/pexels-photo-27008318.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
  "https://images.pexels.com/photos/19869753/pexels-photo-19869753.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
  "https://images.pexels.com/photos/9287210/pexels-photo-9287210.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
  "https://images.pexels.com/photos/27988921/pexels-photo-27988921.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
  "https://images.pexels.com/photos/27127413/pexels-photo-27127413.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
];

function nextCurated(): string | null {
  return curatedPool.length ? curatedPool.shift()! : null;
}

function imgFor(index: number, brand: string) {
  const curated = nextCurated();
  if (curated) return curated;
  const q = encodeURIComponent(`sneaker,shoe,${brand}`);
  return `https://source.unsplash.com/800x800/?${q}&sig=${index}`;
}

const adidasImages: string[] = [
  "https://images.pexels.com/photos/19869753/pexels-photo-19869753.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
  "https://images.pexels.com/photos/27113455/pexels-photo-27113455.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
  "https://images.pexels.com/photos/2404959/pexels-photo-2404959.png?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
  "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
  "https://images.pexels.com/photos/27008318/pexels-photo-27008318.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
  "https://images.pexels.com/photos/27988921/pexels-photo-27988921.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
  "https://images.pexels.com/photos/27127413/pexels-photo-27127413.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
  "https://images.pexels.com/photos/20298292/pexels-photo-20298292.png?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
  "https://images.pexels.com/photos/20298291/pexels-photo-20298291.png?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
  "https://images.pexels.com/photos/27298315/pexels-photo-27298315.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
];

const pumaImages: string[] = [
  "https://images.pexels.com/photos/27113455/pexels-photo-27113455.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
  "https://images.pexels.com/photos/27988921/pexels-photo-27988921.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
  "https://images.pexels.com/photos/27008318/pexels-photo-27008318.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
  "https://images.pexels.com/photos/9287210/pexels-photo-9287210.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
  "https://images.pexels.com/photos/2404959/pexels-photo-2404959.png?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
  "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
  "https://images.pexels.com/photos/18946664/pexels-photo-18946664.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
  "https://images.pexels.com/photos/27298315/pexels-photo-27298315.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
  "https://images.pexels.com/photos/19869753/pexels-photo-19869753.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
  "https://images.pexels.com/photos/27127413/pexels-photo-27127413.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
];

const newBalanceImages: string[] = [
  "https://images.pexels.com/photos/20298291/pexels-photo-20298291.png?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
  "https://images.pexels.com/photos/20298292/pexels-photo-20298292.png?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
  "https://images.pexels.com/photos/10853637/pexels-photo-10853637.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
  "https://images.pexels.com/photos/27113455/pexels-photo-27113455.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
  "https://images.pexels.com/photos/27008318/pexels-photo-27008318.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
  "https://images.pexels.com/photos/27988921/pexels-photo-27988921.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
  "https://images.pexels.com/photos/18946664/pexels-photo-18946664.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
  "https://images.pexels.com/photos/27298315/pexels-photo-27298315.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
  "https://images.pexels.com/photos/2404959/pexels-photo-2404959.png?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
  "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1200&dpr=1",
];

function imageForBrand(brand: string, base: number, i: number) {
  if (brand === "Adidas" && i < adidasImages.length) return adidasImages[i];
  if (brand === "Puma" && i < pumaImages.length) return pumaImages[i];
  if (brand === "New Balance" && i < newBalanceImages.length) return newBalanceImages[i];
  return imgFor(base + i, brand);
}

function makeBrandProducts(brand: string, code: string, base: number, names: string[]): Product[] {
  return names.map((n, i) => {
    const price = 499 + ((base + i * 137) % 502); // 499..1001 -> cap to 1000
    return {
      id: `${code}-${i + 1}`,
      name: n,
      brand,
      price: Math.min(1000, price),
      image: imageForBrand(brand, base, i),
    };
  });
}

const jordanNames = [
  "Air Jordan Elevate", "Air Jordan Fusion", "Air Jordan Velocity", "Air Jordan Prime", "Air Jordan Phoenix",
  "Air Jordan Nova", "Air Jordan Eclipse", "Air Jordan Surge", "Air Jordan Matrix", "Air Jordan Apex",
];
const nikeNames = [
  "Nike Air Zoom", "Nike Pegasus X", "Nike React Pulse", "Nike Vaporfly Neo", "Nike Court Fly",
  "Nike Terra Trail", "Nike Metcon Pro", "Nike Infinity Run", "Nike Cloud Runner", "Nike Aero Swift",
];
const adidasNames = [
  "Adidas Ultraboost Pro", "Adidas Street Pro", "Adidas Neo Burst", "Adidas Solar Glide", "Adidas NMD Vibe",
  "Adidas City Racer", "Adidas Nova Run", "Adidas Supernova X", "Adidas Ultra Motion", "Adidas Rivet One",
];
const pumaNames = [
  "Puma Nitro Flex", "Puma Street Phantom", "Puma RS-X Nova", "Puma Velocity Nitro", "Puma Cali Wave",
  "Puma Deviate Elite", "Puma Thunder Spectra", "Puma Liberate", "Puma Mirage Tech", "Puma Slipstream",
];
const nbNames = [
  "NB 990 Heritage", "NB Fresh Foam", "NB 1080 v13", "NB FuelCell Rebel", "NB 327 Retro",
  "NB 550 Classic", "NB More Trail", "NB 1906R", "NB RC Elite", "NB SuperComp",
];

export const products: Product[] = [
  ...makeBrandProducts("Nike", "n", 200, nikeNames),
  ...makeBrandProducts("Adidas", "a", 300, adidasNames),
  ...makeBrandProducts("Puma", "p", 400, pumaNames),
  ...makeBrandProducts("New Balance", "nb", 500, nbNames),
];

export const brands = ["All", ...Array.from(new Set(products.map((p) => p.brand)))];
