import { NextResponse } from "next/server";
import { jobs, mockCandidate, calculateFitScore } from "@/lib/mock-data";
import type { Application } from "@/lib/types";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const { jobId } = await params;
  const job = jobs.find((j) => j.id === jobId);

  if (!job) {
    return NextResponse.json(
      { data: null, success: false, error: "Job not found" },
      { status: 404 }
    );
  }

  const body = await request.json();
  const { coverNote, resumeUrl } = body;

  if (!coverNote) {
    return NextResponse.json(
      { data: null, success: false, error: "Cover note is required" },
      { status: 400 }
    );
  }

  const fitScore = calculateFitScore(mockCandidate, job);
  const now = new Date().toISOString();

  const application: Application = {
    id: `app-${Date.now()}`,
    candidateId: mockCandidate.id,
    jobId: job.id,
    job,
    coverNote,
    resumeUrl: resumeUrl || "/resumes/placeholder.pdf",
    stage: "applied",
    fitScore,
    appliedAt: now,
    updatedAt: now,
    timeline: [{ stage: "applied", date: now, note: "Application submitted" }],
  };

  return NextResponse.json({ data: application, success: true });
}
