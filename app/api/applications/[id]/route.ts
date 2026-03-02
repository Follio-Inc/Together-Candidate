import { NextResponse } from "next/server";
import {
  getApplicationById,
  getJobById,
  requireCurrentCandidate
} from "@/lib/auth";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(_request: Request, { params }: Params) {
  try {
    const candidate = requireCurrentCandidate();
    const app = getApplicationById(params.id);
    if (!app || app.candidateId !== candidate.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const job = getJobById(app.jobId) ?? null;
    return NextResponse.json({ application: { ...app, job } });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHENTICATED") {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
    }
    return NextResponse.json(
      { error: "Failed to load application" },
      { status: 500 }
    );
  }
}

