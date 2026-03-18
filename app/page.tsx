import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(125,211,252,0.35),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(251,191,36,0.22),_transparent_25%),linear-gradient(180deg,_#f7fbff_0%,_#eef7ff_52%,_#ffffff_100%)] px-6 py-12 text-slate-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-16">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 px-8 py-12 shadow-[0_24px_80px_rgba(56,189,248,0.14)] backdrop-blur md:px-12 md:py-16">
          <div className="absolute -right-10 top-8 h-36 w-36 rounded-full bg-sky-200/50 blur-2xl" />
          <div className="absolute bottom-0 left-0 h-44 w-44 translate-y-1/3 rounded-full bg-cyan-100/70 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
            <div className="max-w-3xl space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-600">
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
                  className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-base font-semibold text-white transition hover:bg-sky-600"
                >
                  Shop Bubbles
                </Link>
                <Link
                  href="/bundles"
                  className="inline-flex items-center justify-center rounded-full border border-sky-200 bg-white px-6 py-3 text-base font-semibold text-sky-700 transition hover:border-sky-300 hover:bg-sky-50"
                >
                  View Bundles
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.75rem] bg-sky-500 p-6 text-white shadow-lg">
                <p className="text-sm uppercase tracking-[0.28em] text-sky-100">
                  Favorite pick
                </p>
                <h2 className="mt-4 text-2xl font-semibold">Bubble Products</h2>
                <p className="mt-3 text-sm leading-6 text-sky-50">
                  Browse the full lineup with clear prices, images, and product
                  details.
                </p>
              </div>

              <div className="rounded-[1.75rem] bg-amber-200 p-6 text-slate-900 shadow-lg">
                <p className="text-sm uppercase tracking-[0.28em] text-amber-700">
                  Built for fun
                </p>
                <h2 className="mt-4 text-2xl font-semibold">Bundle Sets</h2>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  Grab multiple bubble products at once for parties, gifts, and
                  bigger moments.
                </p>
              </div>

              <div className="rounded-[1.75rem] border border-sky-100 bg-white p-6 shadow-sm sm:col-span-2">
                <p className="text-sm uppercase tracking-[0.28em] text-sky-600">
                  What Bubblify does
                </p>
                <p className="mt-3 text-base leading-7 text-slate-600">
                  We keep the experience light: choose your bubbles, build your
                  cart, and move through checkout without extra friction.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-600">
              01
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-slate-950">
              Browse fast
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Jump straight into the bubble catalog and compare products at a
              glance.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-600">
              02
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-slate-950">
              Pick your mix
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Choose single products or ready-made bundles depending on the
              moment.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-600">
              03
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-slate-950">
              Check out cleanly
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Keep the path simple from cart to confirmation, with bubbles
              staying front and center.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
