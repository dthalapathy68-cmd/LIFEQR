const STEPS = [
  {
    n: "01",
    title: "Create Profile",
    desc: "Enter essential medical details, allergies, and trusted emergency contacts in under a minute.",
    icon: "🧬",
  },
  {
    n: "02",
    title: "Get Your QR",
    desc: "LIFEQR generates a unique emergency ID and a high-contrast QR linked to your public safety card.",
    icon: "⬡",
  },
  {
    n: "03",
    title: "Attach It Anywhere",
    desc: "Print or save it on helmets, bags, phones, bracelets, vehicles, or ID cards — always within reach.",
    icon: "📎",
  },
  {
    n: "04",
    title: "Scan During Emergency",
    desc: "Anyone with a camera can scan and instantly unlock critical info when you cannot speak.",
    icon: "📡",
  },
  {
    n: "05",
    title: "Contact Trusted Person",
    desc: "One tap calls your emergency contact so help and family coordination start immediately.",
    icon: "📞",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-violet-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-14 text-center">
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            Protocol Flow
          </p>
          <h2
            className="text-3xl font-bold text-white sm:text-4xl md:text-5xl"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            How <span className="neon-text">LIFEQR</span> Works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Five steps from silent crisis to actionable help — designed for
            speed, clarity, and real-world emergencies.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step, i) => (
            <div
              key={step.n}
              className="step-card glass relative rounded-2xl p-5"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="mb-4 flex items-center justify-between">
                <span
                  className="text-xs font-bold text-cyan-400/80"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                  {step.n}
                </span>
                <span className="text-2xl">{step.icon}</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-400">
                {step.desc}
              </p>
              {i < STEPS.length - 1 && (
                <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-cyan-500/40 lg:block">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
