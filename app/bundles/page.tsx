import Bundle from "./components/bundle";
import { getBundles, getProducts, type Product } from "@/lib/api";

function isProduct(product: Product | undefined): product is Product {
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
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(125,211,252,0.28),_transparent_28%),linear-gradient(180deg,_#f8fbff_0%,_#eef6ff_52%,_#f8fafc_100%)] px-6 py-16 text-slate-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <section className="max-w-3xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
            Bundles
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Pick the bubble bundle that fits the moment.
          </h1>
          <p className="text-lg leading-8 text-slate-600">
            These ready-made sets pull together multiple bubble products into a
            single purchase. Add a whole bundle to cart in one click.
          </p>
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
