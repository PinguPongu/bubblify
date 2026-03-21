

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
              Here we sell some funny bubbles.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
