import Image from "next/image";
import Link from "next/link";
import { getBubbles } from '@/services/actions'

export default async function BubblesPage() {
  const bubbles = await getBubbles();

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 text-stone-900">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Bubbles</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {bubbles.map((product) => (
          <Link
            key={product.id}
            href={`/bubbles/${product.id}`}
            className="group overflow-hidden rounded-3xl border-2 border-orange-200 bg-[#fffaf4] transition hover:border-orange-300"
          >
            <div className="relative aspect-square border-b-2 border-orange-200 bg-[#fff3e4]">
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
                <h2 className="text-xl font-semibold text-stone-900">
                  {product.name}
                </h2>
                <span className="shrink-0 rounded-full border-2 border-orange-200 bg-[#fff0dd] px-3 py-1 text-sm font-semibold text-stone-700">
                  {product.price} ISK
                </span>
              </div>

              <p className="line-clamp-2 text-sm leading-6 text-stone-600">
                {product.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
