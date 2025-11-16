"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar2 } from "../components/Navbar2";
import { Footer } from "../components/Footer";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Unable to sign in");
      }
      router.push("/course/lms");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <Navbar2 />
      <main className="px-[5%] py-10 md:py-16">
        <div className="mx-auto max-w-md rounded-sm border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="mb-2 text-2xl font-light text-slate-900 font-serif">
            Sign in to your account
          </h1>
          <p className="mb-6 text-sm text-slate-600">
            Access Professor Werner&apos;s course and continue where you left off.
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <label className="block text-xs text-slate-700">
              <span className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                Email
              </span>
              <input
                type="email"
                required
                className="w-full rounded-sm border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="block text-xs text-slate-700">
              <span className="mb-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                Password
              </span>
              <input
                type="password"
                required
                className="w-full rounded-sm border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            {error && (
              <p className="text-[11px] text-red-600" role="alert">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-sm border border-slate-900/10 bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
          <p className="mt-4 text-[11px] text-slate-500">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/register")}
              className="font-medium text-slate-900 underline underline-offset-2 hover:text-slate-700"
            >
              Create one
            </button>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}


