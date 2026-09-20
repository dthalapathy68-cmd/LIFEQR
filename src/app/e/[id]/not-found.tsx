import Link from "next/link";

export default function EmergencyNotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="glass-strong max-w-md rounded-3xl p-8">
        <p
          className="text-xs uppercase tracking-[0.25em] text-red-400"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >
          Signal Lost
        </p>
        <h1 className="mt-3 text-2xl font-bold text-white">
          Emergency profile not found
        </h1>
        <p className="mt-3 text-sm text-slate-400">
          This LIFEQR ID does not exist or may have been removed.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/scan" className="btn-secondary text-sm">
            Try another ID
          </Link>
          <Link href="/" className="btn-primary text-sm">
            Go Home
          </Link>
        </div>
      </div>
    </main>
  );
}
