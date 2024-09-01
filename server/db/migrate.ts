import { sql } from 'drizzle-orm';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { connection, db } from './connection';

async function drop_tables_in_dev_mode() {
	try {
		if (process.env.NODE_ENV === 'development') {
			console.log('==> Fetching table names...');
			const tables = (await db.execute(
				sql`SELECT table_schema || '.' || table_name as table_name FROM information_schema.tables WHERE table_type = 'BASE TABLE' AND table_schema NOT IN ('pg_catalog', 'information_schema');`,
			)) as { table_name: string }[];

			console.info(tables);

			for (const { table_name } of tables) {
				console.info(`==> Dropping table ${table_name}...`);
				await db.execute(
					sql`DROP TABLE IF EXISTS ${sql.raw(table_name)} CASCADE;`,
				);
			}

			return;
		}
	} catch (err) {
		console.error('==> Error dropping tables!');
		console.error(err);
		return;
	}
}

async function populate_initial_data() {}

async function run_migration() {
	console.info('==> Attempting to db run migration...');
	await drop_tables_in_dev_mode();

	try {
		await migrate(db, { migrationsFolder: './drizzle' });
		await connection.end();
		console.info('==> Migration finished successfully!');
	} catch (err) {
		console.error('==> Error running db migration!');
		console.error(err);
		return;
	}

	return;
}

run_migration();
