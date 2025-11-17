import { NextRequest, NextResponse } from "next/server";
import { registerUser, createSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = (body.email as string | undefined)?.toLowerCase().trim();
    const password = body.password as string | undefined;
    const name = body.name as string | undefined;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const user = await registerUser({ email, password, name });
    await createSession(user.id);

    return NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not create account";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}


