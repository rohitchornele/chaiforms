// import "dotenv/config";
// import { drizzle } from "drizzle-orm/node-postgres";
// import { env } from "./env";

// export const db = drizzle(env.DATABASE_URL);
// export * from "drizzle-orm";
// export default db;


import "dotenv/config";

import { drizzle } from "drizzle-orm/postgres-js";

import postgres from "postgres";

import { env } from "./env";

/**
 * Supabase Transaction Pooler
 */

const client = postgres(
  env.DATABASE_URL,
  {
    prepare: false,
  },
);

export const db =
  drizzle(client);

export * from "drizzle-orm";

export default db;