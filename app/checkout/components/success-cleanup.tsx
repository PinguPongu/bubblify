"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCheckout } from "../checkout-context";

interface SuccessCleanupProps {
  telephone?: string;
}

export default function SuccessCleanup({
  telephone,
}: SuccessCleanupProps) {
  const { clearCheckout } = useCheckout();

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      clearCheckout();
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [clearCheckout]);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
        Success
      </p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
        Your order was placed successfully
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
        Bubblify has received your order and the cart has been cleared for the
        next round of bubbles.
      </p>
      {telephone ? (
        <p className="mt-4 text-sm text-slate-500">
          Reference telephone: {telephone}
        </p>
      ) : null}

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/orders"
          className="rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
        >
          View past orders
        </Link>
        <Link
          href="/bubbles"
          className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Shop more bubbles
        </Link>
      </div>
    </section>
  );
}
