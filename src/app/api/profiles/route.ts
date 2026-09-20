import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { emergencyProfiles } from "@/db/schema";
import QRCode from "qrcode";

export const runtime = "nodejs";

function getBaseUrl(req: NextRequest) {
  const proto = req.headers.get("x-forwarded-proto") ?? "http";
  const host = req.headers.get("host") ?? "localhost:3000";
  return `${proto}://${host}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const fullName = String(body.fullName ?? "").trim();
    const bloodGroup = String(body.bloodGroup ?? "").trim();
    const dateOfBirth = String(body.dateOfBirth ?? "").trim();
    const emergencyContactName = String(body.emergencyContactName ?? "").trim();
    const emergencyContactPhone = String(body.emergencyContactPhone ?? "").trim();
    const allergies = String(body.allergies ?? "").trim() || "None reported";
    const medicalConditions =
      String(body.medicalConditions ?? "").trim() || "None reported";
    const importantInfo = String(body.importantInfo ?? "").trim() || "";
    const city = String(body.city ?? "").trim();
    const photoUrl = body.photoUrl ? String(body.photoUrl) : null;

    if (
      !fullName ||
      !bloodGroup ||
      !dateOfBirth ||
      !emergencyContactName ||
      !emergencyContactPhone
    ) {
      return NextResponse.json(
        { error: "Missing required emergency profile fields." },
        { status: 400 },
      );
    }

    const [profile] = await db
      .insert(emergencyProfiles)
      .values({
        fullName,
        bloodGroup,
        dateOfBirth,
        emergencyContactName,
        emergencyContactPhone,
        allergies,
        medicalConditions,
        importantInfo,
        city,
        photoUrl,
      })
      .returning();

    const baseUrl = getBaseUrl(req);
    const profileUrl = `${baseUrl}/e/${profile.emergencyId}`;

    const qrDataUrl = await QRCode.toDataURL(profileUrl, {
      errorCorrectionLevel: "H",
      margin: 2,
      width: 512,
      color: {
        dark: "#0a1228",
        light: "#ffffff",
      },
    });

    return NextResponse.json({
      emergencyId: profile.emergencyId,
      fullName: profile.fullName,
      bloodGroup: profile.bloodGroup,
      qrDataUrl,
      profileUrl,
    });
  } catch (error) {
    console.error("Failed to create emergency profile:", error);
    return NextResponse.json(
      { error: "Failed to create emergency profile." },
      { status: 500 },
    );
  }
}
