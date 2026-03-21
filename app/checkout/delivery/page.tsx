"use client";

import { useRouter } from "next/navigation";
import { useCheckout, type DeliveryMethod } from "../checkout-context";

const deliveryOptions: Array<{
  value: DeliveryMethod;
  title: string;
}> = [
  {
    value: "pickup",
    title: "Store pickup",
  },
  {
    value: "delivery",
    title: "Home delivery",
  },
];

export default function DeliveryPage() {
  const router = useRouter();
  const { notLoading, cartItems, deliveryMethod, setDeliveryMethod } = useCheckout();

  const handleContinue = () => {
    if (!deliveryMethod) {
      return;
    }

    router.push("/checkout/info");
  };

  if (!notLoading) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-8">
        <p className="text-base text-slate-600">Loading checkout...</p>
      </section>
    );
  }

  if (cartItems.length === 0) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-8">
        <h2 className="text-2xl font-semibold text-slate-950">
          Your cart is empty
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Add products before checking out.
        </p>
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
            className={`rounded-3xl border p-6 text-left transition ${
              isSelected
                ? "border-sky-500 bg-slate-50"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
              Option
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-slate-950">
              {option.title}
            </h2>
          </button>
        );
      })}

      <div className="md:col-span-2">
        <button
          type="button"
          onClick={handleContinue}
          disabled={!deliveryMethod}
          className="rounded-full bg-sky-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Continue to information
        </button>
      </div>
    </section>
  );
}
