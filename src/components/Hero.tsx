"use client";

import Link from "next/link";

const HERO_VIDEO =
  "https://videos.pexels.com/video-files/3370926/3370926-uhd_3840_2160_30fps.mp4";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.pexels.com/videos/3370926/free-video-3370926.jpg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      <div className="hero-overlay absolute inset-0" />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute right-1/3 top-1/4 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 pb-16 pt-28 text-center sm:px-6">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-slate-950/40 px-4 py-1.5 backdrop-blur-md">
          <span className="status-dot" />
          <span
            className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            Emergency Identity Protocol
          </span>
        </div>

        <h1
          className="mx-auto max-w-4xl text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >
          WHEN THEY CAN&apos;T SPEAK,
          <br />
          <span className="neon-text">LIFEQR SPEAKS FOR THEM.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg md:text-xl">
          Create a secure emergency profile. Generate a unique QR. Attach it
          anywhere. When every second counts, first responders and bystanders
          unlock life-saving information instantly.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href="#create" className="btn-primary min-w-[220px] text-base">
            <span>⚡</span> Create Emergency Profile
          </a>
          <Link href="/scan" className="btn-secondary min-w-[220px] text-base">
            <span>📷</span> Scan Emergency QR
          </Link>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-widest text-slate-400 sm:gap-10">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400">◆</span> Encrypted IDs
          </div>
          <div className="flex items-center gap-2">
            <span className="text-violet-400">◆</span> Instant Access
          </div>
          <div className="flex items-center gap-2">
            <span className="text-red-400">◆</span> Life-Critical Data
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-cyan-400/70">
        <span className="text-2xl">↓</span>
      </div>
    </section>
  );
}
