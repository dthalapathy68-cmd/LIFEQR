"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function ScanPage() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function extractId(input: string): string | null {
    const trimmed = input.trim();
    if (!trimmed) return null;

    // Full URL containing /e/<uuid>
    const urlMatch = trimmed.match(
      /\/e\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i,
    );
    if (urlMatch) return urlMatch[1];

    // Raw UUID
    const uuidMatch = trimmed.match(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    );
    if (uuidMatch) return uuidMatch[0];

    return null;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const id = extractId(value);
    if (!id) {
      setError(
        "Enter a valid LIFEQR emergency ID or full profile URL from a scanned QR.",
      );
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/profiles/${id}`);
      if (!res.ok) {
        setError("No emergency profile found for that ID.");
        return;
      }
      router.push(`/e/${id}`);
    } catch {
      setError("Unable to verify profile. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen">
      <header className="nav-blur sticky top-0 z-40">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 text-[10px] font-bold text-slate-950">
              LQ
            </span>
            <span
              className="text-sm font-bold tracking-wider text-white"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              LIFE<span className="text-cyan-400">QR</span>
            </span>
          </Link>
          <Link href="/" className="text-xs text-slate-400 hover:text-cyan-300">
            Home
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-lg px-4 py-16 sm:px-6">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-500/10 text-3xl shadow-[0_0_30px_rgba(34,211,238,0.25)]">
            📷
          </div>
          <h1
            className="text-3xl font-bold text-white"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            Scan Emergency <span className="neon-text">QR</span>
          </h1>
          <p className="mt-3 text-sm text-slate-400">
            Use your phone camera to open a LIFEQR code, or paste the emergency
            ID / profile link below for instant access.
          </p>
        </div>

        <div className="glass-strong rounded-3xl p-6 sm:p-8">
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="input-label" htmlFor="scanInput">
                Emergency ID or Profile URL
              </label>
              <input
                id="scanInput"
                className="input-field font-mono text-sm"
                placeholder="Paste UUID or https://…/e/…"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                autoComplete="off"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-70"
            >
              {loading ? "Verifying…" : "Open Emergency Profile"}
            </button>
          </form>

          <div className="mt-6 rounded-xl border border-white/5 bg-slate-950/40 p-4 text-xs leading-relaxed text-slate-500">
            <p className="mb-2 font-semibold uppercase tracking-wider text-slate-400">
              Tip
            </p>
            Most phones open LIFEQR links automatically when you point the
            camera at the QR. No special app required.
          </div>
        </div>
      </div>
    </main>
  );
}
