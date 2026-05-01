import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function migrate() {
  const schemaPath = path.resolve(__dirname, '../../database/001_schema.sql');
  const sql = fs.readFileSync(schemaPath, 'utf8');

  console.log('🚀  Running migrations...');
  const client = await pool.connect();
  try {
    await client.query(sql);
    console.log('✅  Migrations completed successfully');
  } catch (err) {
    console.error('❌  Migration failed:', err.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
