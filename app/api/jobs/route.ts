import { NextResponse } from "next/server";
import { listJobs } from "@/lib/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const roleCategory = searchParams.get("roleCategory") ?? undefined;
  const locationType = searchParams.get("locationType") ?? undefined;
  const seniority = searchParams.get("seniority") ?? undefined;

  const jobs = listJobs({
    roleCategory: roleCategory || undefined,
    locationType: locationType || undefined,
    seniority: seniority || undefined
  });

  return NextResponse.json({ jobs });
}
