"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CART_STORAGE_KEY, type CartItem } from "@/lib/cart";

function readCartItems(): CartItem[] {
  const storedItems = window.localStorage.getItem(CART_STORAGE_KEY);

  if (!storedItems) {
    return [];
  }

  try {
    return JSON.parse(storedItems) as CartItem[];
  } catch {
    return [];
  }
}

function writeCartItems(items: CartItem[]) {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setCartItems(readCartItems());
      setHasLoaded(true);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  const totalPrice = useMemo(
    () =>
      cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const totalQuantity = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const updateCart = (nextItems: CartItem[]) => {
    setCartItems(nextItems);
    writeCartItems(nextItems);
  };

  const increaseQuantity = (itemId: number) => {
    const nextItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );

    updateCart(nextItems);
  };

  const decreaseQuantity = (itemId: number) => {
    const nextItems = cartItems
      .map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(nextItems);
  };

  const removeItem = (itemId: number) => {
    const nextItems = cartItems.filter((item) => item.id !== itemId);
    updateCart(nextItems);
  };

  const proceedToCheckout = () => {
    router.push("/checkout/delivery");
  };

  return (
    <main className="px-6 py-10 text-slate-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <section className="rounded-[2rem] border border-white/70 bg-white/85 px-8 py-10 shadow-[0_24px_80px_rgba(56,189,248,0.10)] backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-600">
            Cart
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Your selected bubbles
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Review your items, adjust quantities, and continue to checkout when
            everything looks right.
          </p>
        </section>

        {!hasLoaded ? (
          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-base text-slate-600">Loading cart...</p>
          </section>
        ) : cartItems.length === 0 ? (
          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-950">
              Your cart is empty
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">
              Add a few bubble products or a bundle first, then come back here
              to review your order.
            </p>
            <Link
              href="/bubbles"
              className="mt-6 inline-flex rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-600"
            >
              Browse products
            </Link>
          </section>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
            <section className="space-y-4">
              {cartItems.map((item) => (
                <article
                  key={item.id}
                  className="grid gap-5 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-[140px_1fr]"
                >
                  <div className="relative aspect-square overflow-hidden rounded-[1.25rem] bg-slate-50">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="140px"
                      className="object-contain p-4"
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                          {item.name}
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                          {item.price} ISK each
                        </p>
                      </div>

                      <p className="text-xl font-semibold text-slate-950">
                        {item.price * item.quantity} ISK
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center rounded-full border border-slate-200 bg-slate-50">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                          className="px-4 py-2 text-lg font-medium text-slate-700 transition hover:bg-slate-100"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          -
                        </button>
                        <span className="min-w-12 px-3 text-center text-sm font-semibold text-slate-950">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.id)}
                          className="px-4 py-2 text-lg font-medium text-slate-700 transition hover:bg-slate-100"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="rounded-full border border-rose-200 px-4 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            <aside className="h-fit rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-600">
                Summary
              </p>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Total items</span>
                  <span className="font-medium text-slate-950">
                    {totalQuantity}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                  <span className="text-base font-medium text-slate-700">
                    Total price
                  </span>
                  <span className="text-3xl font-semibold text-slate-950">
                    {totalPrice} ISK
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={proceedToCheckout}
                className="mt-8 w-full rounded-full bg-sky-500 px-5 py-3 text-base font-semibold text-white transition hover:bg-sky-600"
              >
                Proceed to checkout
              </button>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
