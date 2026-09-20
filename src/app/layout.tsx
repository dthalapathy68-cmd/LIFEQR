import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "LIFEQR — When They Can't Speak, LIFEQR Speaks For Them",
  description:
    "Create a secure emergency identity profile and QR code. Instantly share critical medical info and contacts when every second counts.",
  keywords: [
    "emergency QR",
    "medical ID",
    "LIFEQR",
    "emergency contact",
    "first responder",
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Orbitron:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased text-slate-100">{children}</body>
    </html>
  );
}
