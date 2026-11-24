import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

const db = knex({
  client: "mysql2",
  connection: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    decimalNumbers: true,
    ssl:
      process.env.DATABASE_SSL === "true"
        ? {
            ca: process.env.DATABASE_CA.replace(/\\n/g, "\n"),
            rejectUnauthorized: true,
          }
        : undefined,
  },
  pool: { min: 0, max: 5 },
});
export default db;
