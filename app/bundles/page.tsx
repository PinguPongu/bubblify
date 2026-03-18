import Bundle from "./components/bundle";

const bundles = [
  {
    title: "Starter Splash",
    description:
      "A lighter bundle for small celebrations, thoughtful gifts, or trying out a few custom bubbles.",
    price: "$24",
    bubbleCount: 6,
    accentClassName: "from-cyan-400 via-sky-300 to-blue-500",
  },
  {
    title: "Party Lift",
    description:
      "Built for birthdays and group moments with a more generous mix of colors, sizes, and message space.",
    price: "$42",
    bubbleCount: 12,
    accentClassName: "from-amber-300 via-orange-300 to-rose-400",
  },
  {
    title: "Grand Float",
    description:
      "A fuller statement bundle for launches, larger events, or anyone who wants the complete Bubblify moment.",
    price: "$68",
    bubbleCount: 20,
    accentClassName: "from-emerald-300 via-teal-300 to-cyan-500",
  },
];

export default function Bundles() {
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
            Start simple or go bigger. Each bundle gives you a clean starting
            point for custom bubble gifting, events, and standout surprises.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {bundles.map((bundle) => (
            <Bundle key={bundle.title} {...bundle} />
          ))}
        </section>
      </div>
    </main>
  );
}
