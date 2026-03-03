import { NextResponse } from "next/server";
import { mockApplications } from "@/lib/mock-data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const application = mockApplications.find((a) => a.id === id);

  if (!application) {
    return NextResponse.json(
      { data: null, success: false, error: "Application not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: application, success: true });
}
