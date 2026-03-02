import { NextResponse } from "next/server";
import {
  getCurrentCandidateFromCookies,
  updateCurrentCandidateProfile
} from "@/lib/auth";

export async function GET() {
  const candidate = getCurrentCandidateFromCookies();
  if (!candidate) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }
  return NextResponse.json({ candidate });
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as {
      name?: string;
      location?: string;
      experienceLevel?: string;
      rolePreferences?: string[];
      skills?: string[];
      portfolioUrl?: string;
      githubUrl?: string;
      linkedinUrl?: string;
    };

    const updated = updateCurrentCandidateProfile({
      name: body.name,
      location: body.location,
      experienceLevel: body.experienceLevel as any,
      rolePreferences: body.rolePreferences as any,
      skills: body.skills ?? [],
      portfolioUrl: body.portfolioUrl,
      githubUrl: body.githubUrl,
      linkedinUrl: body.linkedinUrl
    });

    return NextResponse.json({ candidate: updated });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHENTICATED") {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
    }
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}

