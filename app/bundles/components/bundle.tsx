type BundleProps = {
  title: string;
  description: string;
  price: string;
  bubbleCount: number;
  accentClassName?: string;
};

export default function Bundle({
  title,
  description,
  price,
  bubbleCount,
  accentClassName = "from-cyan-400 via-sky-300 to-blue-500",
}: BundleProps) {
  return (
    <article className="group relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur">
      <div
        className={`absolute inset-x-6 top-0 h-1 rounded-full bg-gradient-to-r ${accentClassName}`}
      />

      <div className="relative flex h-full flex-col gap-5">
        <div className="space-y-3">
          <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            {bubbleCount} bubble pack
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              {title}
            </h2>
            <p className="text-sm leading-6 text-slate-600">{description}</p>
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Starting at
            </p>
            <p className="text-3xl font-semibold text-slate-950">{price}</p>
          </div>

          <button
            type="button"
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition-transform duration-200 group-hover:-translate-y-0.5"
          >
            Choose bundle
          </button>
        </div>
      </div>
    </article>
  );
}
