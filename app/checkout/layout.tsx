import { CheckoutProvider } from "./checkout-context";

interface CheckoutLayoutProps {
  children: React.ReactNode;
}

export default function CheckoutLayout({ children }: CheckoutLayoutProps) {
  return (
    <CheckoutProvider>
      <main className="px-6 py-10 text-slate-950">
        <div className="mx-auto flex max-w-6xl flex-col gap-8">
          <section className="rounded-3xl border border-slate-200 bg-white px-8 py-10">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-700">
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
          {children}
        </div>
      </main>
    </CheckoutProvider>
  );
}
