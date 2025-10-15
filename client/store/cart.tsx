import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/store/auth"; // <- adjust path to your auth store

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
  qty: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "app_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth(); // get logged-in user
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart when component mounts
  useEffect(() => {
    if (!user) {
      // If no user, load from localStorage
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        setItems(raw ? (JSON.parse(raw) as CartItem[]) : []);
      } catch {
        setItems([]);
      }
    } else {
      // If user exists, load from backend (MongoDB)
      fetch(`http://localhost:5000/api/cart/${user._id}`)
        .then((res) => res.json())
        .then((data) => setItems(data.items || []))
        .catch(() => setItems([]));
    }
  }, [user]);

  // Save cart automatically whenever items change
  useEffect(() => {
    if (!user) {
      // Save locally if not logged in
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch {
        // ignore
      }
    } else {
      // Save to backend if logged in
      fetch(`http://localhost:5000/api/cart/${user._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      }).catch(() => {});
    }
  }, [items, user]);

  const addItem: CartContextType["addItem"] = (item, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.id === item.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...prev, { ...item, qty }];
    });
  };

  const increment = (id: string) => {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p)));
  };

  const decrement = (id: string) => {
    setItems((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty: Math.max(0, p.qty - 1) } : p))
        .filter((p) => p.qty > 0),
    );
  };

  const remove = (id: string) => setItems((prev) => prev.filter((p) => p.id !== id));
  const clear = () => setItems([]);

  const { count, subtotal } = useMemo(() => {
    const count = items.reduce((acc, it) => acc + it.qty, 0);
    const subtotal = items.reduce((acc, it) => acc + it.qty * it.price, 0);
    return { count, subtotal };
  }, [items]);

  const value: CartContextType = {
    items,
    addItem,
    increment,
    decrement,
    remove,
    clear,
    count,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
