"use client";

import Link from "next/link";
import type { CreatedProfileResponse } from "@/lib/types";

export default function ResultCard({ data }: { data: CreatedProfileResponse }) {
  function downloadQr() {
    const a = document.createElement("a");
    a.href = data.qrDataUrl;
    a.download = `LIFEQR-${data.emergencyId.slice(0, 8)}.png`;
    a.click();
  }

  function printQr() {
    const w = window.open("", "_blank", "noopener,noreferrer,width=480,height=640");
    if (!w) return;
    w.document.write(`<!doctype html><html><head><title>LIFEQR Print</title>
      <style>
        body{font-family:system-ui,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#fff;color:#0a1228}
        .card{text-align:center;padding:24px;border:2px solid #0a1228;border-radius:16px}
        img{width:280px;height:280px}
        h1{font-size:18px;letter-spacing:2px;margin:0 0 8px}
        p{margin:4px 0;font-size:13px}
      </style></head><body>
      <div class="card">
        <h1>LIFEQR EMERGENCY ID</h1>
        <p><strong>${data.fullName}</strong> · ${data.bloodGroup}</p>
        <img src="${data.qrDataUrl}" alt="QR" />
        <p>ID: ${data.emergencyId}</p>
        <p>Scan in emergency · lifeqr</p>
      </div>
      <script>window.onload=()=>{window.print();}</script>
      </body></html>`);
    w.document.close();
  }

  return (
    <div className="glass-strong relative overflow-hidden rounded-3xl p-6 sm:p-8">
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />

      <div className="relative print-area">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p
              className="text-xs uppercase tracking-[0.2em] text-cyan-400"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              Digital Emergency Card
            </p>
            <h3
              className="mt-1 text-2xl font-bold text-white"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              Profile Activated
            </h3>
          </div>
          <span className="badge-pulse inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-300">
            <span className="status-dot !h-2 !w-2 !bg-emerald-400" style={{ boxShadow: "0 0 12px #34d399" }} />
            Live
          </span>
        </div>

        <div className="grid items-center gap-8 md:grid-cols-[240px_1fr]">
          <div className="mx-auto rounded-2xl bg-white p-3 shadow-[0_0_40px_rgba(34,211,238,0.25)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.qrDataUrl}
              alt="Emergency QR Code"
              className="h-52 w-52 sm:h-56 sm:w-56"
            />
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500">
                Full Name
              </p>
              <p className="text-xl font-semibold text-white">{data.fullName}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-500">
                  Blood Group
                </p>
                <p className="text-lg font-bold text-red-400">{data.bloodGroup}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-500">
                  Emergency ID
                </p>
                <p className="truncate font-mono text-sm text-cyan-300">
                  {data.emergencyId}
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-400">
              Attach this QR to a helmet, bag, phone, bracelet, or vehicle. Anyone
              can scan it to open the public emergency profile.
            </p>

            <div className="no-print flex flex-wrap gap-3 pt-2">
              <button type="button" onClick={downloadQr} className="btn-primary text-sm">
                Download QR
              </button>
              <button type="button" onClick={printQr} className="btn-secondary text-sm">
                Print QR
              </button>
              <Link
                href={`/e/${data.emergencyId}`}
                className="btn-secondary text-sm"
              >
                View Emergency Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
