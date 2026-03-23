"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { type CartItem } from "@/types/types";
import { CART_STORAGE_KEY } from '@/services/actions'

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
    <main className="px-6 py-10 text-stone-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <section className="rounded-3xl border-2 border-orange-200 bg-[#fffaf4] px-8 py-10">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-700">
            Cart
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Your selected bubbles
          </h1>
        </section>

        {!hasLoaded ? (
          <section className="rounded-3xl border-2 border-orange-200 bg-[#fffaf4] p-8">
            <p className="text-base text-stone-600">Loading cart...</p>
          </section>
        ) : cartItems.length === 0 ? (
          <section className="rounded-3xl border-2 border-orange-200 bg-[#fffaf4] p-8">
            <h2 className="text-2xl font-semibold text-stone-900">
              Your cart is empty
            </h2>
          </section>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
            <section className="space-y-4">
              {cartItems.map((item) => (
                <article
                  key={item.id}
                  className="grid gap-5 rounded-3xl border-2 border-orange-200 bg-[#fffaf4] p-5 sm:grid-cols-[140px_1fr]"
                >
                  <div className="relative aspect-square overflow-hidden rounded-[1.25rem] bg-[#fff0dd]">
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
                        <h2 className="text-2xl font-semibold tracking-tight text-stone-900">
                          {item.name}
                        </h2>
                        <p className="mt-1 text-sm text-stone-500">
                          {item.price} ISK each
                        </p>
                      </div>

                      <p className="text-xl font-semibold text-stone-900">
                        {item.price * item.quantity} ISK
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center rounded-full border-2 border-orange-200 bg-[#fff0dd]">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                          className="px-4 py-2 text-lg font-medium text-stone-700 transition hover:bg-orange-100"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          -
                        </button>
                        <span className="min-w-12 px-3 text-center text-sm font-semibold text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.id)}
                          className="px-4 py-2 text-lg font-medium text-stone-700 transition hover:bg-orange-100"
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

            <aside className="h-fit rounded-3xl border-2 border-orange-200 bg-[#fffaf4] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-700">
                Summary
              </p>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-sm text-stone-600">
                  <span>Total items</span>
                  <span className="font-medium text-stone-900">
                    {totalQuantity}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t-2 border-orange-200 pt-4">
                  <span className="text-base font-medium text-stone-700">
                    Total price
                  </span>
                  <span className="text-3xl font-semibold text-stone-900">
                    {totalPrice} ISK
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={proceedToCheckout}
                className="mt-8 w-full rounded-full bg-orange-500 px-5 py-3 text-base font-semibold text-white transition hover:bg-orange-600"
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
