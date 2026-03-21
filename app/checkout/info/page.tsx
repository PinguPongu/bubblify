"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCheckout } from "../checkout-context";

interface ValidationErrors {
  name?: string;
  address?: string;
  city?: string;
  telephone?: string;
  postalCode?: string;
}

export default function CheckoutInfoPage() {
  const router = useRouter();
  const {
    notLoading: hasHydrated,
    deliveryMethod,
    customerInfo,
    cartItems,
    updateCustomerInfo,
  } = useCheckout();
  const [errors, setErrors] = useState<ValidationErrors>({});

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    if (!deliveryMethod) {
      router.replace("/checkout/delivery");
    }
  }, [deliveryMethod, hasHydrated, router]);

  const validate = () => {
    const nextErrors: ValidationErrors = {};

    if (!customerInfo.name.trim()) {
      nextErrors.name = "Name is required.";
    }

    if (!customerInfo.telephone.trim()) {
      nextErrors.telephone = "Telephone is required.";
    }

    if (deliveryMethod === "delivery") {
      if (!customerInfo.address.trim()) {
        nextErrors.address = "Address is required for delivery.";
      }

      if (!customerInfo.city.trim()) {
        nextErrors.city = "City is required for delivery.";
      }

      if (!customerInfo.postalCode.trim()) {
        nextErrors.postalCode = "Postal code is required for delivery.";
      }
    }

    return nextErrors;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    router.push("/checkout/review");
  };

  if (!hasHydrated) {
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
          Add products before starting the checkout flow.
        </p>
        <Link
          href="/bubbles"
          className="mt-6 inline-flex rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
        >
          Browse products
        </Link>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
        Customer details
      </p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
        {deliveryMethod === "pickup"
          ? "Tell us who is picking up"
          : "Where should we send the order?"}
      </h2>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-6 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">Name</span>
          <input
            type="text"
            value={customerInfo.name}
            onChange={(event) =>
              updateCustomerInfo({ name: event.target.value })
            }
            className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sky-400"
          />
          {errors.name ? (
            <span className="text-sm text-rose-600">{errors.name}</span>
          ) : null}
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">Telephone</span>
          <input
            type="tel"
            value={customerInfo.telephone}
            onChange={(event) =>
              updateCustomerInfo({ telephone: event.target.value })
            }
            className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sky-400"
          />
          {errors.telephone ? (
            <span className="text-sm text-rose-600">{errors.telephone}</span>
          ) : null}
        </label>

        {deliveryMethod === "delivery" ? (
          <>
            <label className="flex flex-col gap-2 md:col-span-2">
              <span className="text-sm font-medium text-slate-700">Address</span>
              <input
                type="text"
                value={customerInfo.address}
                onChange={(event) =>
                  updateCustomerInfo({ address: event.target.value })
                }
                className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sky-400"
              />
              {errors.address ? (
                <span className="text-sm text-rose-600">{errors.address}</span>
              ) : null}
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-slate-700">City</span>
              <input
                type="text"
                value={customerInfo.city}
                onChange={(event) =>
                  updateCustomerInfo({ city: event.target.value })
                }
                className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sky-400"
              />
              {errors.city ? (
                <span className="text-sm text-rose-600">{errors.city}</span>
              ) : null}
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-slate-700">
                Postal code
              </span>
              <input
                type="text"
                value={customerInfo.postalCode}
                onChange={(event) =>
                  updateCustomerInfo({ postalCode: event.target.value })
                }
                className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sky-400"
              />
              {errors.postalCode ? (
                <span className="text-sm text-rose-600">
                  {errors.postalCode}
                </span>
              ) : null}
            </label>
          </>
        ) : null}

        <div className="flex flex-wrap gap-4 md:col-span-2">
          <Link
            href="/checkout/delivery"
            className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Back
          </Link>
          <button
            type="submit"
            className="rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
          >
            Continue to review
          </button>
        </div>
      </form>
    </section>
  );
}
