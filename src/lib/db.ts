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

    db.prepare(
      `CREATE TABLE IF NOT EXISTS courses (
        id TEXT PRIMARY KEY,
        title TEXT,
        thumbnail_url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`
    ).run();

    db.prepare(
      `CREATE TABLE IF NOT EXISTS lessons (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        course_id TEXT NOT NULL,
        module_index INTEGER NOT NULL,
        lesson_index INTEGER NOT NULL,
        content TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(course_id, module_index, lesson_index),
        FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
      )`
    ).run();

    db.prepare(
      `CREATE TABLE IF NOT EXISTS lesson_files (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        lesson_id INTEGER NOT NULL,
        file_url TEXT NOT NULL,
        file_name TEXT NOT NULL,
        file_size INTEGER NOT NULL,
        content_type TEXT,
        s3_key TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
      )`
    ).run();

    db.prepare(
      `CREATE TABLE IF NOT EXISTS modules (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        course_id TEXT NOT NULL,
        module_index INTEGER NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        is_locked INTEGER NOT NULL DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(course_id, module_index),
        FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
      )`
    ).run();

    // Add title column to lessons table if it doesn't exist
    const lessonColumns = db.prepare("PRAGMA table_info(lessons)").all() as {
      name: string;
    }[];
    const hasTitleColumn = lessonColumns.find((col) => col.name === "title");
    if (!hasTitleColumn) {
      db.prepare("ALTER TABLE lessons ADD COLUMN title TEXT").run();
    }

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
