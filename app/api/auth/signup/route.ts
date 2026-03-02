import { NextResponse } from "next/server";
import { handleSignup } from "@/lib/auth";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    name?: string;
    email?: string;
  };

  if (!body.name || !body.email) {
    return NextResponse.json(
      { error: "Name and email are required" },
      { status: 400 }
    );
  }

  const candidate = handleSignup({
    name: body.name,
    email: body.email
  });

  return NextResponse.json({ candidate });
}

