import { NextResponse } from "next/server";
import {
  createApplication,
  getJobById,
  requireCurrentCandidate
} from "@/lib/auth";

interface Params {
  params: {
    jobId: string;
  };
}

export async function POST(request: Request, { params }: Params) {
  try {
    const candidate = requireCurrentCandidate();
    const job = getJobById(params.jobId);

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const body = (await request.json().catch(() => ({}))) as {
      resumeUrl?: string;
      whyYou?: string;
    };

    const app = createApplication({
      candidate,
      job,
      resumeUrl: body.resumeUrl,
      whyYou: body.whyYou
    });

    return NextResponse.json({ application: app }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHENTICATED") {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
    }
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}

