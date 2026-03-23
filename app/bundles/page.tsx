import Bundle from "./components/bundle";
import { Bubble } from "@/types/types";
import { getBundles, getBubbles } from '@/services/actions'

function isBubble(bubble: Bubble | undefined): bubble is Bubble {
  return bubble !== undefined;
}

export default async function Bundles() {
  const [bundles, bubbles] = await Promise.all([getBundles(), getBubbles()]);
  const bubblesById = new Map(bubbles.map((product) => [product.id, product]));
  const resolvedBundles = bundles.map((bundle) => ({
    id: bundle.id,
    name: bundle.name,
    bubbles: bundle.items
      .map((itemId) => bubblesById.get(itemId))
      .filter(isBubble),
  }));

  return (
    <main className="px-6 py-10 text-stone-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <div className="mb-8 rounded-3xl border-2 border-orange-200 bg-[#fffaf4] px-8 py-8">
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
