"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "nav-blur py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 shadow-[0_0_20px_rgba(34,211,238,0.45)]">
            <span
              className="font-bold text-slate-950"
              style={{ fontFamily: "Orbitron, sans-serif", fontSize: "0.7rem" }}
            >
              LQ
            </span>
          </span>
          <span
            className="text-lg font-bold tracking-wider text-white"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            LIFE<span className="text-cyan-400">QR</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#how-it-works"
            className="text-sm font-medium text-slate-300 transition hover:text-cyan-300"
          >
            How It Works
          </a>
          <a
            href="#create"
            className="text-sm font-medium text-slate-300 transition hover:text-cyan-300"
          >
            Create Profile
          </a>
          <Link
            href="/scan"
            className="text-sm font-medium text-slate-300 transition hover:text-cyan-300"
          >
            Scan QR
          </Link>
          <a href="#create" className="btn-primary !px-5 !py-2.5 text-sm">
            Get Started
          </a>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-500/30 text-cyan-300 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="text-xl">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open && (
        <div className="mt-3 border-t border-cyan-500/10 px-4 pb-4 pt-3 md:hidden">
          <div className="flex flex-col gap-3">
            <a
              href="#how-it-works"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-white/5"
            >
              How It Works
            </a>
            <a
              href="#create"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-white/5"
            >
              Create Profile
            </a>
            <Link
              href="/scan"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-white/5"
            >
              Scan QR
            </Link>
            <a
              href="#create"
              onClick={() => setOpen(false)}
              className="btn-primary text-center text-sm"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
