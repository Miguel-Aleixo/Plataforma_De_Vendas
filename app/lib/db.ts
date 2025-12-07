import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "lib", "orders.json");

// Garante que a pasta existe
if (!fs.existsSync(path.dirname(dbPath))) {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
}

// Garante que o arquivo existe
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, "{}");
}

export function loadDb() {
  const raw = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(raw);
}

export function saveOrder(orderId: string, email: string) {
  const db = loadDb();
  db[orderId] = { email };
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}

export function getEmailFromOrderId(orderId: string) {
  const db = loadDb();
  return db[orderId]?.email ?? null;
}
