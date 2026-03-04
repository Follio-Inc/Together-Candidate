import { NextResponse } from "next/server";
import { jobs } from "@/lib/mock-data";
import { getSharedJobById } from "@/lib/shared-store";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const { jobId } = await params;
  let job = jobs.find((j) => j.id === jobId);

  if (!job) {
    try {
      job = await getSharedJobById(jobId);
    } catch (err) {
      console.error("Failed to read shared job:", err);
    }
  }

  if (!job) {
    return NextResponse.json(
      { data: null, success: false, error: "Job not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: job, success: true });
}
