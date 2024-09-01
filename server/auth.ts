'use server';
import { type User, auth, currentUser } from '@clerk/nextjs/server';
import { type InferInsertModel, eq } from 'drizzle-orm';
import * as jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { db } from './db/connection';
import { users } from './db/schema';

export async function user_sign_in() {
	const { userId } = auth();

	// user not authenticated in clerk
	if (userId === null) return;

	const db_user = (
		await db.select().from(users).where(eq(users.id, userId))
	)[0];
	const user = (await currentUser()) as User;

	// User not in db
	if (!db_user) {
		const insert_user: InferInsertModel<typeof users> = {
			id: userId,
			last_names: user.lastName as string,
			name: user.firstName as string,
		};


        console.info("==> Creating user in db...");
		await db.insert(users).values(insert_user);
        console.info("==> User successfully created!")
		return;
	}
	return;
}
