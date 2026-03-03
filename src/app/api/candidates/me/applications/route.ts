import { NextResponse } from "next/server";
import { mockApplications } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({
    data: mockApplications,
    success: true,
  });
}
