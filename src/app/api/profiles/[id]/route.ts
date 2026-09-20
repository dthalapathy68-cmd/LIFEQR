import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { emergencyProfiles } from "@/db/schema";

export const runtime = "nodejs";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Missing emergency ID." }, { status: 400 });
    }

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
        createdAt: emergencyProfiles.createdAt,
      })
      .from(emergencyProfiles)
      .where(eq(emergencyProfiles.emergencyId, id))
      .limit(1);

    if (!profile) {
      return NextResponse.json(
        { error: "Emergency profile not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      ...profile,
      createdAt: profile.createdAt.toISOString(),
    });
  } catch (error) {
    console.error("Failed to fetch emergency profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch emergency profile." },
      { status: 500 },
    );
  }
}
