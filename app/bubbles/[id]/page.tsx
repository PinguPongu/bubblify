import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "../components/add-to-cart-button";
import { getBubble } from '@/services/actions'

interface BubbleDetailPageProps {
  params: Promise<{id: string}>;
}

async function getBubbleOrNull(id: number) {
  try {
    return await getBubble(id);
  } catch {
    return null;
  }
}

export default async function BubbleDetailPage({
  params,
}: BubbleDetailPageProps) {
  const { id } = await params;
  const bubbleId = Number(id);

  if (!Number.isInteger(bubbleId)) {
    notFound();
  }

  const bubble = await getBubbleOrNull(bubbleId);

  if (!bubble) {
    notFound();
  }

  return (
    <main className="px-6 py-10 text-slate-950">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/bubbles"
          className="mb-6 inline-flex items-center text-sm font-medium text-sky-700 transition hover:text-sky-800"
        >
          Back to Bubbles
        </Link>

        <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative min-h-[360px] border-b border-slate-200 bg-slate-50 lg:border-b-0 lg:border-r">
              <Image
                src={bubble.image}
                alt={bubble.name}
                fill
                className="object-contain p-10"
                sizes="(max-width: 1024px) 100vw, 55vw"
                priority
              />
            </div>

            <div className="flex flex-col justify-between gap-8 p-8 lg:p-10">
              <div className="space-y-5">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-600">
                  Bubble #{bubble.id}
                </p>
                <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                  {bubble.name}
                </h1>
                <p className="text-lg leading-8 text-slate-600">
                  {bubble.description}
                </p>
              </div>

              <div className="space-y-6">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                    Price
                  </p>
                  <p className="mt-2 text-4xl font-semibold text-slate-950">
                    {bubble.price} ISK
                  </p>
                </div>

                <AddToCartButton bubble={bubble} />
              </div>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
