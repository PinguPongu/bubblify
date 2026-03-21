import Bundle from "./components/bundle";
import { getBundles, getProducts, type Bubble } from "@/types/api";

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
          <div className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight">Bubble Bundles</h1>
          </div>
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {resolvedBundles.map((bundle) => (
            <Bundle key={bundle.id} {...bundle} />
          ))}
        </section>
      </div>
    </main>
  );
}
