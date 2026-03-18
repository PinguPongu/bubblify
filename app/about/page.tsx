

export default function AboutPage() {
  return (
    <main className="px-6 py-10 text-slate-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <section className="rounded-3xl border border-slate-200 bg-white px-8 py-10">
          <div className="max-w-3xl space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-700">
            About Bubblify
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Bubble Trouble.
            </h1>
            <p className="text-lg leading-8 text-slate-600">
              When the bubble world lost one of its main suppliers, Bubblify
              showed up with a simple promise: make it easy to find fun bubble
              products again. The company was created to bring color, play, and
              a little extra delight back to parks, parties, and backyards.
            </p>
            <p className="text-base leading-7 text-slate-600">
              Today, Bubblify focuses on playful products, easy bundles, and a
              clean online shopping experience that helps customers spend less
              time searching and more time making bubbles.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
