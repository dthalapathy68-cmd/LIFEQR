import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-cyan-500/10 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2">
          <span
            className="text-sm font-bold tracking-wider text-white"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            LIFE<span className="text-cyan-400">QR</span>
          </span>
          <span className="text-xs text-slate-500">
            · Emergency identity for the real world
          </span>
        </div>
        <div className="flex gap-6 text-xs text-slate-500">
          <a href="#how-it-works" className="hover:text-cyan-300">
            How it works
          </a>
          <a href="#create" className="hover:text-cyan-300">
            Create
          </a>
          <Link href="/scan" className="hover:text-cyan-300">
            Scan
          </Link>
        </div>
      </div>
      <p className="mt-6 text-center text-[11px] text-slate-600">
        Public profiles show only essential emergency information. Not a
        substitute for professional medical care.
      </p>
    </footer>
  );
}
