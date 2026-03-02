import { NextResponse } from "next/server";
import { getCurrentCandidateFromCookies } from "@/lib/auth";

export async function GET() {
  const candidate = getCurrentCandidateFromCookies();
  if (!candidate) {
    return NextResponse.json({ candidate: null }, { status: 200 });
  }
  return NextResponse.json({ candidate });
}

