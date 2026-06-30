import { run } from "./db";

async function seed() {
  await run("PRAGMA foreign_keys = OFF");
  await run("DROP TABLE IF EXISTS invoices");
  await run("DROP TABLE IF EXISTS orders");
  await run("DROP TABLE IF EXISTS products");
  await run("DROP TABLE IF EXISTS users");

  await run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      address TEXT
    )
  `);

  await run(`
    CREATE TABLE products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price TEXT NOT NULL,
      stock INTEGER NOT NULL,
      category TEXT NOT NULL
    )
  `);

  await run(`
    CREATE TABLE orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      total REAL NOT NULL,
      status TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS invoices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      invoice_number TEXT NOT NULL,
      total REAL NOT NULL
    )
  `);

  await run(
    "INSERT INTO users (name, email, password, address) VALUES (?, ?, ?, ?)",
    ["Luis Debugger", "luis@example.com", "123456", JSON.stringify({ city: "Santo Domingo", street: "Av. Duarte" })]
  );
  await run(
    "INSERT INTO users (name, email, password, address) VALUES (?, ?, ?, ?)",
    ["Ana Sin Direccion", "ana@example.com", "123456", null]
  );

  const products = [
    ["Laptop Pro 14", "1000", 3, "computers"],
    ["Mouse Vertical", "35", 15, "accessories"],
    ["Keyboard Blue Switch", "85", 8, "accessories"],
    ["USB-C Hub", "45", 12, "accessories"],
    ["Monitor 27", "220", 5, "screens"],
    ["Webcam FullHD", "60", 11, "streaming"],
    ["Desk Lamp", "25", 17, "office"],
    ["Notebook Stand", "40", 9, "office"],
    ["Laptop Air 13", "900", 2, "computers"],
    ["HDMI Cable", "12", 30, "cables"],
    ["Portable SSD", "130", 4, "storage"],
    ["Headset USB", "70", 6, "audio"]
  ];

  for (const product of products) {
    await run("INSERT INTO products (name, price, stock, category) VALUES (?, ?, ?, ?)", product);
  }

  console.log("DebugMart database seeded.");
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
