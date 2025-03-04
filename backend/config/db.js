const sqlite3 = require("sqlite3").verbose()
const path = require("path")

const dbPath = path.resolve(__dirname,"appointments.db")
const db = new sqlite3.Database(dbPath)

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      phone TEXT,
      date TEXT,
      time_slot TEXT,
      UNIQUE(date, time_slot)
    )`);
  });


module.exports = db;