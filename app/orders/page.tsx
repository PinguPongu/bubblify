import { redirect } from "next/navigation";
import { getOrdersByTelephone } from "@/services/actions";

interface OrdersPageProps {
  searchParams: Promise<{
    telephone?: string;
  }>;
}

async function hasOrders(telephone: string): Promise<boolean> {
  try {
    const orders = await getOrdersByTelephone(telephone);
    return orders.length > 0;
  } catch {
    return false;
  }
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const { telephone } = await searchParams;
  const trimmedTelephone = telephone?.trim() ?? "";

  let hasMatchingOrders = false;

  if (trimmedTelephone) {
    hasMatchingOrders = await hasOrders(trimmedTelephone);

    if (hasMatchingOrders) {
      redirect(`/orders/${encodeURIComponent(trimmedTelephone)}`);
    }
  }

  return (
    <main className="px-6 py-10 text-stone-900">
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        <section className="rounded-3xl border-2 border-orange-200 bg-[#fffaf4] px-8 py-10">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-700">
            Orders
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Find your previous order
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">
            Enter the telephone number used during checkout to look up your past
            Bubblify orders.
          </p>
        </section>

        <section className="rounded-3xl border-2 border-orange-200 bg-[#fffaf4] p-8">
          <form className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <label className="flex-1">
              <span className="mb-2 block text-sm font-medium text-stone-700">
                Telephone number
              </span>
              <input
                type="tel"
                name="telephone"
                defaultValue={trimmedTelephone}
                className="w-full rounded-2xl border-2 border-orange-200 bg-white px-4 py-3 outline-none transition focus:border-orange-400"
                placeholder="5812345"
              />
            </label>

            <button
              type="submit"
              className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Search orders
            </button>
          </form>

          {trimmedTelephone && !hasMatchingOrders ? (
            <p className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              There is no order associated with telephone number{" "}
              <span className="font-semibold">{trimmedTelephone}</span>.
            </p>
          ) : null}
        </section>
      </div>
    </main>
  );
}
