"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCheckout } from "../checkout-context";

interface ReviewStepProps {
  /** The server action that submits the completed order. */
  submitAction: (formData: FormData) => Promise<void>;
}

export default function ReviewStep({ submitAction }: ReviewStepProps) {
  const router = useRouter();
  const {
    hasHydrated,
    deliveryMethod,
    customerInfo,
    cartItems,
    totalPrice,
  } = useCheckout();

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    if (!deliveryMethod) {
      router.replace("/checkout/delivery");
      return;
    }

    if (!customerInfo.name || !customerInfo.telephone) {
      router.replace("/checkout/info");
    }
  }, [customerInfo.name, customerInfo.telephone, deliveryMethod, hasHydrated, router]);

  if (!hasHydrated) {
    return (
      <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-base text-slate-600">Loading checkout...</p>
      </section>
    );
  }

  if (cartItems.length === 0) {
    return (
      <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-950">
          Your cart is empty
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Add some bubbles before completing checkout.
        </p>
        <Link
          href="/bubbles"
          className="mt-6 inline-flex rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-600"
        >
          Browse products
        </Link>
      </section>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="space-y-6 rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-600">
            Review
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
            Confirm your order
          </h2>
        </div>

        <div className="space-y-3 rounded-[1.5rem] bg-slate-50 p-5">
          <h3 className="text-lg font-semibold text-slate-950">Delivery</h3>
          <p className="text-sm text-slate-600">
            {deliveryMethod === "pickup" ? "Store pickup" : "Home delivery"}
          </p>
        </div>

        <div className="space-y-3 rounded-[1.5rem] bg-slate-50 p-5">
          <h3 className="text-lg font-semibold text-slate-950">Customer info</h3>
          <p className="text-sm text-slate-600">{customerInfo.name}</p>
          <p className="text-sm text-slate-600">{customerInfo.telephone}</p>
          {deliveryMethod === "delivery" ? (
            <>
              <p className="text-sm text-slate-600">{customerInfo.address}</p>
              <p className="text-sm text-slate-600">
                {customerInfo.postalCode} {customerInfo.city}
              </p>
            </>
          ) : null}
        </div>

        <div className="space-y-3 rounded-[1.5rem] bg-slate-50 p-5">
          <h3 className="text-lg font-semibold text-slate-950">Items</h3>
          <ul className="space-y-3">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-4 text-sm text-slate-600"
              >
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span className="font-medium text-slate-950">
                  {item.price * item.quantity} ISK
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <aside className="h-fit rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-600">
          Final total
        </p>
        <p className="mt-3 text-4xl font-semibold text-slate-950">
          {totalPrice} ISK
        </p>

        <form action={submitAction} className="mt-8 space-y-4">
          <input type="hidden" name="deliveryMethod" value={deliveryMethod ?? ""} />
          <input type="hidden" name="name" value={customerInfo.name} />
          <input type="hidden" name="telephone" value={customerInfo.telephone} />
          <input type="hidden" name="address" value={customerInfo.address} />
          <input type="hidden" name="city" value={customerInfo.city} />
          <input type="hidden" name="postalCode" value={customerInfo.postalCode} />
          <input type="hidden" name="items" value={JSON.stringify(cartItems)} />
          <input type="hidden" name="totalPrice" value={String(totalPrice)} />

          <button
            type="submit"
            className="w-full rounded-full bg-sky-500 px-5 py-3 text-base font-semibold text-white transition hover:bg-sky-600"
          >
            Confirm order
          </button>
        </form>

        <Link
          href="/checkout/info"
          className="mt-4 inline-flex text-sm font-medium text-sky-700 transition hover:text-sky-800"
        >
          Go back to edit details
        </Link>
      </aside>
    </div>
  );
}
