// hocuspocusServer.js
const { Server } = require("@hocuspocus/server");
const { Database } = require("@hocuspocus/extension-database");
const { Logger } = require("@hocuspocus/extension-logger");
const sqlite3 = require("sqlite3");

// Initialize SQLite database
const db = new sqlite3.Database(":memory:"); // or specify a file path for persistent storage

// Create documents table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS "documents" (
    "name" TEXT PRIMARY KEY,
    "data" TEXT
  )
`);

const server = Server.configure({
  extensions: [
    new Logger(),
    new Database({
      fetch: async ({ documentName }) => {
        return new Promise((resolve, reject) => {
          db.get(
            `SELECT data FROM "documents" WHERE name = $name ORDER BY rowid DESC`,
            { $name: documentName },
            (error, row) => {
              if (error) {
                reject(error);
              }
              resolve(row?.data);
            }
          );
        });
      },
      store: async ({ documentName, state }) => {
        db.run(
          `INSERT INTO "documents" ("name", "data") VALUES ($name, $data)
            ON CONFLICT(name) DO UPDATE SET data = $data`,
          { $name: documentName, $data: state }
        );
      },
    }),
  ],
});

server.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
