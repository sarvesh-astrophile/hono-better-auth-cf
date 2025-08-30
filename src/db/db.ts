import type { D1Database } from '@cloudflare/workers-types';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from '@/db/schema';

let _db: ReturnType<typeof drizzle>;

export const initDB = (d1: D1Database) => {
  _db = drizzle(d1, { schema, casing: 'snake_case' });
};

export const db = () => {
  if (!_db) throw new Error('Database not initialized. Call initDB() first.');
  return _db;
};