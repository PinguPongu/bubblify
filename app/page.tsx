import Link from "next/link";

export default function Home() {
  return (
    <main className="px-6 py-10 text-stone-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <section className="rounded-3xl border-2 border-orange-200 bg-[#fffaf4] px-8 py-12 md:px-12 md:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
            <div className="max-w-3xl space-y-6">
              <p className="text-sm font-semibold uppercase text-orange-700">
                Bubblify
              </p>
              <h1 className="text-5xl font-semibold text-stone-900 sm:text-6xl">
                No troubles.
                <br />
                Only bubbles.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-stone-600">
                Look at bubbles. Shop for bubbles. 
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
