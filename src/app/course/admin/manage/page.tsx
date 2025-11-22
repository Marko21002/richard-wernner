import { Footer } from "../../../components/Footer";
import { getDb } from "@/lib/db";
import bcrypt from "bcryptjs";
import AdminNavbar from "../../components/admin-navbar";

async function addUser(formData: FormData) {
  "use server";

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .toLowerCase()
    .trim();
  const password = String(formData.get("password") ?? "");
  const hasAccess = formData.get("has_access") === "on" ? 1 : 0;

  if (!email || !password) {
    return;
  }

  const db = getDb();

  // If user already exists, do nothing for now
  const existing = db
    .prepare("SELECT id FROM users WHERE email = ?")
    .get(email) as { id: number } | undefined;
  if (existing) {
    return;
  }

  const hash = await bcrypt.hash(password, 10);
  db.prepare(
    "INSERT INTO users (email, name, password_hash, has_bought_course) VALUES (?, ?, ?, ?)"
  ).run(email, name || null, hash, hasAccess);
}

async function deleteUser(formData: FormData) {
  "use server";

  const id = Number(formData.get("id"));
  if (!id) return;

  const db = getDb();
  db.prepare("DELETE FROM users WHERE id = ?").run(id);
}

export default async function AdminManageUsersPage() {
  const db = getDb();
  const users = db
    .prepare(
      "SELECT id, email, name, has_bought_course, created_at FROM users ORDER BY created_at DESC"
    )
    .all() as {
    id: number;
    email: string;
    name: string | null;
    has_bought_course: number;
    created_at: string;
  }[];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <AdminNavbar />
      <main className="px-[5%] py-10 md:py-14">
        <div className="mx-auto max-w-6xl space-y-8">
          <header className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
              Admin / Students
            </p>
            <h1 className="text-2xl font-light text-slate-900 font-serif md:text-3xl">
              All students
            </h1>
            <p className="max-w-2xl text-sm text-slate-600">
              View every registered student in your academy, add new accounts
              manually, and remove access if needed. For now all students belong
              to the Banking &amp; Finance Masterclass course.
            </p>
          </header>

          {/* Add user form */}
          <section className="rounded-sm border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="mb-2 text-sm font-medium text-slate-900">
              Add student manually
            </h2>
            <p className="mb-4 text-xs text-slate-500">
              Use this when you want to enroll someone without sending them
              through the checkout flow (e.g. scholarship, team access).
            </p>
            <form action={addUser} className="grid gap-3 md:grid-cols-4">
              <label className="space-y-1 text-xs text-slate-600 md:col-span-1">
                <span className="block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                  Name
                </span>
                <input
                  name="name"
                  type="text"
                  placeholder="Student name"
                  className="w-full rounded-sm border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10"
                />
              </label>
              <label className="space-y-1 text-xs text-slate-600 md:col-span-1">
                <span className="block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                  Email
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="student@example.com"
                  className="w-full rounded-sm border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10"
                />
              </label>
              <label className="space-y-1 text-xs text-slate-600 md:col-span-1">
                <span className="block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                  Temporary password
                </span>
                <input
                  name="password"
                  type="text"
                  required
                  placeholder="min. 6 characters"
                  className="w-full rounded-sm border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10"
                />
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-600 md:col-span-1">
                <input
                  type="checkbox"
                  name="has_access"
                  defaultChecked
                  className="h-3 w-3 rounded border-slate-300 text-slate-900 focus:ring-slate-900/40"
                />
                <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-700">
                  Has course access
                </span>
              </label>
              <div className="flex items-end md:col-span-1">
                <button
                  type="submit"
                  className="w-full rounded-sm border border-slate-900/10 bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
                >
                  Add student
                </button>
              </div>
            </form>
          </section>

          {/* Users table */}
          <section className="rounded-sm border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-sm font-medium text-slate-900">
                Registered students
              </h2>
              <p className="text-xs text-slate-500">
                {users.length} account{users.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-xs text-slate-700">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-[11px] uppercase tracking-[0.16em] text-slate-500">
                    <th className="px-3 py-2 font-medium">ID</th>
                    <th className="px-3 py-2 font-medium">Name</th>
                    <th className="px-3 py-2 font-medium">Email</th>
                    <th className="px-3 py-2 font-medium">Access</th>
                    <th className="px-3 py-2 font-medium">Created</th>
                    <th className="px-3 py-2 font-medium text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-slate-100 last:border-b-0"
                    >
                      <td className="px-3 py-2 font-mono text-[11px] text-slate-500">
                        {user.id}
                      </td>
                      <td className="px-3 py-2 text-xs">
                        {user.name || <span className="text-slate-400">—</span>}
                      </td>
                      <td className="px-3 py-2 text-xs">{user.email}</td>
                      <td className="px-3 py-2 text-[11px]">
                        {user.has_bought_course ? (
                          <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                            Has access
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                            No access
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2 text-[11px] text-slate-500">
                        {new Date(user.created_at).toLocaleString()}
                      </td>
                      <td className="px-3 py-2 text-right">
                        <form action={deleteUser}>
                          <input type="hidden" name="id" value={user.id} />
                          <button
                            type="submit"
                            className="rounded-sm border border-red-200 bg-red-50 px-2 py-1 text-[11px] font-medium text-red-700 hover:bg-red-100"
                          >
                            Delete
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-3 py-4 text-center text-xs text-slate-500"
                      >
                        No students registered yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
