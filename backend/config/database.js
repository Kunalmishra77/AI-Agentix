import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.on('error', (err) => {
  console.error('Unexpected pg pool error', err);
});

export const query = (text, params) => pool.query(text, params);

export const queryOne = async (text, params) => {
  const { rows } = await pool.query(text, params);
  return rows[0] || null;
};

// snake_case → camelCase + add _id alias
const toCamelKey = (str) =>
  str.replace(/_([a-z])/g, (_, c) => c.toUpperCase());

export const toCamel = (row) => {
  if (!row) return null;
  const out = {};
  for (const [k, v] of Object.entries(row)) {
    out[toCamelKey(k)] = v;
  }
  out._id = row.id;
  return out;
};

export const toCamelAll = (rows) => rows.map(toCamel);

export default pool;
