import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrdersByTelephone } from "@/lib/api";

interface OrderDetailsPageProps {
  params: Promise<{
    telephone: string;
  }>;
}

async function getOrdersOrNull(telephone: string) {
  try {
    return await getOrdersByTelephone(telephone);
  } catch {
    return null;
  }
}

export default async function OrderDetailsPage({
  params,
}: OrderDetailsPageProps) {
  const { telephone } = await params;
  const orders = await getOrdersOrNull(telephone);

  if (!orders || orders.length === 0) {
    notFound();
  }

  return (
    <main className="px-6 py-10 text-slate-950">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <section className="rounded-3xl border border-slate-200 bg-white px-8 py-10">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-700">
            Order history
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Orders for {telephone}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            These are the orders associated with the telephone number used at
            checkout.
          </p>
        </section>

        <Link
          href="/orders"
          className="inline-flex text-sm font-medium text-sky-700 transition hover:text-sky-800"
        >
          Search another telephone number
        </Link>

        <section className="space-y-6">
          {orders.map((order, index) => (
            <article
              key={`${order.createdAt}-${index}`}
              className="rounded-3xl border border-slate-200 bg-white p-8"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
                    Order {index + 1}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                    {order.customer.name}
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">
                    {order.deliveryMethod === "pickup"
                      ? "Store pickup"
                      : "Home delivery"}
                  </p>
                  {order.deliveryMethod === "delivery" ? (
                    <p className="mt-1 text-sm text-slate-600">
                      {order.customer.address}, {order.customer.postalCode}{" "}
                      {order.customer.city}
                    </p>
                  ) : null}
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Total
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-slate-950">
                    {order.totalPrice} ISK
                  </p>
                </div>
              </div>

              <ul className="mt-6 space-y-3">
                {order.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-600"
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
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
