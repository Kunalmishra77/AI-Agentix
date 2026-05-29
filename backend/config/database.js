import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host:               process.env.DB_HOST     || 'localhost',
  port:               Number(process.env.DB_PORT) || 3306,
  user:               process.env.DB_USER,
  password:           process.env.DB_PASS,
  database:           process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit:    10,
  idleTimeout:        30000,
  connectTimeout:     10000,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
});

// Matches the pg interface used throughout routes: always returns { rows }
export const query = async (sql, params = []) => {
  const safe = params.map(p =>
    Array.isArray(p) ? JSON.stringify(p) :
    p === undefined  ? null : p
  );
  const [rows] = await pool.execute(sql, safe);
  return { rows: Array.isArray(rows) ? rows : [rows] };
};

export const queryOne = async (sql, params = []) => {
  const { rows } = await query(sql, params);
  return rows[0] || null;
};

// Run INSERT then SELECT — replaces PostgreSQL's RETURNING *
export const insertOne = async (table, sql, params, id) => {
  await query(sql, params);
  return queryOne(`SELECT * FROM \`${table}\` WHERE id = ?`, [id]);
};

// Run UPDATE then SELECT — replaces PostgreSQL's RETURNING *
export const updateOne = async (table, sql, params, id) => {
  await query(sql, params);
  return queryOne(`SELECT * FROM \`${table}\` WHERE id = ?`, [id]);
};

const toCamelKey = s => s.replace(/_([a-z])/g, (_, c) => c.toUpperCase());

export const toCamel = (row) => {
  if (!row) return null;
  const out = {};
  for (const [k, v] of Object.entries(row)) {
    let val = v;
    // Auto-parse JSON stored in TEXT columns
    if (typeof val === 'string') {
      const t = val.trim();
      if ((t.startsWith('[') || t.startsWith('{')) && (t.endsWith(']') || t.endsWith('}'))) {
        try { val = JSON.parse(t); } catch {}
      }
    }
    out[toCamelKey(k)] = val;
  }
  out._id = row.id;
  return out;
};

export const toCamelAll = rows => rows.map(toCamel);

export default pool;
