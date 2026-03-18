"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCheckout, type DeliveryMethod } from "../checkout-context";

const deliveryOptions: Array<{
  value: DeliveryMethod;
  title: string;
  description: string;
}> = [
  {
    value: "pickup",
    title: "Store pickup",
    description: "Pick the order up yourself and keep the process quick.",
  },
  {
    value: "delivery",
    title: "Home delivery",
    description: "Have the bubbles sent out with your full address details.",
  },
];

export default function DeliveryPage() {
  const router = useRouter();
  const { hasHydrated, cartItems, deliveryMethod, setDeliveryMethod } =
    useCheckout();

  const handleContinue = () => {
    if (!deliveryMethod) {
      return;
    }

    router.push("/checkout/info");
  };

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
          Add products before starting the checkout flow.
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
    <section className="grid gap-6 md:grid-cols-2">
      {deliveryOptions.map((option) => {
        const isSelected = deliveryMethod === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setDeliveryMethod(option.value)}
            className={`rounded-[1.75rem] border p-6 text-left shadow-sm transition ${
              isSelected
                ? "border-sky-400 bg-sky-50"
                : "border-slate-200 bg-white hover:border-sky-200 hover:bg-sky-50/50"
            }`}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-600">
              Option
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-slate-950">
              {option.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {option.description}
            </p>
          </button>
        );
      })}

      <div className="md:col-span-2">
        <button
          type="button"
          onClick={handleContinue}
          disabled={!deliveryMethod}
          className="rounded-full bg-sky-500 px-6 py-3 text-base font-semibold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Continue to information
        </button>
      </div>
    </section>
  );
}
