import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-orange-200 bg-[#fffaf4]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 text-lg font-semibold text-white">
            B
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-lg font-semibold tracking-tight">
              Bubblify
            </span>
            <span className="text-xs uppercase tracking-[0.28em] text-orange-700">
              We love Bubbles.
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="flex flex-wrap items-center gap-2">
          <Link
            href="/bubbles"
            className="rounded-full px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-orange-100"
          >
            Bubbles
          </Link>
          <Link
            href="/bundles"
            className="rounded-full px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-orange-100"
          >
            Bundles
          </Link>
          <Link
            href="/about"
            className="rounded-full px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-orange-100"
          >
            About us
          </Link>
          <Link
            href="/cart"
            className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            Cart
          </Link>
        </nav>
      </div>
    </header>
  );
}
