"use client";

import { FormEvent, useRef, useState } from "react";
import type { CreatedProfileResponse } from "@/lib/types";
import ResultCard from "./ResultCard";

const BLOOD_GROUPS = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
  "Unknown",
];

export default function EmergencyForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CreatedProfileResponse | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const form = e.currentTarget;
      const fd = new FormData(form);

      const payload = {
        fullName: String(fd.get("fullName") ?? "").trim(),
        bloodGroup: String(fd.get("bloodGroup") ?? "").trim(),
        dateOfBirth: String(fd.get("dateOfBirth") ?? "").trim(),
        emergencyContactName: String(fd.get("emergencyContactName") ?? "").trim(),
        emergencyContactPhone: String(
          fd.get("emergencyContactPhone") ?? "",
        ).trim(),
        allergies: String(fd.get("allergies") ?? "").trim(),
        medicalConditions: String(fd.get("medicalConditions") ?? "").trim(),
        importantInfo: String(fd.get("importantInfo") ?? "").trim(),
        city: String(fd.get("city") ?? "").trim(),
        photoUrl: photoPreview,
      };

      const res = await fetch("/api/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create profile");
      }

      setResult(data as CreatedProfileResponse);
      form.reset();
      setPhotoPreview(null);
      if (fileRef.current) fileRef.current.value = "";

      setTimeout(() => {
        document
          .getElementById("result-card")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function onPhotoChange(file: File | null) {
    if (!file) {
      setPhotoPreview(null);
      return;
    }
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file.");
      return;
    }
    if (file.size > 1_500_000) {
      setError("Photo must be under 1.5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoPreview(typeof reader.result === "string" ? reader.result : null);
    };
    reader.readAsDataURL(file);
  }

  return (
    <section id="create" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-1/4 top-0 h-96 w-96 rounded-full bg-blue-500/8 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-cyan-500/8 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            Initialize Identity
          </p>
          <h2
            className="text-3xl font-bold text-white sm:text-4xl"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            Create Emergency <span className="neon-text">Profile</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-400">
            Only essential life-critical fields. Built for first responders —
            not a medical record dump.
          </p>
        </div>

        <div className="animated-border">
          <div className="relative overflow-hidden rounded-[1.4rem] p-1">
            {/* Decorative layer - pointer-events none */}
            <div className="pointer-events-none absolute inset-0 z-[3] overflow-hidden rounded-[1.35rem]">
              <div className="neon-strip" />
              <div className="neon-strip" />
              <div className="neon-strip" />
              <div className="light-beam" />

              <span className="particle" style={{ left: "8%", top: "18%", animationDelay: "0s" }} />
              <span className="particle" style={{ left: "22%", top: "62%", animationDelay: "1s", background: "#8b5cf6", boxShadow: "0 0 8px #8b5cf6" }} />
              <span className="particle" style={{ left: "70%", top: "25%", animationDelay: "2s" }} />
              <span className="particle" style={{ left: "85%", top: "55%", animationDelay: "0.5s", background: "#3b82f6", boxShadow: "0 0 8px #3b82f6" }} />
              <span className="particle" style={{ left: "50%", top: "80%", animationDelay: "1.5s" }} />

              <span className="float-icon" style={{ left: "4%", top: "30%", animationDelay: "0s" }}>✚</span>
              <span className="float-icon" style={{ right: "5%", top: "20%", animationDelay: "1.2s" }}>♥</span>
              <span className="float-icon" style={{ left: "6%", bottom: "18%", animationDelay: "2s" }}>⚡</span>
              <span className="float-icon" style={{ right: "7%", bottom: "28%", animationDelay: "0.8s" }}>🛡</span>

              <div className="ecg-wrap">
                <svg className="ecg-line" viewBox="0 0 800 40" preserveAspectRatio="none">
                  <polyline
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="1.5"
                    points="0,20 40,20 55,20 65,5 75,35 85,20 120,20 140,20 150,8 160,32 170,20 220,20 250,20 260,5 270,35 280,20 340,20 380,20 390,10 400,30 410,20 480,20 520,20 530,5 540,35 550,20 620,20 660,20 670,12 680,28 690,20 760,20 800,20"
                  />
                  <polyline
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="1.5"
                    points="800,20 840,20 855,20 865,5 875,35 885,20 920,20 940,20 950,8 960,32 970,20 1020,20 1050,20 1060,5 1070,35 1080,20 1140,20 1180,20 1190,10 1200,30 1210,20 1280,20 1320,20 1330,5 1340,35 1350,20 1420,20 1460,20 1470,12 1480,28 1490,20 1560,20 1600,20"
                  />
                </svg>
              </div>
            </div>

            <div className="relative z-10 rounded-[1.25rem] bg-slate-950/40 p-5 sm:p-8">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p
                    className="text-xs uppercase tracking-[0.2em] text-slate-500"
                    style={{ fontFamily: "Orbitron, sans-serif" }}
                  >
                    Secure Form // LIFEQR-01
                  </p>
                </div>
                <span className="badge-pulse inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300">
                  <span className="status-dot !h-2 !w-2" />
                  Emergency Ready
                </span>
              </div>

              <form onSubmit={onSubmit} className="relative z-20 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="input-label" htmlFor="fullName">
                      Full Name *
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      required
                      className="input-field"
                      placeholder="Alex Rivera"
                      autoComplete="name"
                    />
                  </div>

                  <div>
                    <label className="input-label" htmlFor="bloodGroup">
                      Blood Group *
                    </label>
                    <select
                      id="bloodGroup"
                      name="bloodGroup"
                      required
                      className="input-field"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select blood group
                      </option>
                      {BLOOD_GROUPS.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="input-label" htmlFor="dateOfBirth">
                      Date of Birth *
                    </label>
                    <input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      required
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="input-label" htmlFor="emergencyContactName">
                      Emergency Contact Name *
                    </label>
                    <input
                      id="emergencyContactName"
                      name="emergencyContactName"
                      required
                      className="input-field"
                      placeholder="Jordan Lee"
                      autoComplete="name"
                    />
                  </div>

                  <div>
                    <label className="input-label" htmlFor="emergencyContactPhone">
                      Emergency Contact Phone *
                    </label>
                    <input
                      id="emergencyContactPhone"
                      name="emergencyContactPhone"
                      required
                      type="tel"
                      className="input-field"
                      placeholder="+1 555 010 9988"
                      autoComplete="tel"
                    />
                  </div>

                  <div>
                    <label className="input-label" htmlFor="allergies">
                      Allergies
                    </label>
                    <input
                      id="allergies"
                      name="allergies"
                      className="input-field"
                      placeholder="Penicillin, peanuts..."
                    />
                  </div>

                  <div>
                    <label className="input-label" htmlFor="city">
                      City / Area
                    </label>
                    <input
                      id="city"
                      name="city"
                      className="input-field"
                      placeholder="Austin, TX"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="input-label" htmlFor="medicalConditions">
                      Medical Conditions
                    </label>
                    <input
                      id="medicalConditions"
                      name="medicalConditions"
                      className="input-field"
                      placeholder="Asthma, diabetes, epilepsy..."
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="input-label" htmlFor="importantInfo">
                      Important Medical Information
                    </label>
                    <textarea
                      id="importantInfo"
                      name="importantInfo"
                      rows={3}
                      className="input-field resize-y"
                      placeholder="Medications, implants, language needs, DNR notes..."
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="input-label" htmlFor="photo">
                      Optional Profile Photo
                    </label>
                    <div className="flex flex-wrap items-center gap-4">
                      <input
                        ref={fileRef}
                        id="photo"
                        type="file"
                        accept="image/*"
                        className="block w-full text-sm text-slate-400 file:mr-4 file:rounded-full file:border-0 file:bg-cyan-500/20 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-cyan-300 hover:file:bg-cyan-500/30"
                        onChange={(e) =>
                          onPhotoChange(e.target.files?.[0] ?? null)
                        }
                      />
                      {photoPreview && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={photoPreview}
                          alt="Preview"
                          className="h-16 w-16 rounded-xl object-cover ring-2 ring-cyan-400/40"
                        />
                      )}
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full text-base disabled:cursor-wait disabled:opacity-70 sm:w-auto sm:min-w-[240px]"
                >
                  {loading ? (
                    <>
                      <span className="inline-block animate-spin">⟳</span>
                      Generating QR...
                    </>
                  ) : (
                    <>
                      <span>◆</span> Generate Emergency QR
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {result && (
          <div id="result-card" className="mt-12">
            <ResultCard data={result} />
          </div>
        )}
      </div>
    </section>
  );
}
