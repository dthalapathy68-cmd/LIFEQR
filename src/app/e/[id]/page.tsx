import Link from "next/link";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { emergencyProfiles } from "@/db/schema";
import EmergencyActions from "@/components/EmergencyActions";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  return {
    title: `LIFEQR Emergency Profile · ${id.slice(0, 8)}`,
    description: "Public emergency identity card — critical info only.",
    robots: { index: false, follow: false },
  };
}

export default async function EmergencyProfilePage({ params }: Props) {
  const { id } = await params;

  const [profile] = await db
    .select({
      emergencyId: emergencyProfiles.emergencyId,
      fullName: emergencyProfiles.fullName,
      bloodGroup: emergencyProfiles.bloodGroup,
      allergies: emergencyProfiles.allergies,
      medicalConditions: emergencyProfiles.medicalConditions,
      importantInfo: emergencyProfiles.importantInfo,
      city: emergencyProfiles.city,
      emergencyContactName: emergencyProfiles.emergencyContactName,
      emergencyContactPhone: emergencyProfiles.emergencyContactPhone,
      photoUrl: emergencyProfiles.photoUrl,
    })
    .from(emergencyProfiles)
    .where(eq(emergencyProfiles.emergencyId, id))
    .limit(1);

  if (!profile) notFound();

  const phoneHref = `tel:${profile.emergencyContactPhone.replace(/\s+/g, "")}`;

  return (
    <main className="min-h-screen pb-16">
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
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
            Public Safety Card
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 pt-8 sm:px-6">
        {/* Status banner */}
        <div className="mb-6 flex items-center justify-between gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 sm:px-5">
          <div className="flex items-center gap-3">
            <span className="status-dot status-dot-red" />
            <div>
              <p
                className="text-sm font-bold uppercase tracking-wider text-red-300"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                Emergency Access Mode
              </p>
              <p className="text-xs text-red-200/70">
                Showing essential medical & contact information only
              </p>
            </div>
          </div>
          <span className="hidden rounded-full border border-red-400/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-red-300 sm:inline">
            Live
          </span>
        </div>

        <div className="glass-strong relative overflow-hidden rounded-3xl p-5 sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-red-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="mx-auto shrink-0 sm:mx-0">
              {profile.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.photoUrl}
                  alt={profile.fullName}
                  className="h-28 w-28 rounded-2xl object-cover ring-2 ring-cyan-400/40 shadow-[0_0_30px_rgba(34,211,238,0.25)] sm:h-32 sm:w-32"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-4xl ring-2 ring-cyan-400/30 sm:h-32 sm:w-32">
                  👤
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1 text-center sm:text-left">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Identity
              </p>
              <h1
                className="mt-1 break-words text-3xl font-bold text-white sm:text-4xl"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                {profile.fullName}
              </h1>
              {profile.city && (
                <p className="mt-2 text-sm text-slate-400">📍 {profile.city}</p>
              )}
              <p className="mt-2 font-mono text-[11px] text-slate-600">
                ID · {profile.emergencyId}
              </p>
            </div>
          </div>

          <div className="relative mt-8 grid gap-4 sm:grid-cols-2">
            <InfoTile
              label="Blood Group"
              value={profile.bloodGroup}
              accent="text-red-400"
              large
            />
            <InfoTile
              label="Allergies"
              value={profile.allergies || "None reported"}
              accent="text-amber-300"
            />
            <InfoTile
              label="Medical Conditions"
              value={profile.medicalConditions || "None reported"}
              accent="text-cyan-300"
              className="sm:col-span-2"
            />
            {profile.importantInfo && (
              <InfoTile
                label="Critical Notes"
                value={profile.importantInfo}
                accent="text-violet-300"
                className="sm:col-span-2"
              />
            )}
          </div>

          <div className="relative mt-6 rounded-2xl border border-cyan-500/25 bg-slate-950/50 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Emergency Contact
            </p>
            <p className="mt-2 text-xl font-semibold text-white">
              {profile.emergencyContactName}
            </p>
            <p className="mt-1 font-mono text-cyan-300">
              {profile.emergencyContactPhone}
            </p>
          </div>

          <EmergencyActions
            phoneHref={phoneHref}
            contactName={profile.emergencyContactName}
            fullName={profile.fullName}
          />
        </div>

        <p className="mt-6 text-center text-xs text-slate-600">
          LIFEQR shows only information needed in an emergency. Do not misuse
          this data.
        </p>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-cyan-400 hover:text-cyan-300">
            ← Back to LIFEQR
          </Link>
        </div>
      </div>
    </main>
  );
}

function InfoTile({
  label,
  value,
  accent,
  large,
  className = "",
}: {
  label: string;
  value: string;
  accent: string;
  large?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/5 bg-slate-950/40 p-4 ${className}`}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <p
        className={`mt-2 font-semibold leading-snug ${accent} ${
          large ? "text-3xl" : "text-base"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
