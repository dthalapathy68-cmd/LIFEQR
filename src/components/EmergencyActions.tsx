"use client";

import { useState } from "react";

type Props = {
  phoneHref: string;
  contactName: string;
  fullName: string;
};

export default function EmergencyActions({
  phoneHref,
  contactName,
  fullName,
}: Props) {
  const [found, setFound] = useState(false);

  function handleFound() {
    setFound(true);
    try {
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate(40);
      }
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="relative mt-8 space-y-3">
      <a href={phoneHref} className="btn-danger w-full text-base sm:text-lg">
        📞 CALL EMERGENCY CONTACT
      </a>
      <p className="text-center text-xs text-slate-500">
        Connects to {contactName}
      </p>

      <button
        type="button"
        onClick={handleFound}
        className="btn-secondary w-full text-sm"
      >
        {found ? "✓ Finder note logged locally" : "I Found This Person"}
      </button>

      {found && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          Thank you for helping {fullName}. Please stay with them if safe, call
          local emergency services if needed, and use the contact button above
          to reach their trusted person.
        </div>
      )}
    </div>
  );
}
