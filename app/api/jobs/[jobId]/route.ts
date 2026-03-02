import { NextResponse } from "next/server";
import { getJobById } from "@/lib/auth";

interface Params {
  params: {
    jobId: string;
  };
}

export async function GET(_request: Request, { params }: Params) {
  const job = getJobById(params.jobId);
  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }
  return NextResponse.json({ job });
}

