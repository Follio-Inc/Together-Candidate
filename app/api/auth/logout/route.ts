import { NextResponse } from "next/server";
import { clearCandidateCookie } from "@/lib/auth";

export async function POST() {
  clearCandidateCookie();
  return NextResponse.json({ ok: true });
}

