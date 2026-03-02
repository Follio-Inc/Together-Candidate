import { NextResponse } from "next/server";
import { handleLogin } from "@/lib/auth";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    email?: string;
    name?: string;
  };

  if (!body.email) {
    return NextResponse.json(
      { error: "Email is required" },
      { status: 400 }
    );
  }

  const candidate = handleLogin({
    email: body.email,
    name: body.name
  });

  return NextResponse.json({ candidate });
}

