import { NextResponse } from "next/server";
import { jobs } from "@/lib/mock-data";
import type { RoleType, LocationType, ExperienceLevel } from "@/lib/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const roleType = searchParams.get("roleType") as RoleType | null;
  const locationType = searchParams.get("locationType") as LocationType | null;
  const seniority = searchParams.get("seniority") as ExperienceLevel | null;
  const search = searchParams.get("q")?.toLowerCase();

  let filtered = jobs.filter((j) => j.isActive);

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
