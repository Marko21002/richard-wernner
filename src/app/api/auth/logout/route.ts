import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { deleteSessionByToken, clearSessionCookie } from "@/lib/auth";

export async function POST(_req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;

  if (token) {
    deleteSessionByToken(token);
  }

  await clearSessionCookie();

  return NextResponse.json({ ok: true });
}


