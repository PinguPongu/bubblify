
export default function AboutPage() {
  return (
    <main className="px-6 py-10 text-stone-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <section className="rounded-3xl border-2 border-orange-200 bg-[#fffaf4] px-8 py-10">
          <div className="max-w-3xl space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-700">
              About Bubblify
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Bubble Trouble.
            </h1>
            <p className="text-lg leading-8 text-stone-600">
              Since the turn of the millennium, we have been a powerhouse in bubble production. We love Bubbles and always will.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
