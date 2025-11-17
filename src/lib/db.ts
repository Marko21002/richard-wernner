import Database from "better-sqlite3";

let db: Database.Database | null = null;

export function getDb() {
  if (!db) {
    db = new Database("auth.db");
    db.pragma("journal_mode = WAL");

    db.prepare(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        name TEXT,
        password_hash TEXT NOT NULL,
        has_bought_course INTEGER NOT NULL DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`
    ).run();

    db.prepare(
      `CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        session_token TEXT UNIQUE NOT NULL,
        expires_at DATETIME NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )`
    ).run();

    // Ensure legacy databases also have the has_bought_course column
    const userColumns = db.prepare("PRAGMA table_info(users)").all() as {
      name: string;
    }[];
    const hasBoughtCourseColumn = userColumns.find(
      (col) => col.name === "has_bought_course"
    );
    if (!hasBoughtCourseColumn) {
      db.prepare(
        "ALTER TABLE users ADD COLUMN has_bought_course INTEGER NOT NULL DEFAULT 0"
      ).run();
    }
  }

  return db;
}
