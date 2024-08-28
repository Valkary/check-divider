import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString =
	process.env.NODE_ENV === 'production'
		? process.env.DATABASE_URL!
		: process.env.DEV_DATABASE_URL!;
console.log(process.env.NODE_ENV);

export const connection = postgres(connectionString);
export const db = drizzle(connection, { schema });
