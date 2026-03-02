import { NextResponse } from "next/server";
import {
  listApplicationsForCandidate,
  requireCurrentCandidate,
  getJobById
} from "@/lib/auth";

export async function GET() {
  try {
    const candidate = requireCurrentCandidate();
    const applications = listApplicationsForCandidate(candidate.id).map((app) => ({
      ...app,
      job: getJobById(app.jobId) ?? null
    }));

    return NextResponse.json({ applications });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHENTICATED") {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
    }
    return NextResponse.json(
      { error: "Failed to load applications" },
      { status: 500 }
    );
  }
}

