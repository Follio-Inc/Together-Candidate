import { NextResponse } from "next/server";
import { jobs } from "@/lib/mock-data";

export async function GET(
  _request: Request,
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

  return NextResponse.json({ data: job, success: true });
}
