import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	dialect: 'postgresql',
	schema: './server/db/schema.ts',
	out: './drizzle',
	dbCredentials: {
		url:
			process.env.NODE_ENV === 'production'
				? process.env.DATABASE_URL!
				: process.env.DEV_DATABASE_URL!,
	},
});
