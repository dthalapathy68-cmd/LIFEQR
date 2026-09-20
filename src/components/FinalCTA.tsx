import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-violet-500/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <div className="glass-strong rounded-3xl px-6 py-14 sm:px-12">
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            Act Now
          </p>
          <h2
            className="text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            One scan can save
            <br />
            <span className="neon-text">precious time.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-slate-400">
            Be ready before the unexpected. Create your LIFEQR profile in
            minutes and carry life-critical clarity wherever you go.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="#create" className="btn-primary min-w-[200px]">
              Create Profile
            </a>
            <Link href="/scan" className="btn-secondary min-w-[200px]">
              Scan a QR
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
