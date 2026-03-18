import Bundle from "./components/bundle";
import { getBundles, getProducts, type Bubble } from "@/lib/api";

function isProduct(product: Bubble | undefined): product is Bubble {
  return product !== undefined;
}

export default async function Bundles() {
  const [bundles, products] = await Promise.all([getBundles(), getProducts()]);
  const productsById = new Map(products.map((product) => [product.id, product]));
  const resolvedBundles = bundles.map((bundle) => ({
    id: bundle.id,
    name: bundle.name,
    products: bundle.items
      .map((itemId) => productsById.get(itemId))
      .filter(isProduct),
  }));

  return (
    <main className="px-6 py-10 text-slate-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <section className="rounded-3xl border border-slate-200 bg-white px-8 py-10">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">
            Bundles
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Pick the bubble bundle that fits the moment.
            </h1>
            <p className="text-lg leading-8 text-slate-600">
              These ready-made sets pull together multiple bubble products into a
              single purchase. Add a whole bundle to cart in one click.
            </p>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {resolvedBundles.map((bundle) => (
            <Bundle key={bundle.id} {...bundle} />
          ))}
        </section>
      </div>
    </main>
  );
}
