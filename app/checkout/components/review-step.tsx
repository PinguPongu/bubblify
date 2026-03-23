"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCheckout } from "../checkout-context";


// Hér propdrillum fallinu submitOrder sem submitAction proppi, sem tekur við formdatainu og submittar því
interface ReviewStepProps {
  submitAction: (formData: FormData) => Promise<void>;
}

export default function ReviewStep({ submitAction }: ReviewStepProps) {
  const router = useRouter();
  const {
    notLoading,
    deliveryMethod,
    customerInfo,
    cartItems,
    totalPrice,
  } = useCheckout();

  useEffect(() => {
    if (!notLoading) {
      return;
    }

    if (!deliveryMethod) {
      router.replace("/checkout/delivery");
      return;
    }

    if (!customerInfo.name || !customerInfo.telephone) {
      router.replace("/checkout/info");
    }
  }, [customerInfo.name, customerInfo.telephone, deliveryMethod, notLoading, router]);

  if (!notLoading) {
    return (
      <section className="rounded-3xl border-2 border-orange-200 bg-[#fffaf4] p-8">
        <p className="text-base text-stone-600">Loading checkout...</p>
      </section>
    );
  }

  if (cartItems.length === 0) {
    return (
      <section className="rounded-3xl border-2 border-orange-200 bg-[#fffaf4] p-8">
        <h2 className="text-2xl font-semibold text-stone-900">
          Your cart is empty
        </h2>
        <p className="mt-3 text-sm leading-7 text-stone-600">
          Add some bubbles before completing checkout.
        </p>
        <Link
          href="/bubbles"
          className="mt-6 inline-flex rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          Browse products
        </Link>
      </section>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="space-y-6 rounded-3xl border-2 border-orange-200 bg-[#fffaf4] p-8">
        <div>
          <p className="text-sm font-semibold uppercase text-orange-700">
            Review
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-stone-900">
            Confirm your order
          </h2>
        </div>

        <div className="space-y-3 rounded-2xl border-2 border-orange-200 bg-[#fff0dd] p-5">
          <h3 className="text-lg font-semibold text-stone-900">Delivery</h3>
          <p className="text-sm text-stone-600">
            {deliveryMethod === "pickup" ? "Store pickup" : "Home delivery"}
          </p>
        </div>

        <div className="space-y-3 rounded-2xl border-2 border-orange-200 bg-[#fff0dd] p-5">
          <h3 className="text-lg font-semibold text-stone-900">Customer info</h3>
          <p className="text-sm text-stone-600">{customerInfo.name}</p>
          <p className="text-sm text-stone-600">{customerInfo.telephone}</p>
          {deliveryMethod === "delivery" ? (
            <>
              <p className="text-sm text-stone-600">{customerInfo.address}</p>
              <p className="text-sm text-stone-600">
                {customerInfo.postalCode} {customerInfo.city}
              </p>
            </>
          ) : null}
        </div>

        <div className="space-y-3 rounded-2xl border-2 border-orange-200 bg-[#fff0dd] p-5">
          <h3 className="text-lg font-semibold text-stone-900">Items</h3>
          <ul className="space-y-3">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-4 text-sm text-stone-600"
              >
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span className="font-medium text-stone-900">
                  {item.price * item.quantity} ISK
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <aside className="h-fit rounded-3xl border-2 border-orange-200 bg-[#fffaf4] p-6">
        <p className="text-sm font-semibold uppercase text-orange-700">
          Final total
        </p>
        <p className="mt-3 text-4xl font-semibold text-stone-900">
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
            className="w-full rounded-full bg-orange-500 px-5 py-3 text-base font-semibold text-white transition hover:bg-orange-600"
          >
            Confirm order
          </button>
        </form>

        <Link
          href="/checkout/info"
          className="mt-4 inline-flex text-sm font-medium text-orange-700 transition hover:text-orange-800"
        >
          Go back to edit details
        </Link>
      </aside>
    </div>
  );
}
