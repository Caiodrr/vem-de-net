import sqlite3 from "sqlite3";

const DATABASE_FILE = process.env.DATABASE_FILE;

if (!DATABASE_FILE) throw new Error("File database not found");

export const openConnection = () => {
  let db = new sqlite3.Database(DATABASE_FILE);
  return db;
};

const createTable = () => {
  let db = openConnection();

  db.exec(`
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS users;

        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT NOT NULL,
          phone TEXT NOT NULL,
          email TEXT NULLABLE,
          cpf TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            date INTEGER NOT NULL,
            shift TEXT NOT NULL,
            type TEXT NOT NULL,
            status BOOLEAN DEFAULT TRUE,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );

        INSERT INTO users (username, email, cpf, phone) VALUES
          ('Caio', 'caio@mail.com', '12345678900', '8810011232'),
          ('Pedro', 'pedro@mail.com', '98765432100', '8810011231'),
          ('Joao', 'joao@mail.com', '45678912300', '8810011231');
    `);
};

createTable();

export const findFirst = async (query: string, params?: any[]) => {
  const [response] = await dbQuery(query, params);
  return response;
};

export const dbQuery = (query: string, params?: any[]) => {
  let db = openConnection();
  return new Promise<any[]>((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) {
        reject(err);
      }

      resolve(rows);
    });
  }).finally(() => {
    db.close();
  });
};
