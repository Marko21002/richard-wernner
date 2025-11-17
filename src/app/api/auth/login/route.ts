import { NextRequest, NextResponse } from "next/server";
import { verifyUser, createSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const email = (body.email as string | undefined)?.toLowerCase().trim();
  const password = body.password as string | undefined;

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  const user = await verifyUser(email, password);
  if (!user) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  await createSession(user.id);

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  });
}


