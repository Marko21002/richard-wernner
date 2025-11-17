import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { randomBytes } from "crypto";
import { getDb } from "./db";

const SESSION_COOKIE_NAME = "session_token";
const SESSION_TTL_HOURS = 24;

export type User = {
  id: number;
  email: string;
  name: string | null;
};

export async function registerUser(input: {
  email: string;
  password: string;
  name?: string;
}) {
  const db = getDb();
  const existing = db
    .prepare("SELECT id FROM users WHERE email = ?")
    .get(input.email) as { id: number } | undefined;

  if (existing) {
    throw new Error("Email is already registered");
  }

  const passwordHash = await bcrypt.hash(input.password, 10);

  const result = db
    .prepare(
      "INSERT INTO users (email, name, password_hash) VALUES (?, ?, ?)"
    )
    .run(input.email, input.name ?? null, passwordHash);

  return {
    id: Number(result.lastInsertRowid),
    email: input.email,
    name: input.name ?? null,
  } satisfies User;
}

export async function verifyUser(email: string, password: string) {
  const db = getDb();
  const row = db
    .prepare(
      "SELECT id, email, name, password_hash FROM users WHERE email = ?"
    )
    .get(email) as
    | {
        id: number;
        email: string;
        name: string | null;
        password_hash: string;
      }
    | undefined;

  if (!row) {
    return null;
  }

  const isValid = await bcrypt.compare(password, row.password_hash);
  if (!isValid) return null;

  return {
    id: row.id,
    email: row.email,
    name: row.name,
  } satisfies User;
}

export async function createSession(userId: number) {
  const db = getDb();
  const token = randomBytes(32).toString("hex");
  const expires = new Date();
  expires.setHours(expires.getHours() + SESSION_TTL_HOURS);

  db.prepare(
    "INSERT INTO sessions (user_id, session_token, expires_at) VALUES (?, ?, ?)"
  ).run(userId, token, expires.toISOString());

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires,
  });

  return token;
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  const db = getDb();
  const row = db
    .prepare(
      `SELECT u.id, u.email, u.name
       FROM sessions s
       JOIN users u ON u.id = s.user_id
       WHERE s.session_token = ? AND s.expires_at > ?`
    )
    .get(token, new Date().toISOString()) as
    | { id: number; email: string; name: string | null }
    | undefined;

  if (!row) return null;

  return {
    id: row.id,
    email: row.email,
    name: row.name,
  };
}

export function deleteSessionByToken(token: string) {
  const db = getDb();
  db.prepare("DELETE FROM sessions WHERE session_token = ?").run(token);
}


