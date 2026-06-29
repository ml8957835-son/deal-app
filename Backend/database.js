const Database = require("better-sqlite3");

// This creates (or opens) deals.db
const db = new Database("deals.db");

// Users table
db.prepare(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  fullName TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'user'
)
`).run();

// Deals table
db.prepare(`
CREATE TABLE IF NOT EXISTS deals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  store TEXT NOT NULL,
  category TEXT NOT NULL,
  discount TEXT NOT NULL,
  description TEXT NOT NULL
)
`).run();
db.prepare(`
CREATE TABLE IF NOT EXISTS claims (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    dealId INTEGER NOT NULL,
    claimedAt DATETIME DEFAULT CURRENT_TIMESTAMP
)
`).run();

module.exports = db;