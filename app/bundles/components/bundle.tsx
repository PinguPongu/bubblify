import Image from "next/image";
import type { Product } from "@/lib/api";
import AddBundleButton from "./add-bundle-button";

interface BundleProps {
  /** The unique id of the bundle. */
  id: number;
  /** The marketing name of the bundle. */
  name: string;
  /** The products included in the bundle. */
  products: Product[];
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price / 100);
}

export default function Bundle({ id, name, products }: BundleProps) {
  const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
  const previewImage = products[0];

  return (
    <article className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur">
      <div className="relative aspect-[4/3] bg-[radial-gradient(circle_at_top,_rgba(125,211,252,0.35),_transparent_45%),linear-gradient(180deg,_#eff6ff_0%,_#dbeafe_100%)]">
        {previewImage ? (
          <Image
            src={previewImage.image}
            alt={previewImage.name}
            fill
            className="object-contain p-8"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        ) : null}
        <div className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
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
              A ready-made mix of {products.length} bubble products for gifting,
              events, or a faster checkout.
            </p>
          </div>

          <ul className="space-y-2 text-sm text-slate-600">
            {products.map((product) => (
              <li
                key={product.id}
                className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3"
              >
                <span>{product.name}</span>
                <span className="font-medium text-slate-950">
                  {formatPrice(product.price)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Bundle total
            </p>
            <p className="text-3xl font-semibold text-slate-950">
              {formatPrice(totalPrice)}
            </p>
          </div>

          <AddBundleButton products={products} />
        </div>
      </div>
    </article>
  );
}
