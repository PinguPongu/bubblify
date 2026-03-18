import Link from "next/link";

export default function Home() {
  return (
    <main className="px-6 py-10 text-slate-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <section className="rounded-3xl border border-slate-200 bg-white px-8 py-12 md:px-12 md:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
            <div className="max-w-3xl space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-700">
                Bubblify
              </p>
              <h1 className="text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
                No troubles.
                <br />
                Only bubbles.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                Bright bubble products, playful bundles, and a smoother path to
                checkout. Everything here is built to keep the fun part easy.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/bubbles"
                  className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-sky-700"
                >
                  Shop Bubbles
                </Link>
                <Link
                  href="/bundles"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  View Bundles
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
