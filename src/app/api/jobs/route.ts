import { NextResponse } from "next/server";
import { jobs } from "@/lib/mock-data";
import { getSharedJobs } from "@/lib/shared-store";
import type { RoleType, LocationType, ExperienceLevel } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const roleType = searchParams.get("roleType") as RoleType | null;
  const locationType = searchParams.get("locationType") as LocationType | null;
  const seniority = searchParams.get("seniority") as ExperienceLevel | null;
  const search = searchParams.get("q")?.toLowerCase();

  const existingIds = new Set(jobs.map((j) => j.id));
  let allJobs = [...jobs];

  try {
    const shared = await getSharedJobs();
    for (const job of shared) {
      if (!existingIds.has(job.id)) {
        allJobs.push(job);
      }
    }
  } catch (err) {
    console.error("Failed to read shared jobs:", err);
  }

  let filtered = allJobs.filter((j) => j.isActive);

  if (roleType) {
    filtered = filtered.filter((j) => j.roleType === roleType);
  }
  if (locationType) {
    filtered = filtered.filter((j) => j.locationType === locationType);
  }
  if (seniority) {
    filtered = filtered.filter((j) => j.seniority === seniority);
  }
  if (search) {
    filtered = filtered.filter(
      (j) =>
        j.title.toLowerCase().includes(search) ||
        j.company.name.toLowerCase().includes(search) ||
        j.tags.some((t) => t.toLowerCase().includes(search))
    );
  }

  return NextResponse.json({ data: filtered, success: true });
}
