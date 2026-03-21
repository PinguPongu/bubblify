import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-600 text-lg font-semibold text-white">
            B
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-lg font-semibold tracking-tight">
              Bubblify
            </span>
            <span className="text-xs uppercase tracking-[0.28em] text-sky-700">
              We love Bubbles.
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="flex flex-wrap items-center gap-2">
          <Link
            href="/bubbles"
            className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Bubbles
          </Link>
          <Link
            href="/bundles"
            className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Bundles
          </Link>
          <Link
            href="/about"
            className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            About us
          </Link>
          <Link
            href="/cart"
            className="rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
          >
            Cart
          </Link>
        </nav>
      </div>
    </header>
  );
}
