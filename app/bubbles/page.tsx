import Image from "next/image";
import Link from "next/link";
import { Bubble } from "@/lib/api";

const API_URL = process.env.API_URL ?? "http://localhost:3500/api";

async function getProducts(): Promise<Bubble[]> {
  const response = await fetch(`${API_URL}/bubbles`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch bubble products.");
  }

  return response.json();
}


export default async function BubblesPage() {
  const products = await getProducts();

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Bubble Products</h1>
        <p className="mt-2 text-base text-zinc-600">
          Explore the full Bubblify collection and pick your next favorite
          bubbles.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/bubbles/${product.id}`}
            className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:border-sky-300"
          >
            <div className="relative aspect-square border-b border-slate-200 bg-slate-50">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover"
              />
            </div>

            <div className="space-y-3 p-5">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-xl font-semibold text-zinc-900">
                  {product.name}
                </h2>
                <span className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-semibold text-slate-700">
                  {product.price} ISK
                </span>
              </div>

              <p className="line-clamp-2 text-sm leading-6 text-zinc-600">
                {product.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
