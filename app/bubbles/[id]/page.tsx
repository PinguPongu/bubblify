import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "../components/add-to-cart-button";
import { getProduct } from "@/lib/api";

interface BubbleDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getProductOrNull(id: number) {
  try {
    return await getProduct(id);
  } catch {
    return null;
  }
}

export default async function BubbleDetailPage({
  params,
}: BubbleDetailPageProps) {
  const { id } = await params;
  const productId = Number(id);

  if (!Number.isInteger(productId)) {
    notFound();
  }

  const product = await getProductOrNull(productId);

  if (!product) {
    notFound();
  }

  return (
    <main className="px-6 py-10 text-slate-950">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/bubbles"
          className="mb-6 inline-flex items-center text-sm font-medium text-sky-700 transition hover:text-sky-800"
        >
          Back to products
        </Link>

        <article className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 shadow-[0_24px_80px_rgba(15,23,42,0.10)] backdrop-blur">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative min-h-[360px] bg-[radial-gradient(circle_at_top,_rgba(125,211,252,0.28),_transparent_42%),linear-gradient(180deg,_#eff6ff_0%,_#ffffff_100%)]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-10"
                sizes="(max-width: 1024px) 100vw, 55vw"
                priority
              />
            </div>

            <div className="flex flex-col justify-between gap-8 p-8 lg:p-10">
              <div className="space-y-5">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-600">
                  Bubble #{product.id}
                </p>
                <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                  {product.name}
                </h1>
                <p className="text-lg leading-8 text-slate-600">
                  {product.description}
                </p>
              </div>

              <div className="space-y-6">
                <div className="rounded-[1.5rem] bg-slate-50 px-6 py-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                    Price
                  </p>
                  <p className="mt-2 text-4xl font-semibold text-slate-950">
                    {product.price} ISK
                  </p>
                </div>

                <AddToCartButton product={product} />
              </div>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
