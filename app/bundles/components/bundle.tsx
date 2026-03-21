import Image from "next/image";
import type { Bubble } from "@/types/types";
import AddBundleButton from "./add-bundle-button";

interface BundleProps {
  id: number;
  name: string;
  bubbles: Bubble[];
}


export default function Bundle({ id, name, bubbles }: BundleProps) {
  const totalPrice = bubbles.reduce((sum, bubble) => sum + bubble.price, 0);
  const previewImage = bubbles[0];

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
      <div className="relative aspect-[4/3] border-b border-slate-200 bg-slate-50">
        {previewImage ? (
          <Image
            src={previewImage.image}
            alt={previewImage.name}
            fill
            className="object-contain p-8"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        ) : null}
        <div className="absolute left-5 top-5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
          Bundle #{id}
        </div>
      </div>

      <div className="flex h-full flex-col gap-5 p-6">
        <div className="space-y-3">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              {name}
            </h2>
            <p className="text-sm leading-6 text-slate-600">
              This bundle contains {bubbles.length} Bubbles:
            </p>
          </div>

          <ul className="space-y-2 text-sm text-slate-600">
            {bubbles.map((product) => (
              <li
                key={product.id}
                className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
              >
                <span>{product.name}</span>
                <span className="font-medium text-slate-950">
                  {product.price} ISK
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Bundle total
            </p>
            <p className="flex justify-between items-center text-3xl font-semibold text-slate-950">
              {totalPrice} ISK
              <AddBundleButton products={bubbles} />
            </p>
          </div> 
        </div>
      </div>
    </article>
  );
}
