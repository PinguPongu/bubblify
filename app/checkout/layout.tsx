import Link from "next/link";
import { CheckoutProvider } from "./checkout-context";

interface CheckoutLayoutProps {
  /** The nested checkout pages. */
  children: React.ReactNode;
}

const checkoutSteps = [
  { href: "/checkout/delivery", label: "Delivery" },
  { href: "/checkout/info", label: "Info" },
  { href: "/checkout/review", label: "Review" },
  { href: "/checkout/success", label: "Success" },
];

export default function CheckoutLayout({ children }: CheckoutLayoutProps) {
  return (
    <CheckoutProvider>
      <main className="px-6 py-10 text-slate-950">
        <div className="mx-auto flex max-w-6xl flex-col gap-8">
          <section className="rounded-[2rem] border border-white/70 bg-white/85 px-8 py-10 shadow-[0_24px_80px_rgba(56,189,248,0.10)] backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-600">
              Checkout
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Finish your bubble order
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Choose delivery, enter your details, review the order, and
              confirm when everything looks right.
            </p>
          </section>

          <nav aria-label="Checkout steps" className="flex flex-wrap gap-3">
            {checkoutSteps.map((step, index) => (
              <Link
                key={step.href}
                href={step.href}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
              >
                {index + 1}. {step.label}
              </Link>
            ))}
          </nav>

          {children}
        </div>
      </main>
    </CheckoutProvider>
  );
}
